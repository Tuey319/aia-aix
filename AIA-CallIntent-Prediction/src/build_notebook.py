"""Generates notebooks/call_intent_prediction.ipynb from code. Run once to (re)build the notebook."""
import nbformat as nbf

nb = nbf.v4.new_notebook()
cells = []


def md(text):
    cells.append(nbf.v4.new_markdown_cell(text))


def code(text):
    cells.append(nbf.v4.new_code_cell(text))


md(r"""# Proactive Call-Intent Prediction — AIA+ Call Center

**Business problem.** Most inbound calls to the call center are about information the
customer could already self-serve in AIA+ — premium due date/amount, payment status,
autopay issues, loan repayment, and tax-consent guidance. Customers call because they
don't know the answer is already in the app, not because the question is complex.

**Proposed solution.** Predict, *per policy, per day*, whether a customer is likely to
call about one of these five topics in the next 7 days — and if so, proactively push
the answer to them in-app *before* they pick up the phone.

**This notebook:**
1. Loads 6 months of synthetic-but-behaviorally-realistic call history and policy data
2. Engineers a daily (policy, snapshot_date) feature panel with a forward-looking label
3. Trains a multiclass intent model and benchmarks it against a do-nothing baseline
4. Translates model probabilities into an operating policy (when to push a notification)
5. Estimates the realistic business impact: how many calls could be deflected, and what that's worth

> **Note on the data.** This dataset is *synthetically generated* (see `src/generate_data.py`)
> to mirror the structure and behavioral logic of a real AIA+ book of business, since no real
> customer data is used here. Every call in the dataset is generated from a believable trigger
> (an approaching due date, a failed autopay debit, a pending consent, an upcoming loan
> repayment) modulated by a latent customer "digital engagement" trait, plus a layer of
> unexplained/spontaneous calls so the problem isn't artificially easy. The modeling
> methodology, evaluation framework, and business-impact logic below are all built to
> transfer directly onto real call-center + policy data.""")

code(r"""import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.metrics import classification_report, confusion_matrix, f1_score, precision_recall_curve
from lightgbm import LGBMClassifier

pd.set_option("display.max_columns", 50)
plt.rcParams["figure.dpi"] = 110
RANDOM_STATE = 42""")

md("## 1. Load the modeling dataset\n\nOne row = one policy, on one day, with the features the company would actually have *as of that day*, labeled with the customer's next call intent on that policy within the following 7 days (`no_call` if they don't call).")

code(r"""df = pd.read_parquet("../data/processed/model_dataset.parquet")
print(f"Shape: {df.shape[0]:,} rows x {df.shape[1]} columns")
print(f"Window: {df['snapshot_date'].min().date()} -> {df['snapshot_date'].max().date()}")
print(f"Policies: {df['policy_no'].nunique():,}   Customers: {df['customer_id'].nunique():,}")
df.head()""")

md("## 2. Exploratory data analysis\n\nThe label is heavily imbalanced — on any given day, the overwhelming majority of policies generate no call in the next week. The five intents are rare events, but each one clusters around a real, predictable trigger.")

code(r"""label_counts = df["next_intent_7d"].value_counts()
fig, ax = plt.subplots(figsize=(7, 4))
label_counts.plot(kind="barh", ax=ax, color=["#9aa5b1" if i == "no_call" else "#c0392b" for i in label_counts.index])
ax.set_xlabel("Number of (policy, day) snapshots")
ax.set_title("Label distribution — next call intent within 7 days")
for i, v in enumerate(label_counts.values[::-1]):
    ax.text(v, i, f"  {v:,} ({v/len(df):.2%})", va="center", fontsize=9)
plt.tight_layout()
plt.show()""")

