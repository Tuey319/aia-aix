# Future Plan — AIA+ Call Intent Prediction System

## Current State (v1.0)

| Metric | Value |
|---|---|
| Architecture | Two-stage LightGBM (binary gate + multiclass intent) |
| Scoring pipeline | Nightly batch — all 4,577 policies scored daily |
| Operating threshold | Gate prob ≥ 0.05 (calibrated) |
| Cooldown | 7 days per (policy, intent) pair |
| Deflection rate | 70.0% (586 / 837 test-period calls caught) |
| Notifications/day | ~163 (3.5% of policies per day) |
| Avg advance notice | 4.1 days before the call |
| First-time caller catch rate | 62.5% |
| Repeat caller catch rate | 72.6% |

---

## Phase 2 — Event-Driven Scoring (Highest Priority)

**Problem with batch scoring:** a customer whose autopay fails at 10am today will not receive a notification until tomorrow morning. That is up to a 24-hour delay on the most actionable signal.

**Solution:** trigger re-scoring of a policy immediately when a meaningful event occurs.

### Trigger Events to Implement

| Event | Expected Lead Time Gained |
|---|---|
| Autopay payment fails | Up to 24 hours earlier |
| Premium due date enters 7-day window | Immediate on the day it crosses the threshold |
| Customer opens the AIA+ app | Re-score in real-time to surface most relevant intent |
| Loan repayment schedule updated | Same-day notification instead of next morning |
| Tax document generated | Immediate notification for tax_consent intent |

### Architecture Change

```
Current:   Nightly batch → score all 4,577 → filter → notify

Future:    Nightly batch (fallback, unchanged)
               +
           Event stream (Kafka / AWS EventBridge)
               → event arrives → score that 1 policy now
               → if gate fires → notify within minutes
```

The model itself does not change. Only the trigger mechanism changes.

---

## Phase 3 — Optimal Send Time Prediction

**Problem:** a notification sent at 2am when the customer is asleep has a near-zero open rate.

**Solution:** build a lightweight engagement model per customer that predicts the best 2-hour window to send a notification.

- Input features: historical app-open timestamps, past notification open/ignore events, day-of-week patterns
- Output: preferred send-time window (e.g., weekday 7–9am, weekend 10–12pm)
- Implementation: hold the notification in a queue after the gate fires, release it at the customer's optimal window

Expected impact: 20–40% improvement in notification open rate without changing the ML model.

---

## Phase 4 — Notification Fatigue Suppression

**Problem:** the 7-day cooldown per intent is a blunt instrument. A customer who has ignored 5 consecutive notifications is being spammed.

**Solution:** a per-customer engagement score that suppresses notifications when the customer is disengaged.

```python
# Conceptual logic
if customer_engagement_score < ENGAGE_THRESHOLD:
    skip_notification()   # customer is ignoring us — stop sending
else:
    send_notification()
```

- Track: open rate, click-through rate, ignored count over rolling 30 days
- Suppress if: last 3 notifications all ignored
- Reactivate if: customer opens app or calls in (signal they are re-engaged)

---

## Phase 5 — Model Improvements

### 5.1 Additional Features

| Feature | Intent Targeted | Expected Gain |
|---|---|---|
| Days since last tax document generated | tax_consent | Medium |
| Outstanding loan balance trend | loan_repayment | Medium |
| Number of failed payment attempts (lifetime) | autopay, payment_status | Low-Medium |
| Customer service chat history (NLP embedding) | All | High (requires NLP pipeline) |
| Days since last app login | All (engagement signal) | Low |

### 5.2 Online Learning / Model Refresh

- Current model is retrained manually on a static cut of data
- Future: automated weekly/monthly retraining triggered when deflection rate drops below threshold
- Monitor: track deflection rate on a rolling 14-day window; alert if it falls below 60%

### 5.3 Per-Intent Thresholds

Currently one gate threshold (0.05) governs all 5 intents. Some intents may warrant different operating points:

| Intent | Suggested Threshold Direction | Reason |
|---|---|---|
| due_date_amount | Lower (0.03) | High call volume, low cost to notify |
| loan_repayment | Higher (0.07) | Lower volume, false positives feel intrusive |
| tax_consent | Event-driven only | Purely triggered by document generation |

---

## Phase 6 — A/B Testing Framework

Before claiming deflection rate improvement in production, validate with a controlled experiment:

- **Control group (50%):** receive notifications as normal
- **Treatment group (50%):** no proactive notifications
- **Measure:** call volume difference between groups over 30-day window
- **Success criterion:** ≥15% reduction in inbound calls for control group vs treatment group

This is the only way to confirm that notifications are actually preventing calls (not just coincidentally preceding them).

---

## Priority Order

| Priority | Phase | Effort | Expected Impact |
|---|---|---|---|
| 1 | Phase 2 — Event-driven scoring | Medium | High — faster response to real events |
| 2 | Phase 6 — A/B test framework | Low | Critical — validates the business case |
| 3 | Phase 3 — Optimal send time | Medium | Medium — open rate improvement |
| 4 | Phase 4 — Fatigue suppression | Low | Medium — reduces customer annoyance |
| 5 | Phase 5.2 — Auto retraining | Medium | Medium — keeps model fresh |
| 6 | Phase 5.1 — New features | High | Low-Medium — diminishing returns |

---

## What Does Not Need to Change

- The two-stage model architecture (it is already the right design)
- Scoring all policies (batch scoring is standard and computationally trivial at 4,577 policies)
- The 7-day label horizon
- LightGBM as the base learner
