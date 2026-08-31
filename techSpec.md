# techSpec.md

## 1. Stack Table

| Layer | Choice | Version (target) | Why this, for a hackathon |
|---|---|---|---|
| Monorepo tooling | Turborepo + pnpm | Turbo ^2.x, pnpm ^9.x | Shared types across web/mobile/backend without publishing packages; fast incremental builds matter when the clock is running |
| Customer + Admin frontend | Next.js (App Router) + TypeScript | Next 14.x | SSR for fast first paint on judges' devices/wifi, file-based routing = speed, PWA-installable for a "real app" feel without app-store friction |
| Styling | Tailwind CSS + shadcn/ui | Tailwind 3.x | Fast, consistent UI without hand-rolling a design system from scratch (see `design.md` for tokens layered on top) |
| Worker mobile app | React Native + Expo (managed) | Expo SDK 51+ | Single codebase, Expo Go enables instant live demo via QR scan on any judge's phone — this is a genuine hackathon-day advantage over a native build requiring TestFlight/Play Store review |
| Backend framework | Fastify + TypeScript | Fastify 4.x | Faster than Express, built-in schema validation (JSON Schema) doubles as request validation + a chunk of API docs generation |
| ORM | Prisma | Prisma 5.x | Type-safe DB access shared types flow straight into `shared-types` package; migrations map directly to `schema.md` |
| Database | PostgreSQL 16 + PostGIS extension | — | PostGIS is non-negotiable for the radius/proximity queries the Fair-Match Engine depends on — this is the one place "just use SQLite for the demo" would actively break the core feature |
| Cache / Queue | Redis + BullMQ | Redis 7.x | Availability cache + delayed jobs for offer-timeout logic (`COOP_BUSINESS_LOGIC.md` §1.2) |
| Realtime | Socket.io | 4.x | Job offer push, live status updates; battle-tested, easy client SDKs for both Next.js and React Native |
| Payments | Razorpay (test mode) | Checkout + Orders API | India-first, UPI-native, well-documented test mode — appropriate given the explicit "UPI" mention in the problem statement's implied context |
| Maps / Geocoding | Mapbox | GL JS + Directions API | Generous free tier for hackathon use; Google Maps Platform as documented fallback if team already has GCP credits |
| SMS/OTP | MSG91 (or Twilio) — mocked for demo | — | Real integration trivial to wire later; mocked with a fixed OTP (`123456`) in dev builds, clearly logged as such |
| Object storage | AWS S3 (or local disk in dev) | — | KYC docs, job-completion photos |
| Push notifications | Firebase Cloud Messaging | — | Standard Expo-compatible push |
| Auth | Custom JWT (access + refresh) via Fastify plugin | — | No need for a heavier auth-as-a-service product at this scale; keeps the RBAC model (§ `architecture.md` 4) fully in our control and demoable |

## 2. State Management

| App | Server state | Client/UI state |
|---|---|---|
| Customer Web | TanStack Query (React Query) | Zustand (booking-flow wizard state) |
| Admin Dashboard | TanStack Query | Zustand |
| Worker App | TanStack Query (React Native compatible) | Zustand + React Native's built-in state for navigation-local UI |

Rationale: React Query owns all server cache/sync (avoids the classic "stale UI after a mutation" hackathon demo bug); Zustand for small, App-local UI state (wizard steps, filters) without Redux boilerplate overhead.

## 3. Testing (scoped for hackathon reality)

- Unit tests: Fair-Match Engine scoring function — this is the one piece of logic that must be provably correct, since it's the pitch's central claim. Cover: proximity edge cases, rotation-fairness with tied scores, probation-flag boost.
- Integration test: full booking → offer → accept → complete → pay flow, run against a test DB — this is what should run before every demo rehearsal.
- No aim for full coverage elsewhere — explicitly a scoping decision, not an oversight; document it as such if asked.

## 4. Environments

| Env | Frontend host | Backend host | DB |
|---|---|---|---|
| Local dev | `next dev` / Expo dev server | `fastify` local | Docker Compose Postgres+Redis |
| Demo/staging | Vercel | Railway or Render | Managed Postgres (Railway/Supabase) with PostGIS enabled |

## 5. Linting / Formatting

ESLint (typescript-eslint) + Prettier, shared config in `packages/config`. Pre-commit hook (husky + lint-staged) blocks commits that fail lint — cheap insurance against a broken `main` the night before demo.