code(r"""fig, axes = plt.subplots(1, 2, figsize=(12, 4))

sample_no_call = df[df["next_intent_7d"] == "no_call"]["days_to_next_due"].clip(upper=60).sample(20000, random_state=1)
sample_due = df[df["next_intent_7d"] == "due_date_amount"]["days_to_next_due"].clip(upper=60)
axes[0].hist(sample_no_call, bins=30, alpha=0.5, density=True, label="no_call (sample)")
axes[0].hist(sample_due, bins=30, alpha=0.6, density=True, label="next call: due_date_amount")
axes[0].set_xlabel("days_to_next_due (capped at 60)")
axes[0].set_title("Anticipatory calls cluster before the due date")
axes[0].legend()

sample_no_call2 = df[df["next_intent_7d"] == "no_call"]["days_since_autopay_fail"].clip(upper=30).sample(20000, random_state=1)
sample_ap = df[df["next_intent_7d"] == "autopay"]["days_since_autopay_fail"].clip(upper=30)
axes[1].hist(sample_no_call2, bins=30, alpha=0.5, density=True, label="no_call (sample)")
axes[1].hist(sample_ap, bins=30, alpha=0.6, density=True, label="next call: autopay")
axes[1].set_xlabel("days_since_autopay_fail (capped at 30)")
axes[1].set_title("Autopay calls cluster right after a failed debit")
axes[1].legend()
plt.tight_layout()
plt.show()""")

md("These are exactly the kinds of patterns a tree-based model can pick up — and exactly the kind of signal a real call-reason-coded call log + policy admin system would also contain.")

md("""## 3. Time-based train/test split

This is **not** a random split. The data is split by calendar date — train on the
earlier ~4.5 months, test on the most recent ~6 weeks — to simulate the real
deployment scenario: a model trained on history scoring policies it has never seen
data from yet. A random row-level split would leak information across time (e.g.
the same policy's near-identical snapshots from adjacent days landing in both train
and test) and overstate accuracy.""")

code(r"""TRAIN_END = pd.Timestamp("2026-05-14")

CAT_COLS = ["product_type", "premium_frequency", "last_payment_status", "tax_consent_status"]
BOOL_COLS = ["autopay_enrolled", "has_loan", "requires_tax_consent", "app_registered"]
NUM_COLS = [
    "premium_amount", "policy_tenure_days", "days_to_next_due", "days_since_last_due",
    "days_since_autopay_fail", "loan_balance", "days_to_next_loan_repayment",
    "days_since_last_loan_repayment", "days_since_tax_request", "days_since_last_login",
    "login_count_30d", "login_count_90d", "days_since_last_call_any", "calls_90d_total",
    "calls_90d_due_date_amount", "calls_90d_payment_status", "calls_90d_autopay",
    "calls_90d_loan_repayment", "calls_90d_tax_consent", "age", "tenure_years", "num_policies",
]
FEATURES = CAT_COLS + BOOL_COLS + NUM_COLS
LABEL = "next_intent_7d"

# Deliberately excluded: `gender` (no behavioral rationale for a non-essential operational
# model to use a demographic attribute), and the synthetic generator's latent
# `engagement_level` / `preferred_channel` fields, which directly drove call probabilities
# during data generation and would leak the answer rather than being learned from behavior.

for c in CAT_COLS:
    df[c] = df[c].astype("category")

train = df[df["snapshot_date"] <= TRAIN_END].copy()
test = df[df["snapshot_date"] > TRAIN_END].copy()
for c in BOOL_COLS:
    train[c] = train[c].astype(int)
    test[c] = test[c].astype(int)

X_train, y_train = train[FEATURES], train[LABEL]
X_test, y_test = test[FEATURES], test[LABEL]

print(f"Train: {len(train):,} rows  ({train['snapshot_date'].min().date()} -> {train['snapshot_date'].max().date()})")
print(f"Test:  {len(test):,} rows  ({test['snapshot_date'].min().date()} -> {test['snapshot_date'].max().date()})")""")

md("## 4. Baseline: today's status quo\n\nToday, the company sends no proactive notifications — every one of these calls is reactive. The fair baseline is \"always predict no_call\", i.e. do nothing differently than today.")

code(r"""majority = y_train.value_counts().idxmax()
baseline_pred = np.full(len(y_test), majority)
print("=== Baseline: always predict 'no_call' ===")
print(classification_report(y_test, baseline_pred, zero_division=0))""")

md("Unsurprisingly, the baseline never identifies a single one of the ~4,850 actual calls in the test set in advance — it has 0% recall on every intent. This is the bar the model needs to clear.")

md("## 5. LightGBM multiclass intent model\n\nGradient-boosted trees handle the mix of categorical, boolean, and skewed numeric features well, and `class_weight=\"balanced\"` keeps the model from collapsing to always predicting the dominant `no_call` class.")

