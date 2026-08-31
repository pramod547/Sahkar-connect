# COOP_BUSINESS_LOGIC.md — The Actual Differentiator

Read this file first if you only have time to implement one thing well. Everything else in this repo is standard marketplace-app engineering; this file is the part that makes SahakarConnect a cooperative platform rather than Urban Company with different branding.

## 1. Fair-Match Engine (Job Distribution Algorithm)

### 1.1 The problem it solves
A naive dispatch algorithm ("send job to nearest highest-rated available worker") is exactly what a private platform does, and it produces exactly the outcome a cooperative exists to avoid: a small number of top-rated workers absorb most of the job volume, while the rest of the society's members — who are equally certified, equally members, equally entitled to a livelihood through the cooperative — get starved out. Over months, this recreates private-platform-style inequality *inside* a cooperative structure, which defeats the point.

### 1.2 The scoring formula

For a new job `J` requiring skill `S` in location `(lat, lng)`, candidate pool = all workers in the same Cooperative Society (or federation-pooled society, see §1.4) who: hold skill `S`, are marked available, are within `MAX_RADIUS_KM` (default 8km, configurable per society/service type), and are not currently on another job.

For each candidate worker `w`, compute:

```
score(w) = (W_prox * proximity_score(w))
         + (W_rating * rating_score(w))
         + (W_fair * rotation_fairness_score(w))
         + (W_skill * skill_match_score(w))

Default weights: W_prox = 0.30, W_rating = 0.20, W_fair = 0.35, W_skill = 0.15
```

**proximity_score(w)** = `1 - (distance_km / MAX_RADIUS_KM)`, clamped [0,1]

**rating_score(w)** = `worker.rolling_avg_rating / 5.0`, but only after the worker has ≥5 completed jobs. Below that, use the society-wide average rating as a neutral prior — this stops a new member's first bad-luck rating from tanking their score before they have a track record (see §3 for the rating-safeguard rationale).

**rotation_fairness_score(w)** — the core cooperative mechanism:
```
jobs_this_week = count of completed/assigned jobs for w in trailing 7 days
society_median_jobs_this_week = median across all active workers in the society

rotation_fairness_score(w) = clamp(1 - (jobs_this_week / (society_median_jobs_this_week + 1)), 0, 1)
```
Interpretation: a worker at or below the society's median job count this week scores near 1 (high priority to receive the next job). A worker already well above median scores near 0 (deprioritized, not blocked — they can still win the job if proximity/skill/rating are decisively better, but the algorithm actively resists pure winner-take-all).

**skill_match_score(w)** = 1.0 for exact skill match, 0.6 for adjacent/certified-secondary skill (e.g. an electrician also certified for basic appliance repair), used only when exact-skill pool is empty.

Highest `score(w)` wins the offer. **Offer is not final assignment** — worker has `OFFER_TIMEOUT_SECONDS` (default 45s) to accept; on reject/timeout, job re-offers to next-highest score. This is why worker-side reject-with-reason (§tracker P1-4) matters: reject patterns feed back into future scoring tuning.

### 1.3 Why this beats a hard queue/round-robin
A strict round-robin (literally "next in line gets the job regardless of distance") is fairer on paper but fails in practice — sending a job 12km away to the "next" worker while someone 1km away sits idle is bad for the customer and bad for the worker's fuel/time economics. Weighted scoring gets most of round-robin's fairness benefit without its operational absurdity. This is a real trade-off — document it as one in the pitch; don't pretend it's a solved problem, it's a tuned one.

### 1.4 Federation-level pooling (overflow handling)
If a society's candidate pool for a job is empty (no available worker with matching skill in radius), the job escalates to the federation level and considers workers from sibling societies within the same federation, same scoring formula, with an added `W_home_society` small penalty (default -0.05) to keep home-society jobs preferentially home-society-served — protects the "this is *my* cooperative's work" identity while still getting the customer served.

## 2. Commission & Welfare Fund Split

