# implementation.md — Phased Build Roadmap & Scaffold

Companion to `tracker.md` — this file explains the *why* behind the phase ordering; `tracker.md` is the live checklist.

## 1. Phase Ordering Rationale

Build order is chosen so that at any point past Phase 1, there's something genuinely demoable — a hackathon team that saves the "impressive" work for last risks having nothing working if time runs out. Phase 1 alone (the core booking loop) is the floor; everything after is upside.

- **Phase 0 (Setup):** infra, auth, schema, seed data. Boring, non-negotiable, blocks everything else.
- **Phase 1 (Core Booking Loop):** the full customer→match→worker→complete cycle, including a *working* v1 Fair-Match Engine. This is the minimum viable demo. If the team runs out of time after this phase, they still have a real, coherent product to show.
- **Phase 2 (Money & Trust):** payments, commission split, ratings, welfare fund, disputes — turns the loop into something with real economics, which is where the "cooperative" claims get their numbers.
- **Phase 3 (Cooperative Differentiators):** explainability panel, federation dashboard, voice assistant, fraud flagging — the things that separate this from a generic booking app in the judges' eyes.
- **Phase 4 (Polish for Pitch):** offline tolerance, empty/error states, demo data reset, backup video. Do not skip this for "just one more feature" — a broken demo scores worse than a smaller, working one.

## 2. Repo / File Scaffold

```
SahakarConnect/
├── rules.md
├── tracker.md
├── turbo.json
├── pnpm-workspace.yaml
├── docs/                          # this folder
├── apps/
│   ├── customer-web/               # Next.js
│   │   ├── app/
│   │   │   ├── (marketing)/
│   │   │   ├── booking/[listingId]/
│   │   │   ├── track/[bookingId]/
│   │   │   └── layout.tsx
│   │   └── components/
│   ├── admin-web/                  # Next.js, separate app for distinct auth/RBAC boundary
│   │   ├── app/
│   │   │   ├── workers/
│   │   │   ├── jobs/
│   │   │   ├── disputes/
│   │   │   ├── welfare-fund/
│   │   │   └── federation/          # federation_admin-only routes
│   │   └── components/
│   └── worker-app/                 # Expo React Native
│       ├── app/
│       │   ├── (tabs)/home.tsx
│       │   ├── (tabs)/payouts.tsx
│       │   ├── (tabs)/welfare.tsx
│       │   ├── offer-card.tsx
│       │   └── job-navigation.tsx
│       └── components/
├── services/
│   └── backend/                    # Fastify
│       ├── src/
│       │   ├── modules/
│       │   │   ├── auth/
│       │   │   ├── booking/
│       │   │   ├── fair-match/       # isolated, unit-testable
│       │   │   ├── payments/
│       │   │   ├── coop-admin/
│       │   │   └── notifications/
│       │   ├── plugins/              # fastify plugins: auth, rbac, db, redis
│       │   └── server.ts
│       ├── prisma/
│       │   ├── schema.prisma         # generated to match docs/schema.md
│       │   └── seed.ts
│       └── test/
│           └── fair-match.test.ts    # priority test — see techSpec.md §3
└── packages/
    ├── shared-types/                # Zod/TS types shared FE↔BE
    ├── config/                      # eslint/prettier/tsconfig base
    └── ui/                          # shared Tailwind components (design.md tokens)
```

## 3. Fair-Match Engine — implementation note

Implement as a **pure function** first: `rankCandidates(job, candidatePool, weights) → RankedCandidate[]`, fully unit-testable with no DB/network dependency. Wire it into the Booking Module (which handles the actual DB queries + Socket.io dispatch) only after the pure function is tested against the edge cases in `techSpec.md` §3. This separation is what makes it credible to say, under judge questioning, "yes, we tested the fairness algorithm specifically" rather than "it's part of the booking code somewhere."

## 4. Suggested Team Split (for a ~6-person SIH team)

| Track | Focus |
|---|---|
| Backend/DB (2) | Auth, schema, Fair-Match Engine, payments webhook |
| Customer + Admin Web (2) | Next.js apps, shared component work |
| Worker Mobile (1) | Expo app, offline queue, voice assistant |
| Pitch/Design/Integration glue (1) | `design.md` tokens, deck (`SIH_PITCH_PROPOSAL.md`), demo script, seed data realism |

Do not let the pitch/deck work start only after the code is "done" — the honest-integration framing (`INTEGRATIONS.md`) and the fairness-metric screenshots (`COOP_BUSINESS_LOGIC.md`, `design.md` explainability panel) need to be pulled from a working system, not invented after the fact.
