# DEV_GUIDE.md — Local Setup

## 1. Prerequisites

- Node.js 20 LTS, pnpm 9+
- Docker + Docker Compose (for Postgres + Redis)
- Expo CLI (`npx expo` — no global install needed) + Expo Go app on a physical phone for live testing
- Razorpay test-mode account (free) for API keys
- Mapbox account (free tier) for API token

## 2. Clone & Install

```bash
git clone <repo-url> SahakarConnect
cd SahakarConnect
pnpm install
```

## 3. Environment Variables

Copy `.env.example` → `.env` in `services/backend/` and each `apps/*` as needed. Never commit the real `.env`.

| Variable | Used by | Example |
|---|---|---|
| `DATABASE_URL` | backend | `postgresql://coop:coop@localhost:5432/sahakarconnect` |
| `REDIS_URL` | backend | `redis://localhost:6379` |
| `JWT_ACCESS_SECRET` / `JWT_REFRESH_SECRET` | backend | random 32+ char strings, dev-only values in `.env.example` |
| `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` | backend | from Razorpay test dashboard |
| `MAPBOX_ACCESS_TOKEN` | customer-web, worker-app | from Mapbox account |
| `MOCK_OTP_CODE` | backend | `123456` (dev only, see `INTEGRATIONS.md` §3) |
| `NEXT_PUBLIC_API_BASE_URL` | customer-web, admin-web | `http://localhost:4000/api/v1` |
| `EXPO_PUBLIC_API_BASE_URL` | worker-app | `http://<your-local-ip>:4000/api/v1` (use LAN IP, not `localhost`, so a physical phone on Expo Go can reach it) |

## 4. Infra (Postgres + PostGIS + Redis)

`docker-compose.yml` at repo root:

```yaml
services:
  postgres:
    image: postgis/postgis:16-3.4
    environment:
      POSTGRES_USER: coop
      POSTGRES_PASSWORD: coop
      POSTGRES_DB: sahakarconnect
    ports: ["5432:5432"]
    volumes: ["pgdata:/var/lib/postgresql/data"]
  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]
volumes:
  pgdata:
```

```bash
docker compose up -d
```

## 5. Database Setup

```bash
cd services/backend
pnpm prisma migrate dev --name init
pnpm prisma db seed
```

Seed script (`prisma/seed.ts`) creates, per `tracker.md` P0-6: 2 federations, 4 societies, ~30 workers spread across skill categories and probation/active statuses (so the Fair-Match Engine has a realistic, non-trivial pool to demo against), ~10 customers, and a handful of pre-populated bookings in various states for demo continuity.

## 6. Running Everything

```bash
# from repo root, runs all apps via Turborepo pipeline
pnpm dev
```

Or individually:
```bash
pnpm --filter backend dev            # Fastify on :4000
pnpm --filter customer-web dev       # Next.js on :3000
pnpm --filter admin-web dev          # Next.js on :3001
pnpm --filter worker-app start       # Expo dev server — scan QR with Expo Go
```

## 7. Testing

```bash
pnpm --filter backend test           # includes fair-match.test.ts — run this before every rehearsal
```

## 8. Pre-Demo Checklist

1. `pnpm prisma db seed --reset` — clean, known-good data state.
2. Confirm all four apps running, no console errors.
3. Run through the full customer→worker→payment loop once, live, before judges arrive.
4. Confirm `MOCK` badges visible where relevant (`rules.md` §3) — nothing overclaimed.
5. Have `docs/SIH_PITCH_PROPOSAL.md` §9 (risks/limitations) fresh in mind — judges will probe there.

## 9. Common Issues

| Symptom | Likely cause | Fix |
|---|---|---|
| Worker app can't reach backend | Using `localhost` instead of LAN IP in `EXPO_PUBLIC_API_BASE_URL` | Use `ipconfig`/`ifconfig` to find your machine's LAN IP, phone and laptop must be on same wifi |
| PostGIS functions failing | Wrong Postgres image (plain `postgres` instead of `postgis/postgis`) | Use the image pinned in §4 |
| Fair-Match always picks the same worker | Seed data has only 1 worker with matching skill in radius | Check seed script covers ≥3 workers per common category near seeded customer locations |
| Razorpay webhook not firing locally | Webhooks need a public URL | Use `ngrok http 4000` during dev, register the ngrok URL in Razorpay test webhook settings |
