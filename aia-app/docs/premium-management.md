# Premium Management — Screen Guide

> **Core insight behind this section:** The #1 reason people let insurance policies lapse is that premiums become hard to afford or hard to understand. Every screen here exists to solve one of those two problems.

---

## Entry point

**Home → "จัดการเบี้ย ›"** or **Home → PremiumMgmt** in the services grid.

---

## Hub

### `PremiumMgmtScreen` — การจัดการเบี้ย

The calm, scannable home for everything premium-related. Replaces a cluttered 2×2 tile grid with a clear vertical hierarchy.

**What it shows:**
- Next payment amount + due date pill
- One red "ชำระเงิน" CTA → PaySelect
- Financial health row (% of income indicator) → Affordability
- Two grouped sections: "ทำความเข้าใจ" and "ปรับแผน"
- AIA Vitality promo row
- Payment history link

**Why it exists:** Users were getting lost in the old hub. This screen gives them one obvious action (pay) and clearly groups the rest into "understand" vs "adjust" — two very different intentions.

**Language:** Inline ไทย / EN toggle in the header.

---

## Understand Your Policy

### `AffordabilityScreen` — สุขภาพการเงิน

**Purpose:** Reframe the premium-to-income ratio as a *budgeting tool*, not a judgment. Shows the user where they sit on a safe→caution→risk spectrum.

**Key elements:**
- Large % display (e.g. "11.2%") with coloured track bar
- Explicit note: "นี่คือตัวช่วยวางแผน ไม่ใช่วิธีคำนวณเบี้ย"
- Income and premium data rows
- Amber warning if trend is heading toward 15%+
- Quick links to AdjustPlan and Costs

**Why:** Previous design showed % of income without context — users panicked. Now it's clearly labelled a budgeting guide with a spectrum showing what "safe" means.

---

### `ValueScreen` — คุณค่าที่ได้รับ

**Purpose:** Counter the "I'm paying into a void" feeling. Shows what the premium *buys* — not just the cost.

**Key elements:**
- Hero: total paid so far vs total sum assured
- Value ratio (e.g. "ทุก ฿1 ที่จ่าย = ฿14 ความคุ้มครอง")
- Coverage breakdown: life / hospital / critical illness
- Claims received this year vs premium paid

**Why:** Retention research shows users who understand their coverage-to-cost ratio are far less likely to lapse. This screen makes that ratio impossible to miss.

---

### `IllustrationScreen` — ภาพรวมผลประโยชน์

**Purpose:** The full policy benefit illustration — what happens to the money over the policy's lifetime.

**Key elements:**
- Dark hero card: policy name, sum assured, payment term chips (pay until age 60 / matures at age 90)
- Premium section: annual premium + total over contract term
- Values section (marked "Illustration" in amber): current cash surrender value, annual cash value, maturity value at age 90, estimated total return
- Bar chart of projected cash value by age (40 → 50 → 60 → 75 → 90)
- Disclaimer: values are projections, not guarantees
- Sticky CTA → AdjustPlan

**Why:** Users had no idea their policy had a maturity value or cash surrender value. This screen reveals the investment dimension of their premium — making it feel less like a sunk cost.

---

## Adjust to Your Budget

### `AdjustPlanScreen` — ปรับแผน & เปรียบเทียบ

**Purpose:** Replaces two separate tools (Simulator + SwitchPlan) with one screen where users can self-serve coverage adjustments without calling an agent.

**Key elements:**
- Info banner: "เห็นเบี้ยใหม่ทันที ไม่ต้องโทรหาเจ้าหน้าที่"
- Dark result card: live new monthly premium + delta vs current + coverage chip + % of income chip
- Slider: ฿1.0M ←→ ฿3.0M coverage range (live updates)
- Verdict pill: green (safe ≤10%) / amber (caution ≤13%) / red (risk >13%)
- Lighter-plan cards below (selectable): each shows name, new monthly, savings, and a keeps/changes reveal on selection
- Footer: "ดำเนินการปรับแผน" → ContactAgent, "ดูคำแนะนำ AI" → Recommend

