# rules.md — Repo Rules for Human & AI Contributors

Applies to any AI coding agent (Claude Code, Cursor, Copilot) and human devs working in this repo. If you're an AI agent reading this file automatically, treat every rule below as binding unless the user explicitly overrides it in-session.

## 0. Project Identity

- Product: **SahakarConnect** — cooperative-owned gig services platform for SIH 2026, PS ID 26089 (Ministry of Cooperation / NCCT).
- Read `docs/PRD.md` before touching code. Do not "improve" scope without checking `docs/tracker.md` first — scope creep is the #1 hackathon failure mode.

## 1. Tech Stack Lock

Do **not** introduce a new framework, database, or major library without updating `docs/techSpec.md` in the same PR. Stack is fixed for hackathon duration:

- Monorepo: Turborepo + pnpm workspaces
- Web (customer + admin): Next.js 14 (App Router) + TypeScript + Tailwind
- Mobile (worker): React Native + Expo (managed workflow)
- Backend: Node.js + TypeScript + Fastify + Prisma
- DB: PostgreSQL 16 + PostGIS
- Cache/Queue: Redis + BullMQ
- Realtime: Socket.io

Reason: judges evaluate working demo, not stack novelty. Every hour spent evaluating a new tool is an hour not spent on the fair-match algorithm, which is the actual differentiator.

## 2. Coding Standards

- TypeScript strict mode everywhere. No `any` without a `// TODO(reason)` comment.
- One PR = one feature from `tracker.md`. No drive-by refactors bundled with feature work.
- Naming: `camelCase` for variables/functions, `PascalCase` for components/types, `snake_case` for DB columns (Prisma `@map`).
- Every API endpoint must match `docs/API_SPEC.md` exactly — path, method, response shape. If it needs to change, update the spec file first, in the same commit.
- Every DB migration must match `docs/schema.md`. Schema file is the source of truth, not the migration history.
- No inline magic numbers for money/commission math — pull from `packages/shared/constants.ts`, cross-referenced to `docs/COOP_BUSINESS_LOGIC.md`.

## 3. Mocked vs Real — Non-Negotiable Labeling Rule

Anything not genuinely wired up (e-Shram, DigiLocker, Aadhaar eKYC, live SMS gateway, live payment settlement) **must**:
1. Be listed in `docs/INTEGRATIONS.md` under "Mocked for Prototype."
2. Have a visible `MOCK` badge in the UI when demoed (small dev-mode tag, removable in prod build).
3. Never be described in the pitch deck or verbally to judges as "integrated" — say "sandbox-simulated, integration-ready" instead. Judges test-drive prototypes and ask pointed questions; getting caught overclaiming a government API integration is worse for scoring than admitting it's mocked.

## 4. Security Baseline (non-optional even for a hackathon prototype)

- No secrets in code or commit history. `.env` files gitignored; `.env.example` committed with dummy values.
- Passwords: bcrypt/argon2 hashed, never logged.
- JWT short-lived (15 min access token) + refresh token rotation.
- All KYC documents (Aadhaar, worker ID proofs) encrypted at rest even in the prototype DB — this is a live demo point ("we treat worker ID data as sensitive by default") and a real Digital Personal Data Protection Act (DPDPA) consideration the judges may ask about.
- RBAC checked server-side on every endpoint — never trust a role claim from the client alone.

## 5. Git Workflow

- Branches: `feature/<short-name>`, `fix/<short-name>`.
- Commit messages: `[app] type: description` e.g. `[worker-app] feat: add job accept/reject swipe UI`.
- No direct commits to `main`. `main` must always be demo-able — if it's broken, nobody goes home until it's fixed or reverted.

## 6. What AI Agents Should Never Do Unsupervised

- Never invent new API endpoints not in `API_SPEC.md`.
- Never change the commission/welfare-fund split numbers in code without the human explicitly confirming a change to `COOP_BUSINESS_LOGIC.md` first.
- Never remove the fair-rotation logic to "simplify" job matching — this is the single most-judged piece of the solution. If it needs simplifying for time, simplify the algorithm's sophistication, not its existence.
- Never claim a task in `tracker.md` is "Done" without it being runnable end-to-end.

## 7. Definition of Done (per feature)

A feature is Done when: (1) it matches its spec doc, (2) it works end-to-end in the local dev environment per `DEV_GUIDE.md`, (3) it's demoable without console errors, (4) `tracker.md` is updated.
