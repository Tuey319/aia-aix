# Proactive Call-Intent Prediction (AIA+ Call Center)

Predicts, per policy per day, whether a customer is likely to call the call center in
the next 7 days about one of five routine topics — premium due date/amount, payment
status, autopay issues, loan repayment, or tax-consent guidance — so AIA+ can push the
answer proactively instead of waiting for the call.

## Project structure

```
data/raw/            synthetic backend tables (customers, policies, payments, autopay,
                      loans, tax consent, app logins, call history)
data/processed/       model_dataset.parquet — daily (policy, snapshot_date) feature
                      panel with the 7-day-forward intent label
src/generate_data.py  generates the synthetic raw tables (behaviorally-triggered calls,
                      not random labels)
src/build_features.py builds the feature panel + label from the raw tables
src/build_notebook.py generates notebooks/call_intent_prediction.ipynb from code
notebooks/            the executive-facing analysis notebook (EDA -> model -> business impact)
```

## Reproducing

```
python src/generate_data.py      # -> data/raw/*.csv
python src/build_features.py     # -> data/processed/model_dataset.parquet
python src/build_notebook.py     # -> notebooks/call_intent_prediction.ipynb
```

Then open `notebooks/call_intent_prediction.ipynb` and run all cells (kernel: any
Python env with pandas/numpy/scikit-learn/lightgbm/matplotlib/pyarrow installed).

## Key design decisions

- **Data is synthetic but behavior-driven.** Every call in `calls.csv` is generated
  from a believable trigger (approaching due date, failed autopay debit, pending
  consent, upcoming loan repayment), modulated by a latent customer engagement trait,
  plus spontaneous noise calls — so the prediction problem isn't trivially easy.
- **Label = next call intent within 7 days, or `no_call`.** Multiclass framing maps
  directly to "should we send a notification, and which one."
- **Time-based train/test split** (not random) to avoid leakage and mirror real
  deployment: train on the earlier ~4.5 months, test on the most recent ~6 weeks.
- **No leakage of the synthetic latent variable.** The generator's `engagement_level`
  / `preferred_channel` fields directly drove call probabilities during generation, so
  they're excluded from the feature set — the model only sees observable proxies
  (login activity, past call history).
- **Business impact measured at the event level**, not row level: of the calls that
  actually happened in the test period, what fraction were preceded by a correctly
  typed proactive flag in the prior 7 days. This is the number that maps to an actual
  call-center cost reduction.

## Next steps for a real deployment

1. Replace synthetic data with real call-reason-coded call logs + policy/payment/
   autopay/loan/consent admin data (6–12 months).
2. Run a silent pilot: score the live book daily, log what would have been sent,
   compare against real inbound calls for 4–8 weeks before enabling live pushes.
3. Add frequency-capping / cooldown logic per policy per intent.
4. Track inbound call volume per 1,000 policies (pre- vs post-launch, by intent) as
   the operational success metric, not model accuracy alone.