**Premium math:** `monthly = coverage × 0.002125`, `% of income = (monthly × 12) / (income × 12) × 100`

**Why:** The old flow required calling an agent just to explore options. Now users can simulate and compare instantly, which dramatically reduces lapse due to "I didn't know I could change it."

---

### `CostsScreen` — ค่าใช้จ่าย & การผ่อน

**Purpose:** Combines the 5-year premium forecast AND billing frequency choice into one screen, so users can plan affordability proactively.

**Key elements:**
- Bar chart: premium trend 2569–2573 (฿51k → ฿69k, warm amber gradient)
- Amber note: why premiums rise (age bands + medical inflation)
- Billing frequency radio cards: Annual → Quarterly → Monthly (ordered by savings, current shown with badge)
- Savings callout for each option (e.g. "ประหยัด 3% · ฿1,530/ปี")
- Saves on back navigation (triggers FreqConfirm modal)

**Why:** Users who saw the rising cost trend without a "what can I do?" answer panicked. Pairing the forecast with the frequency selector gives them an immediate lever to pull.

---

### `RecommendScreen` — คำแนะนำเฉพาะคุณ · AI

**Purpose:** Personalised next-best-action recommendations from the AI, based on the user's income, life stage, and payment history.

**Key elements:**
- Dark red hero banner with AI label
- 4 recommendation cards, each with: icon, title, concrete impact (e.g. "ประหยัด ฿1,530/ปี"), colored savings pill, one-tap deep link
- Typical recs: switch to annual billing / right-size coverage / switch to lighter plan / unlock Vitality discount
- Disclaimer: "คำแนะนำนี้สร้างจากข้อมูลและแนวโน้ม ไม่ใช่คำแนะนำทางการเงิน"

**Why:** Users don't know what action to take after seeing the data. This screen surfaces the highest-impact options with concrete numbers, removing decision paralysis.

---

## History

### `HistoryScreen` — ประวัติการชำระ

**Purpose:** Full payment history with on-time streak, filter chips, and receipt download.

**Key elements:**
- Summary card: total paid this year + green "ตรงเวลา N งวด" streak pill
- Filter chips: ทั้งหมด / บิล / ใบกรมธรรม์
- Month-grouped rows: policy name, date, method, amount, green check, download icon

### `HistoryFilteredScreen`

Same as HistoryScreen but with an active filter chip (e.g. "AIA Health Happy ✕") and result count. Clears on ✕.

---

## Navigation map

```
PremiumMgmt
├── PaySelect (pay now)
├── Affordability → AdjustPlan / Costs
├── Value
├── Illustration → AdjustPlan
├── AdjustPlan → ContactAgent / Recommend
├── Costs → FreqConfirm
├── Recommend → AdjustPlan / Costs
└── History / HistoryFiltered
```

---

## File locations

| Screen | File |
|---|---|
| PremiumMgmt | `src/screens/premium/PremiumMgmtScreen.tsx` |
| Affordability | `src/screens/premium/AffordabilityScreen.tsx` |
| Value | `src/screens/premium/ValueScreen.tsx` |
| Illustration | `src/screens/premium/IllustrationScreen.tsx` |
| AdjustPlan | `src/screens/premium/AdjustPlanScreen.tsx` |
| Costs | `src/screens/premium/CostsScreen.tsx` |
| Recommend | `src/screens/premium/RecommendScreen.tsx` |
| History | `src/screens/premium/HistoryScreen.tsx` |
| HistoryFiltered | `src/screens/premium/HistoryFilteredScreen.tsx` |

All are in `HomeStack` under `src/navigation/HomeStack.tsx`.

---

## Design tokens used

- `colors.primary` `#D31145` — AIA red, all CTAs and icons
- `colors.success` `#1B9E5A` — safe/on-time states
- `colors.amber` `#E8821A` — caution / due-date warnings
- `colors.screenBg` `#F4F4F6` — page background
- `radius.cardLg` `20` — hero cards
- `fontFamily.jakarta.extraBold` — large numbers (amounts, percentages)
- `fontFamily.anuphan.*` — all Thai body copy
