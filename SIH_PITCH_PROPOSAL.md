# SIH_PITCH_PROPOSAL.md — SahakarConnect

Structured to match the standard SIH presentation sections (Problem, Idea, Technical Approach, Feasibility & Viability, Impact & Benefits, Research/References). Use this as the content source when building the actual PPT — do not just paste this in as slide text, it's too dense; extract headlines.

## Slide-by-slide content map

### 1. Title
**SahakarConnect** — "Cooperative-Owned. Worker-First. Community-Trusted."
PS 26089 · Ministry of Cooperation · NCCT

### 2. Problem Statement
(Use the official text verbatim, then add the one-line reframe:)
> "The gap isn't just missing software — it's that any software copying a private gig platform's dispatch logic quietly turns a cooperative into a private platform anyway. The real problem is building dispatch that stays fair to the group, not just efficient for the customer."

### 3. Idea / Proposed Solution
Three-sided platform (Customer web/PWA, Worker mobile app, Cooperative Admin dashboard) — but the headline feature is the **Fair-Match Engine**: a job-dispatch algorithm that weighs proximity, skill, and rating *alongside* a rotation-fairness score, so job flow stays distributed across a society's member workers instead of concentrating on whoever ranks highest. This is the mechanism that makes "cooperative" true in the software, not just in the branding.

Secondary differentiator: **Welfare Fund**, funded from a fixed slice of every transaction, giving workers accident/medical claim access — something private gig platforms don't structurally offer.

### 4. Novelty / Uniqueness — comparison table

| | Private gig platforms (e.g. Urban Company–style) | SahakarConnect |
|---|---|---|
| Ownership | VC-owned, profit-maximizing | Cooperative-owned (society + federation) |
| Job distribution | Conversion-optimized (top performer gets most jobs) | Fairness-weighted rotation within skill/radius pool |
| Commission | Reported in the 20–30% range industry-wide | 12% total, itemized (5% tech/ops, 4% welfare fund, 3% federation governance) |
| Worker safety net | Platform-dependent, often minimal | Structural welfare fund + society-backed liability cover |
| Pricing | Often demand-based/surge | Flat, transparent, shown to customer before booking |
| Governance | No worker voice in platform decisions | Society admin = elected/appointed cooperative representative |

### 5. Real-world grounding (cite in pitch, don't over-claim novelty)
Worker-owned/platform-cooperative dispatch models exist and have working precedent internationally — e.g. driver-owned ride cooperatives and courier cooperatives in the US and Europe. India has not deployed this pattern at cooperative-federation scale for household services; that gap, not the general concept, is the opportunity. Frame this honestly in the pitch — claiming to have invented platform cooperativism will read as naive to any judge who's done five minutes of research.

### 6. Technical Approach
- High-level architecture diagram (pull from `architecture.md`)
- Fair-Match Engine scoring formula (pull from `COOP_BUSINESS_LOGIC.md`) — show the actual weighted formula on a slide. A visible formula reads as "engineered," a vague description of "smart matching" reads as hand-wavy.
- AI component: explainable match-scoring (not a bolted-on chatbot) + rule-based fraud/no-show flagging, with a stated roadmap to a trained anomaly-detection model post-hackathon.

### 7. Feasibility & Viability
Be explicit about a phased integration plan — this is a credibility signal, not a weakness:

| Phase | Status at hackathon demo | Path to production |
|---|---|---|
| Core booking, fair-match, payments (test mode) | **Live/working** | Harden + load-test |
| e-Shram worker ID lookup | **Mocked** (sandbox response shape matches published e-Shram API docs) | Apply for NCCT-sponsored API access via Ministry MoU |
| DigiLocker document verification | **Mocked** | Apply to DigiLocker Partner Program |
| UPI settlement | **Test-mode via Razorpay** | Move to production payment aggregator + escrow compliance review |

Say this plainly to judges: *"These three are simulated for the prototype because production access requires a government partnership we don't have as students — the integration points and data contracts are already built to match the real APIs, so this is a wiring change, not a redesign, once that MoU exists."* This is a stronger answer than pretending it's already live and getting caught.

### 8. Impact & Benefits
- **Worker economics:** 88% take-home vs an industry-cited 70–80% on private platforms — quantify with a real example transaction on-slide.
- **Fairness:** show the rotation-variance metric from a live demo run (screenshot of Fair-Match explainability panel).
- **Social protection:** welfare fund as a structural first for gig-style cooperative work in India.
- **Government alignment:** directly supports Ministry of Cooperation's "Sahakar se Samriddhi" (prosperity through cooperation) framing — digitizing existing cooperative infrastructure rather than disrupting it.

### 9. Risks & honest limitations (include this slide — judges respect it)
- Government API access is the real bottleneck to production, not the tech.
- Cold-start problem: needs a critical mass of both workers and customers per locality to make fair rotation meaningful (a rotation algorithm with 2 workers isn't proving much) — plan: launch society-by-society, starting with pilot societies already having 50+ verified workers.
- Requires cooperative societies to digitize worker rosters — some administrative lift on their end, not just a tech rollout.

### 10. Team & Ask
Standard team slide. Ask: pilot MoU with one NCCT-affiliated cooperative society for real-world validation post-SIH.
