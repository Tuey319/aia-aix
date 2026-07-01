"""
Feature engineering for the "Proactive Call-Intent Prediction" project.

Turns the raw event tables into a daily (policy, snapshot_date) panel: for every
active policy, on every day in the scoreable window, compute the features the
company would actually have *as of that day* (premium due/payment state, autopay
health, loan repayment state, tax-consent state, app engagement proxies, and recent
call history) and label it with the customer's next call intent on that policy within
the following 7 days (or "no_call" if they don't call). This mirrors how the model
would run in production: a daily batch job scores every policy and decides whether to
push a proactive notification.

Deliberately excluded from the feature set: the synthetic generator's latent
"engagement_level" trait and "preferred_channel" field. Those directly drove the call
probabilities during data generation, so including them would leak the generative
process and make the model trivially "perfect" -- unrealistic for a real deployment,
where you only ever observe behavioral proxies (login activity, past calls), not a
clean engagement label.

Run: python src/build_features.py
Output: data/processed/model_dataset.parquet (and .csv)
"""
import os
import numpy as np
import pandas as pd

RAW_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "raw")
PROC_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "processed")
os.makedirs(PROC_DIR, exist_ok=True)

WINDOW_START = pd.Timestamp("2026-01-01")
WINDOW_END = pd.Timestamp("2026-06-30")
LABEL_HORIZON_DAYS = 7
LAST_SNAPSHOT = WINDOW_END - pd.Timedelta(days=LABEL_HORIZON_DAYS)  # 2026-06-23
SCHEDULE_START = WINDOW_START - pd.DateOffset(months=3)  # 2025-10-01: matches generate_data.py -- earliest date call history can exist

INTENTS = ["due_date_amount", "payment_status", "autopay", "loan_repayment", "tax_consent"]
SENTINEL = 999  # "not applicable / unknown" for days-since / days-to features
FREQ_DAYS = {"monthly": 30, "quarterly": 90, "semi-annual": 180, "annual": 365}


def load_raw():
    customers = pd.read_csv(os.path.join(RAW_DIR, "customers.csv"))
    policies = pd.read_csv(os.path.join(RAW_DIR, "policies.csv"), parse_dates=["policy_start_date"])
    payments = pd.read_csv(os.path.join(RAW_DIR, "payments.csv"), parse_dates=["due_date", "paid_date"])
    autopay = pd.read_csv(os.path.join(RAW_DIR, "autopay_events.csv"), parse_dates=["event_date"])
    loans = pd.read_csv(os.path.join(RAW_DIR, "loans.csv"))
    repayments = pd.read_csv(os.path.join(RAW_DIR, "loan_repayments.csv"), parse_dates=["due_date"])
    tax_consent = pd.read_csv(os.path.join(RAW_DIR, "tax_consent.csv"), parse_dates=["request_date", "status_date"])
    logins = pd.read_csv(os.path.join(RAW_DIR, "app_logins.csv"), parse_dates=["login_date"])
    calls = pd.read_csv(os.path.join(RAW_DIR, "calls.csv"), parse_dates=["call_date"])
    return customers, policies, payments, autopay, loans, repayments, tax_consent, logins, calls


