# PRD.md — SahakarConnect

**Problem Statement ID:** 26089 · **Organization:** Ministry of Cooperation · **Department:** National Council for Cooperative Training (NCCT) · **Category:** Software · **Theme:** Agriculture, FoodTech & Rural Development

## 1. Problem Statement (as issued)

Labour Cooperative Federations and Labour Cooperative Societies possess a large pool of skilled workers — electricians, plumbers, carpenters, painters, domestic helpers, caregivers, drivers, gardeners, cleaners, technicians — but lack a structured digital platform to connect these workers with households and institutions that need their services. Private platforms currently dominate this space, extracting high commissions and leaving cooperative labour excluded from the digital gig economy.

## 2. Problem Restated (what we're actually solving)

Two distinct problems hide inside the one problem statement, and conflating them is the most common way teams underbuild this:

1. **The visible problem:** cooperatives have no app. (Any team can fix this — it's a CRUD + booking system.)
2. **The real problem:** even with an app, a cooperative that dispatches jobs the way a private platform does (best-rated worker gets everything) stops being a cooperative in practice. It needs a job-distribution mechanism that keeps the pool of member-workers economically viable as a group, not just individually competitive. This is a governance and fairness problem wearing a software costume.

SahakarConnect is designed to solve both, with (2) as the actual differentiator.

## 3. Target Users / Personas

| Persona | Description | Primary need |
|---|---|---|
| **Customer** | Urban/semi-urban household or institution needing a verified service (electrician, cleaner, caregiver, etc.) | Trustworthy worker, transparent price, easy booking, recourse if something goes wrong |
| **Worker (Cooperative Member)** | Skilled tradesperson already registered with a Labour Cooperative Society; variable smartphone literacy | Steady, fairly-distributed job flow; higher take-home than private platforms; welfare/insurance backing; low-friction app (may have basic Android device, limited data) |
| **Society Admin** | Manages one Cooperative Society (e.g., one district's electricians) | Onboard/verify workers, monitor job quality, resolve disputes within their society |
| **Federation Admin** | Oversees multiple societies (e.g., state-level federation) | Aggregate visibility, cross-society fairness, welfare fund audit, policy-level reporting to Ministry/NCCT |

## 4. Core Features (MVP scope — see `tracker.md` Phase 1–2 for what's actually build-ordered)

**Customer-facing:**
- Browse services by category, view transparent price (base rate + fee breakdown shown, not hidden)
- Book a time slot; pay digitally (UPI-first)
- Live job status tracking; rate & review after completion
- File a dispute with photo evidence

**Worker-facing:**
- Receive job offers scoped to skill + radius + fair-rotation eligibility
- Accept/reject with visible reason prompt (helps Fair-Match Engine tune future offers)
- Navigate to customer location; update job status
- View payout ledger, welfare fund balance, ratings received
- Voice-first assistant in Hindi/Marathi for low-literacy usage

**Cooperative Admin (Society + Federation):**
- Onboard and verify new workers (KYC + skill certification)
- Monitor live jobs, ratings, dispute queue — scoped to their society
- Federation admin: aggregate dashboard across societies, welfare fund oversight
- Fair-Match explainability: see why a given worker was offered a given job

## 5. Non-Goals (explicitly out of scope for prototype)

- Multi-country / multi-currency support
- Native iOS build (Expo Go demo + Android APK sufficient for hackathon)
- Full production-grade Aadhaar eKYC (AUA licensing) — see `INTEGRATIONS.md` for the honest, phased approach
- Dynamic/surge pricing — deliberately excluded; flat transparent pricing is a stated differentiator vs private platforms, not a gap

## 6. Success Criteria / KPIs

**For the prototype demo (what judges actually see):**
- End-to-end booking → job offer → accept → complete → pay → rate loop works live, no mock data typed on stage
- Fair-Match Engine visibly distributes jobs across ≥3 workers in a demo run, not always the top-rated one (this is the single most important thing to show — it's the proof the "cooperative" claim isn't cosmetic)
- Commission math is shown on-screen with real numbers (12% total vs stated private-platform benchmark)

**For the pitch (what judges score on paper):**
- Novelty: cooperative-specific mechanisms (fair rotation, welfare fund, society governance) present and explained, not just "Urban Company with a green logo"
- Feasibility: realistic integration roadmap (mocked-now vs real-later) rather than overclaimed government API usage
- Impact: quantified worker take-home improvement (88% vs typical private-platform worker payout)

**Post-hackathon product KPIs (for the "this could actually ship" narrative):**
- Worker fill-rate variance across a society (target: no single worker receiving >2x the median job count over a rolling 30-day window)
- Customer repeat-booking rate
- Dispute resolution time (society-level SLA)
- Welfare fund utilization rate