Every completed, paid booking is split at the moment of payment capture:

| Component | % of booking value | Purpose |
|---|---|---|
| **Worker payout** | **88%** | Direct to worker's payout ledger, withdrawable per society payout schedule |
| Tech & Ops fee | 5% | Platform infra, support, ongoing dev |
| Welfare Fund contribution | 4% | Pooled per-society fund — accident/medical claims, equipment grants (see §4) |
| Federation governance fee | 3% | Society/federation admin overhead, worker training programs (ties to NCCT's training mandate) |

**Total platform take: 12%**, itemized and shown to both customer (in price breakdown) and worker (in payout receipt) — transparency is itself a stated differentiator vs private platforms' opaque commission structures, so hiding this split anywhere in the UI defeats the pitch.

Formula:
```
worker_payout = booking_value * 0.88
tech_ops_fee = booking_value * 0.05
welfare_contribution = booking_value * 0.04
federation_fee = booking_value * 0.03
```
All four values persisted per-transaction in `payments` + `welfare_fund_ledger` (see `schema.md`) — never computed only at display time, so the audit trail is real.

## 3. Rating System Safeguards

Raw average rating is a bad signal for a cooperative — one angry customer shouldn't be able to functionally suspend a worker's livelihood. Safeguards:
- Minimum 5 completed jobs before a worker's individual rating affects their Fair-Match score (see §1.2).
- Rolling window: rating_score uses trailing 90-day average, not lifetime — allows recovery from a bad patch.
- A rating below 2 stars triggers a mandatory dispute-review by the society admin, not an automatic penalty — separates "genuinely bad job" from "unreasonable customer," which only a human reviewer scoped to the society can judge.
- Worker cannot be deactivated by rating alone — deactivation requires society admin action with a logged reason (governance, not algorithm, makes livelihood-ending decisions).

## 4. Welfare Fund — Claim Flow

1. Worker (or society admin on worker's behalf) files a claim: category (medical / accident / equipment loss / other), description, optional document upload.
2. Society admin reviews against fund balance (society's welfare_fund_ledger running balance) and approves/rejects with a reason.
3. Approved claims disburse from the fund ledger to the worker's payout ledger, logged as a distinct transaction type (not conflated with job payouts, for audit clarity).
4. Federation admin has read access to all claims across societies for oversight/reporting — this is the aggregate view NCCT-level stakeholders would actually want.

This is deliberately a human-approved workflow, not an auto-payout — a hackathon-appropriate scope (avoids needing insurance-actuarial logic) while still demonstrating the structural mechanism.

## 5. Worker Onboarding Tiering

`applicant → documents_pending → verified → active → (suspended | inactive)`

- **applicant**: submitted registration, no jobs visible yet.
- **documents_pending**: awaiting KYC doc + skill certificate review by society admin.
- **verified**: approved, but new — subject to a `PROBATION` flag for first 5 jobs (slightly boosted proximity weight / reduced job value cap, so early jobs are lower-stakes for both sides — a real trust-ramp, not just a status label).
- **active**: full Fair-Match eligibility.
- **suspended**: society-admin action (pending dispute investigation), temporarily excluded from candidate pool, retains history/payout access.
- **inactive**: worker-initiated pause (e.g. leave) or society-terminated.

## 6. Dispute Escalation

`filed → society_review → (resolved | escalated_to_federation) → closed`

Default SLA: society admin must act within 48 hours or it auto-escalates to federation admin — prevents disputes silently dying at the society level, which is a realistic failure mode worth explicitly designing against rather than assuming goodwill.

## 7. What's deliberately NOT modeled (scope honesty)

- No dynamic/surge pricing — flat pricing is a stated product decision, not a missing feature.
- No worker-to-worker job trading/marketplace — out of scope for v1, real cooperatives may want this eventually via elected society governance, noted as future work only.
- No automated welfare-fund payout (kept human-approved, see §4) — actuarial automation is a post-hackathon concern.