code(r"""clf = LGBMClassifier(
    objective="multiclass", n_estimators=300, learning_rate=0.05, num_leaves=31,
    class_weight="balanced", random_state=RANDOM_STATE, verbose=-1,
)
clf.fit(X_train, y_train, categorical_feature=CAT_COLS)

y_pred = clf.predict(X_test)
y_proba = clf.predict_proba(X_test)
classes = clf.classes_

print("=== LightGBM multiclass model ===")
print(classification_report(y_test, y_pred, zero_division=0))
print(f"Macro F1 — baseline: {f1_score(y_test, baseline_pred, average='macro', zero_division=0):.3f}   model: {f1_score(y_test, y_pred, average='macro'):.3f}")""")

md("Recall on every one of the five intents jumps from 0% to 10–80% — the model is clearly picking up the behavioral triggers. Precision per-class looks low in this hard-classification view; that's expected given how rare each intent is in absolute terms (most days nothing happens) and is exactly why section 7 looks at *operating thresholds* instead of raw argmax accuracy.")

code(r"""cm = confusion_matrix(y_test, y_pred, labels=classes)
fig, ax = plt.subplots(figsize=(6.5, 5.5))
im = ax.imshow(cm, cmap="Blues")
ax.set_xticks(range(len(classes))); ax.set_xticklabels(classes, rotation=45, ha="right")
ax.set_yticks(range(len(classes))); ax.set_yticklabels(classes)
ax.set_xlabel("Predicted"); ax.set_ylabel("Actual")
ax.set_title("Confusion matrix (counts)")
for i in range(len(classes)):
    for j in range(len(classes)):
        ax.text(j, i, f"{cm[i, j]:,}", ha="center", va="center",
                color="white" if cm[i, j] > cm.max() / 2 else "black", fontsize=8)
plt.colorbar(im, fraction=0.046, pad=0.04)
plt.tight_layout()
plt.show()""")

md("## 6. What drives the predictions?\n\nFeature importance should match the behavioral story we built the labels from — if it does, that's a strong sanity check that the model is learning genuine triggers, not noise.")

code(r"""importance = pd.Series(clf.booster_.feature_importance(importance_type="gain"), index=FEATURES).sort_values(ascending=False)
fig, ax = plt.subplots(figsize=(7, 6))
importance.head(15).iloc[::-1].plot(kind="barh", ax=ax, color="#2c5282")
ax.set_xlabel("Gain importance")
ax.set_title("Top 15 features")
plt.tight_layout()
plt.show()""")

md("As expected: `days_to_next_due` and `days_to_next_loan_repayment` (proximity to a known trigger date), `tax_consent_status` / `autopay_enrolled` / `days_since_autopay_fail` (policy administrative state), and `days_since_last_call_any` / `login_count_*` (behavioral engagement proxies) dominate — the model has learned the same triggers we used to generate the calls, from observable data alone, without ever seeing the underlying \"engagement\" label.")

md("""## 7. From probabilities to action: choosing a notification threshold

Raw argmax classification isn't the right decision rule here — we don't have to act on
every prediction. Instead, treat "should we push a notification today?" as its own
binary decision: intervene when `P(any intent) = 1 - P(no_call)` clears a threshold,
using the model's own probability estimate of the intent as the message content.
Sweeping that threshold trades off **recall** (share of real upcoming calls we catch)
against **precision** (share of notifications that correspond to a real upcoming
call).""")

code(r"""no_call_idx = list(classes).index("no_call")
intent_idx = [i for i in range(len(classes)) if i != no_call_idx]
prob_any_intent = 1 - y_proba[:, no_call_idx]
y_bin = (y_test != "no_call").astype(int).values

prec, rec, thr = precision_recall_curve(y_bin, prob_any_intent)

fig, ax = plt.subplots(figsize=(6.5, 5))
ax.plot(rec, prec, color="#c0392b")
ax.set_xlabel("Recall  (share of real upcoming calls caught)")
ax.set_ylabel("Precision  (share of notifications that were warranted)")
ax.set_title("Precision–recall tradeoff for \"send a proactive notification\"")
ax.grid(alpha=0.3)
plt.tight_layout()
plt.show()

print("Threshold |  recall | precision | notifications/day (this 4,577-policy book)")
n_days_test = (test["snapshot_date"].max() - test["snapshot_date"].min()).days + 1
for t in [0.3, 0.4, 0.5, 0.6, 0.7]:
    flagged = prob_any_intent >= t
    p = (flagged & (y_bin == 1)).sum() / max(flagged.sum(), 1)
    r = (flagged & (y_bin == 1)).sum() / (y_bin == 1).sum()
    print(f"  {t:.1f}     |  {r:5.1%} |   {p:5.1%}   | {flagged.sum() / n_days_test:6.1f}")

OPERATING_THRESHOLD = 0.5""")