def build_customer_timeseries(customers, logins, calls, snap_dates):
    """Per-customer, per-snapshot-date behavioral features (shared across all of a customer's policies)."""
    n = len(snap_dates)
    out = {}
    logins_by_cust = {cid: g["login_date"].sort_values().values for cid, g in logins.groupby("customer_id")}
    calls_by_cust = {cid: g.sort_values("call_date") for cid, g in calls.groupby("customer_id")}

    for cust in customers.itertuples():
        cid = cust.customer_id
        login_arr = logins_by_cust.get(cid, np.array([], dtype="datetime64[ns]"))
        if len(login_arr) > 0:
            idx_last_login = np.searchsorted(login_arr, snap_dates, side="right") - 1
            days_since_login = np.where(idx_last_login >= 0,
                                         (snap_dates - login_arr[np.clip(idx_last_login, 0, None)]).astype("timedelta64[D]").astype(int),
                                         SENTINEL)
            idx_30 = np.searchsorted(login_arr, snap_dates - pd.Timedelta(days=30), side="left")
            idx_90 = np.searchsorted(login_arr, snap_dates - pd.Timedelta(days=90), side="left")
            idx_now = np.searchsorted(login_arr, snap_dates, side="right")
            login_count_30d = idx_now - idx_30
            login_count_90d = idx_now - idx_90
        else:
            days_since_login = np.full(n, SENTINEL)
            login_count_30d = np.zeros(n, dtype=int)
            login_count_90d = np.zeros(n, dtype=int)

        cust_calls = calls_by_cust.get(cid)
        if cust_calls is not None and len(cust_calls) > 0:
            call_dates = cust_calls["call_date"].values
            call_intents = cust_calls["intent"].values
            idx_last_call = np.searchsorted(call_dates, snap_dates, side="right") - 1
            days_since_call = np.where(idx_last_call >= 0,
                                        (snap_dates - call_dates[np.clip(idx_last_call, 0, None)]).astype("timedelta64[D]").astype(int),
                                        SENTINEL)
            idx_90d_lo = np.searchsorted(call_dates, snap_dates - pd.Timedelta(days=90), side="left")
            idx_30d_lo = np.searchsorted(call_dates, snap_dates - pd.Timedelta(days=30), side="left")
            idx_90d_hi = np.searchsorted(call_dates, snap_dates, side="right")
            calls_90d_total = idx_90d_hi - idx_90d_lo
            calls_30d_total = idx_90d_hi - idx_30d_lo
            calls_90d_by_intent = {}
            for intent in INTENTS:
                intent_dates = call_dates[call_intents == intent]
                lo = np.searchsorted(intent_dates, snap_dates - pd.Timedelta(days=90), side="left")
                hi = np.searchsorted(intent_dates, snap_dates, side="right")
                calls_90d_by_intent[intent] = hi - lo
        else:
            days_since_call = np.full(n, SENTINEL)
            calls_90d_total = np.zeros(n, dtype=int)
            calls_30d_total = np.zeros(n, dtype=int)
            calls_90d_by_intent = {intent: np.zeros(n, dtype=int) for intent in INTENTS}

        out[cid] = dict(days_since_login=days_since_login, login_count_30d=login_count_30d,
                         login_count_90d=login_count_90d, days_since_call=days_since_call,
                         calls_90d_total=calls_90d_total, calls_30d_total=calls_30d_total,
                         calls_90d_by_intent=calls_90d_by_intent)
    return out


