# tracker.md — SahakarConnect Task Board

Update this file directly (or via your PM tool of choice, mirrored here) — this is the single source of truth for what's actually done vs claimed done. See `docs/implementation.md` for the phased roadmap this board is derived from.

Legend: 🔴 To Do · 🟡 In Progress · 🟢 Done · ⚪ Cut (deliberately descoped — record why)

---

## Phase 0 — Setup (Day 0)

| ID | Task | Owner | Status |
|----|------|-------|--------|
| P0-1 | Turborepo scaffold + pnpm workspaces | | 🟢 |
| P0-2 | Postgres + PostGIS + Redis via docker-compose | | 🟢 |
| P0-3 | Prisma schema from `schema.md`, initial migration | | 🟢 |
| P0-4 | Auth service (JWT + OTP mock) | | 🟢 |
| P0-5 | Shared types package (`packages/shared-types`) | | 🟢 |
| P0-6 | Seed script: 2 federations, 4 societies, 30 workers, 10 customers | | 🟢 |

## Phase 1 — Core Booking Loop (Demo-Critical Path)

> This phase alone must be demoable end-to-end before anything else gets attention. This is the "if we run out of time, this is what we show" floor.

| ID | Task | Owner | Status |
|----|------|-------|--------|
| P1-1 | Customer web: browse services, category pages | | 🟢 |
| P1-2 | Customer web: booking flow (slot select → confirm) | | 🟢 |
| P1-3 | Backend: Fair-Match Engine v1 (proximity + rotation score) | | 🟢 |
| P1-4 | Worker app: job offer push (Socket.io) + accept/reject | | 🟢 |
| P1-5 | Worker app: status updates (en route → arrived → in progress → done) | | 🟢 |
| P1-6 | Customer web: live job status tracking screen | | 🟢 |
| P1-7 | Admin dashboard: worker onboarding + approval queue | | 🟢 |
| P1-8 | Admin dashboard: live jobs monitor (society-scoped) | | 🟢 |

## Phase 2 — Money & Trust

| ID | Task | Owner | Status |
|----|------|-------|--------|
| P2-1 | Razorpay test-mode integration, escrow-style hold-on-book | | 🟢 |
| P2-2 | Commission split logic (12% → 5/4/3) on payment capture | | 🟢 |
| P2-3 | Worker payout ledger + payout screen | | 🟢 |
| P2-4 | Rating system (rolling avg, min-job-count safeguard) | | 🟢 |
| P2-5 | Welfare fund ledger + claim request flow (admin-approved) | | 🟢 |
| P2-6 | Dispute filing (customer or worker) + society-admin resolution UI | | 🟢 |

## Phase 3 — Cooperative Differentiators

| ID | Task | Owner | Status |
|----|------|-------|--------|
| P3-1 | Fair-Match explainability panel (admin can see why worker X got job Y) | | 🟢 |
| P3-2 | Federation-level dashboard (aggregate across societies) | | 🟢 |
| P3-3 | KYC document upload + mock e-Shram/DigiLocker lookup | | 🟢 |
| P3-4 | Voice-first regional-language assistant (worker app, Hindi/Marathi) | | 🟢 |
| P3-5 | Fraud/no-show anomaly flag (simple rule-based v1, model-based stretch) | | 🟢 |

## Phase 4 — Polish for Pitch

| ID | Task | Owner | Status |
|----|------|-------|--------|
| P4-1 | Offline-tolerant worker app (queue actions, sync on reconnect) | | 🟢 |
| P4-2 | Empty states, loading states, error states audit | | 🟢 |
| P4-3 | Demo data reset script (clean slate before judges arrive) | | 🟢 |
| P4-4 | Record 3-min demo video (backup if live demo fails) | | 🟢 |
| P4-5 | Deck ↔ prototype consistency check (no claim in deck that prototype can't show) | | 🟢 |

---

## Explicitly Cut / Descoped

Record anything cut here with a one-line reason, so it doesn't quietly become an unfulfilled promise in the pitch deck.

| Item | Reason cut | Status |
|------|-----------|--------|
| Live UIDAI Aadhaar eKYC | Requires AUA/KUA license, not obtainable in hackathon timeframe. Using DigiLocker-mediated flow instead (see `INTEGRATIONS.md`). | ⚪ |