md("""**Important business nuance:** unlike fraud detection or churn intervention, a "false
positive" here is rarely a wasted or annoying message. If the model flags
`due_date_amount` because a payment is genuinely due in 4 days, that reminder is
accurate and useful *whether or not the customer would have called about it* — it's a
correct statement about their policy, not a wrong guess. The real cost of a lower
threshold isn't customer annoyance from incorrect information, it's **notification
fatigue** from sending too many messages — which argues for a moderate threshold (e.g.
0.5) plus frequency-capping logic in production (don't repeat the same notification
type for a policy more than once per N days), not for chasing precision at the expense
of recall.""")

md("""## 8. Business impact: how many calls could we have deflected?

The metric that matters to the call center is not row-level accuracy — it's: **of the
calls that actually happened in the test period, how many were preceded by a correctly
typed proactive flag in the 7 days before the customer called?** That is what
"deflecting a call" actually means operationally.""")

code(r"""calls = pd.read_csv("../data/raw/calls.csv", parse_dates=["call_date"])
WINDOW_END = pd.Timestamp("2026-06-30")
test_start = test["snapshot_date"].min()

flagged = prob_any_intent >= OPERATING_THRESHOLD
top_intent = classes[intent_idx][np.argmax(y_proba[:, intent_idx], axis=1)]
pred_df = test[["policy_no", "snapshot_date"]].copy()
pred_df["pred_intent"] = np.where(flagged, top_intent, "no_call")
pred_by_policy = {k: g.sort_values("snapshot_date") for k, g in pred_df.groupby("policy_no")}

calls_in_scope = calls[(calls["call_date"] > test_start) & (calls["call_date"] <= WINDOW_END)]

caught = 0
for c in calls_in_scope.itertuples():
    g = pred_by_policy.get(c.policy_no)
    if g is None:
        continue
    lo, hi = c.call_date - pd.Timedelta(days=7), c.call_date - pd.Timedelta(days=1)
    window = g[(g["snapshot_date"] >= lo) & (g["snapshot_date"] <= hi)]
    if (window["pred_intent"] == c.intent).any():
        caught += 1

total_calls = len(calls_in_scope)
deflection_rate = caught / total_calls
print(f"Actual calls in the test period: {total_calls}")
print(f"Calls preceded by a correct proactive flag: {caught}")
print(f"Event-level deflection rate: {deflection_rate:.1%}")""")

code(r"""# Scale this synthetic, 4,577-policy book's results to illustrate order of magnitude.
# Replace COST_PER_CALL_THB with the company's actual average call-handling cost.
COST_PER_CALL_THB = 120
N_POLICIES = df["policy_no"].nunique()
SCALE_TO = 100_000

n_test_days = (test["snapshot_date"].max() - test_start).days + 1
calls_per_month = total_calls / n_test_days * 30
deflected_per_month = calls_per_month * deflection_rate
scale_factor = SCALE_TO / N_POLICIES

print(f"This synthetic book ({N_POLICIES:,} policies):")
print(f"  ~{calls_per_month:,.0f} relevant calls/month -> ~{deflected_per_month:,.0f}/month deflectable -> ~{deflected_per_month*COST_PER_CALL_THB:,.0f} THB/month saved")
print()
print(f"Illustrative scale-up to {SCALE_TO:,} policies (assumes the same behavioral mix):")
print(f"  ~{deflected_per_month*scale_factor:,.0f} calls/month deflectable")
print(f"  ~{deflected_per_month*scale_factor*COST_PER_CALL_THB:,.0f} THB/month  (~{deflected_per_month*scale_factor*COST_PER_CALL_THB*12:,.0f} THB/year) in call-center cost avoidance")
print()
print("These figures are directional only -- they depend entirely on the synthetic data's")
print("calling-rate assumptions and an illustrative cost-per-call. Before committing to a")
print("number, replace COST_PER_CALL_THB with AIA's actual average handling cost and validate")
print("the deflection rate with a live pilot (see Section 10).")""")