def build_policy_block(pol, payments_by_pol, autopay_by_pol, repay_by_pol, loan_balance_map,
                        tax_by_pol, calls_by_pol, cust_ts, snap_dates, n):
    policy_no, cust = pol.policy_no, pol.customer_id

    pay = payments_by_pol.get(policy_no)
    due_arr = pay["due_date"].values
    status_arr = pay["status"].values
    idx_next = np.searchsorted(due_arr, snap_dates, side="left")
    idx_last = idx_next - 1
    has_next = idx_next < len(due_arr)
    has_last = idx_last >= 0
    days_to_next_due = np.where(has_next, (due_arr[np.clip(idx_next, 0, len(due_arr) - 1)] - snap_dates).astype("timedelta64[D]").astype(int), SENTINEL)
    days_since_last_due = np.where(has_last, (snap_dates - due_arr[np.clip(idx_last, 0, None)]).astype("timedelta64[D]").astype(int), SENTINEL)
    last_payment_status = np.where(has_last, status_arr[np.clip(idx_last, 0, None)], "none")
    cycle_days = FREQ_DAYS[pol.premium_frequency]
    premium_cycle_position = np.where(days_to_next_due < SENTINEL, days_to_next_due / cycle_days, SENTINEL)

    ap = autopay_by_pol.get(policy_no)
    if ap is not None and len(ap) > 0:
        fail_dates = ap.loc[ap["event_type"] == "attempt_failed", "event_date"].sort_values().values
    else:
        fail_dates = np.array([], dtype="datetime64[ns]")
    if len(fail_dates) > 0:
        idx_fail = np.searchsorted(fail_dates, snap_dates, side="right") - 1
        has_fail = idx_fail >= 0
        days_since_autopay_fail = np.where(has_fail, (snap_dates - fail_dates[np.clip(idx_fail, 0, None)]).astype("timedelta64[D]").astype(int), SENTINEL)
    else:
        days_since_autopay_fail = np.full(n, SENTINEL)

    if pol.has_loan:
        loan_balance = np.full(n, loan_balance_map.get(policy_no, 0.0))
        rp = repay_by_pol.get(policy_no)
        rp_dates = rp["due_date"].values
        idx_rn = np.searchsorted(rp_dates, snap_dates, side="left")
        idx_rl = idx_rn - 1
        has_rn, has_rl = idx_rn < len(rp_dates), idx_rl >= 0
        days_to_next_repay = np.where(has_rn, (rp_dates[np.clip(idx_rn, 0, len(rp_dates) - 1)] - snap_dates).astype("timedelta64[D]").astype(int), SENTINEL)
        days_since_last_repay = np.where(has_rl, (snap_dates - rp_dates[np.clip(idx_rl, 0, None)]).astype("timedelta64[D]").astype(int), SENTINEL)
    else:
        loan_balance = np.zeros(n)
        days_to_next_repay = np.full(n, SENTINEL)
        days_since_last_repay = np.full(n, SENTINEL)

    if pol.requires_tax_consent:
        t = tax_by_pol[policy_no]
        req_date, status_date, final_status = t["request_date"], t["status_date"], t["status"]
        status_as_of = np.full(n, "not_yet_requested", dtype=object)
        days_since_request = np.where(snap_dates >= req_date, (snap_dates - req_date).astype("timedelta64[D]").astype(int), SENTINEL)
        resolved_mask = snap_dates >= status_date
        requested_mask = snap_dates >= req_date
        status_as_of = np.where(requested_mask & ~resolved_mask, "pending_signature",
                                 np.where(requested_mask & resolved_mask, final_status, "not_yet_requested"))
    else:
        status_as_of = np.full(n, "not_applicable", dtype=object)
        days_since_request = np.full(n, SENTINEL)

    calls_sub = calls_by_pol.get(policy_no)
    label = np.full(n, "no_call", dtype=object)
    calls_lifetime_total = np.zeros(n, dtype=int)
    if calls_sub is not None and len(calls_sub) > 0:
        call_dates = calls_sub["call_date"].values
        call_intents = calls_sub["intent"].values
        upper = snap_dates + pd.Timedelta(days=LABEL_HORIZON_DAYS)
        idx_lo = np.searchsorted(call_dates, snap_dates, side="right")
        idx_hi = np.searchsorted(call_dates, upper, side="right")
        has_future_call = idx_hi > idx_lo
        label = np.where(has_future_call, call_intents[np.clip(idx_lo, 0, len(call_dates) - 1)], "no_call")
        # calls strictly before the snapshot date -- this policy's track record so far
        calls_lifetime_total = np.searchsorted(call_dates, snap_dates, side="left")

    # how long we've been able to observe whether this policy generates calls at all,
    # bounded by both data availability (SCHEDULE_START) and the policy's own start date --
    # this is what lets the model tell "genuinely never calls" apart from "too new to know yet"
    observed_start = max(np.datetime64(SCHEDULE_START), np.datetime64(pol.policy_start_date))
    calls_observed_days = np.clip((snap_dates - observed_start).astype("timedelta64[D]").astype(int), 0, None)
    calls_lifetime_rate = calls_lifetime_total / np.maximum(calls_observed_days / 365.0, 30 / 365.0)

    ts = cust_ts[cust]
    block = {
        "snapshot_date": snap_dates, "policy_no": np.full(n, policy_no), "customer_id": np.full(n, cust),
        "product_type": np.full(n, pol.product_type), "premium_amount": np.full(n, pol.premium_amount),
        "premium_frequency": np.full(n, pol.premium_frequency),
        "policy_tenure_days": (snap_dates - np.datetime64(pol.policy_start_date)).astype("timedelta64[D]").astype(int),
        "autopay_enrolled": np.full(n, pol.autopay_enrolled),
        "days_to_next_due": days_to_next_due, "days_since_last_due": days_since_last_due,
        "premium_cycle_position": premium_cycle_position,
        "last_payment_status": last_payment_status, "days_since_autopay_fail": days_since_autopay_fail,
        "has_loan": np.full(n, pol.has_loan), "loan_balance": loan_balance,
        "days_to_next_loan_repayment": days_to_next_repay, "days_since_last_loan_repayment": days_since_last_repay,
        "requires_tax_consent": np.full(n, pol.requires_tax_consent), "tax_consent_status": status_as_of,
        "days_since_tax_request": days_since_request,
        "days_since_last_login": ts["days_since_login"], "login_count_30d": ts["login_count_30d"],
        "login_count_90d": ts["login_count_90d"], "days_since_last_call_any": ts["days_since_call"],
        "calls_90d_total": ts["calls_90d_total"], "calls_30d_total": ts["calls_30d_total"],
        "calls_lifetime_total": calls_lifetime_total, "calls_observed_days": calls_observed_days,
        "calls_lifetime_rate": calls_lifetime_rate,
    }
    for intent in INTENTS:
        block[f"calls_90d_{intent}"] = ts["calls_90d_by_intent"][intent]
    block["next_intent_7d"] = label
    return block


def main():
    print("Loading raw tables...")
    customers, policies, payments, autopay, loans, repayments, tax_consent, logins, calls = load_raw()

    snap_dates = pd.date_range(WINDOW_START, LAST_SNAPSHOT, freq="D").values
    n = len(snap_dates)
    print(f"Snapshot grid: {WINDOW_START.date()} -> {pd.Timestamp(LAST_SNAPSHOT).date()} ({n} days)")

    print("Computing per-customer behavioral time series...")
    cust_ts = build_customer_timeseries(customers, logins, calls, snap_dates)

    payments_by_pol = {k: g.sort_values("due_date") for k, g in payments.groupby("policy_no")}
    autopay_by_pol = {k: g for k, g in autopay.groupby("policy_no")}
    repay_by_pol = {k: g.sort_values("due_date") for k, g in repayments.groupby("policy_no")}
    loan_balance_map = loans.set_index("policy_no")["loan_balance"].to_dict()
    tax_by_pol = {row.policy_no: {"request_date": np.datetime64(row.request_date), "status_date": np.datetime64(row.status_date), "status": row.status}
                  for row in tax_consent.itertuples()}
    calls_by_pol = {k: g.sort_values("call_date") for k, g in calls.groupby("policy_no")}

    print(f"Building daily snapshot panel for {len(policies)} policies x {n} days...")
    customer_meta = customers.set_index("customer_id")[["age", "gender", "tenure_years", "app_registered", "num_policies"]]

    blocks = []
    for i, pol in enumerate(policies.itertuples()):
        blocks.append(build_policy_block(pol, payments_by_pol, autopay_by_pol, repay_by_pol, loan_balance_map,
                                          tax_by_pol, calls_by_pol, cust_ts, snap_dates, n))
        if (i + 1) % 1000 == 0:
            print(f"  ...{i+1}/{len(policies)} policies")

    print("Assembling final DataFrame...")
    columns = blocks[0].keys()
    full = {col: np.concatenate([b[col] for b in blocks]) for col in columns}
    df = pd.DataFrame(full)

    df = df.merge(customer_meta, left_on="customer_id", right_index=True, how="left")

    bool_cols = ["autopay_enrolled", "has_loan", "requires_tax_consent", "app_registered"]
    for c in bool_cols:
        df[c] = df[c].astype(bool)

    print(f"\nFinal dataset shape: {df.shape}")
    print("\nLabel distribution:")
    print(df["next_intent_7d"].value_counts(normalize=True).round(4))

    df.to_parquet(os.path.join(PROC_DIR, "model_dataset.parquet"), index=False)
    print(f"\nWritten to {os.path.abspath(PROC_DIR)}")


if __name__ == "__main__":
    main()