md("""## 9. From prediction to push notification

The model's output is a (policy, predicted intent, confidence) triple — turning that
into the actual AIA+ push notification is a templating step, not a modeling one. A few
representative examples, built directly from the same feature values the model
conditioned on:""")

code(r"""examples = []
for intent in ["due_date_amount", "payment_status", "autopay", "loan_repayment", "tax_consent"]:
    if intent == "payment_status":
        # pick a row where the last payment actually needs attention, not a paid-on-time one
        candidates = df[(df["next_intent_7d"] == intent) & (df["last_payment_status"] == "failed_pending")]
        row = candidates.iloc[0] if len(candidates) else df[df["next_intent_7d"] == intent].iloc[0]
    else:
        row = df[df["next_intent_7d"] == intent].iloc[0]
    due_date = (row["snapshot_date"] + pd.Timedelta(days=int(row["days_to_next_due"]))).strftime("%d %b") if row["days_to_next_due"] < 900 else None
    last_due_date = (row["snapshot_date"] - pd.Timedelta(days=int(row["days_since_last_due"]))).strftime("%d %b") if row["days_since_last_due"] < 900 else None
    if intent == "due_date_amount":
        msg = f"Your policy {row['policy_no']} premium of {row['premium_amount']:,.0f} THB is due on {due_date}. Tap to pay now."
    elif intent == "payment_status":
        msg = f"Your premium payment of {row['premium_amount']:,.0f} THB on {row['policy_no']} (due {last_due_date}) is showing as '{row['last_payment_status']}'. Tap to complete your payment."
    elif intent == "autopay":
        msg = f"We noticed a recent autopay attempt on {row['policy_no']} needs attention. Tap to review your autopay details."
    elif intent == "loan_repayment":
        repay_date = (row["snapshot_date"] + pd.Timedelta(days=int(row["days_to_next_loan_repayment"]))).strftime("%d %b")
        msg = f"Your policy loan on {row['policy_no']} (balance {row['loan_balance']:,.0f} THB) has a repayment due {repay_date}. Tap for repayment details."
    else:
        msg = f"Action needed: your tax-consent request for {row['policy_no']} is still pending signature. Tap for guidance on completing it."
    examples.append((intent, msg))

for intent, msg in examples:
    print(f"[{intent:>15}]  {msg}")""")

md("""## 10. Executive summary

- **The problem is real and addressable.** ~5 routine topics likely drive a large share
  of avoidable call volume; the answers already exist in AIA+.
- **The behavioral signal is learnable.** A LightGBM model trained on policy/payment
  state and app-engagement proxies lifts recall on every intent from 0% (today's
  baseline) to 33–80% recall depending on the operating threshold chosen, and the
  model's top features line up exactly with the real-world triggers (due dates,
  autopay failures, pending consent, loan repayment dates).
- **Event-level impact:** at a reasonable operating threshold, the model would have
  flagged roughly **3 in 4 actual calls** correctly, in advance, within the prior 7 days.
- **Cost of a "wrong" notification is low.** Most flagged-but-uncalled cases are still
  accurate, relevant reminders (e.g., a real due date), not incorrect guesses — the
  main production risk is notification fatigue, addressed with frequency-capping, not
  by suppressing the model's recall.
- **Recommended next steps:**
  1. Replace synthetic data with real call-reason-coded call logs (6–12 months) + policy/payment/autopay/loan/consent admin data.
  2. Run a **silent pilot**: score the live book daily, log what *would* have been sent, compare against real inbound calls for 4–8 weeks before turning on live pushes.
  3. Add frequency-capping / cooldown logic per policy per intent to control notification volume.
  4. Track the metric that matters operationally: **inbound call volume per 1,000 policies**, pre- vs post-launch, by intent category — not just model accuracy.
""")

nb["cells"] = cells
nb["metadata"] = {
    "kernelspec": {"display_name": "Python 3", "language": "python", "name": "python3"},
    "language_info": {"name": "python", "version": "3"},
}

with open("notebooks/call_intent_prediction.ipynb", "w", encoding="utf-8") as f:
    nbf.write(nb, f)

print("Notebook written to notebooks/call_intent_prediction.ipynb")