# API_SPEC.md

Base URL (dev): `http://localhost:4000/api/v1`. All authenticated routes require `Authorization: Bearer <access_token>`. Role column = minimum role required (server-enforced, see `architecture.md` §4).

## Auth

| Method | Path | Role | Request | Response |
|---|---|---|---|---|
| POST | `/auth/otp/request` | public | `{ phone_number }` | `{ success }` (mocked: fixed OTP `123456` in dev) |
| POST | `/auth/otp/verify` | public | `{ phone_number, otp }` | `{ access_token, refresh_token, user }` |
| POST | `/auth/refresh` | public (refresh token) | `{ refresh_token }` | `{ access_token }` |
| POST | `/auth/register` | public | `{ phone_number, full_name, role, ...roleSpecificFields }` | `{ user }` |
| GET | `/auth/me` | any | — | `{ user, profile }` |

## Customer

| Method | Path | Role | Request | Response |
|---|---|---|---|---|
| GET | `/services/categories` | public | — | `[{ id, name, icon_key }]` |
| GET | `/services/listings?category_id=` | public | — | `[{ id, name, base_price, estimated_duration_minutes }]` |
| POST | `/bookings` | customer | `{ listing_id, scheduled_slot_start, service_location, service_address_text }` | `{ booking }` — triggers Fair-Match dispatch async |
| GET | `/bookings/:id` | customer, worker (own), society_admin (scoped) | — | `{ booking, current_status, assigned_worker? }` |
| GET | `/bookings/:id/track` | customer | — | `{ worker_location, status, eta_minutes }` (Socket.io channel for live updates: `booking:{id}`) |
| POST | `/bookings/:id/cancel` | customer | `{ reason }` | `{ booking }` |
| POST | `/bookings/:id/rating` | customer | `{ stars, comment }` | `{ rating }` |
| POST | `/disputes` | customer, worker | `{ booking_id, category, description, evidence_urls[] }` | `{ dispute }` |
| GET | `/customers/me/bookings` | customer | — | `[{ booking }]` |

## Worker

| Method | Path | Role | Request | Response |
|---|---|---|---|---|
| PATCH | `/workers/me/availability` | worker | `{ is_available, current_location }` | `{ worker_profile }` |
| GET | `/workers/me/offers` | worker | — | `[{ job_offer }]` (also pushed live via Socket.io channel `worker:{id}:offers`) |
| POST | `/workers/me/offers/:offerId/respond` | worker | `{ action: accept\|reject, reason? }` | `{ job_offer, booking? }` |
| PATCH | `/workers/me/assignments/:id/status` | worker | `{ status: en_route\|arrived\|in_progress\|completed\|no_show }` | `{ job_assignment }` |
| GET | `/workers/me/payouts` | worker | — | `[{ payout }]`, `{ pending_total, paid_total }` |
| GET | `/workers/me/welfare-fund` | worker | — | `{ society_fund_balance, my_claims[] }` |
| POST | `/workers/me/welfare-claims` | worker | `{ category, description, document_url? }` | `{ welfare_claim }` |
| POST | `/workers/me/kyc-documents` | worker | `{ doc_type, storage_url }` | `{ kyc_document }` |

## Cooperative Admin (Society / Federation)

| Method | Path | Role | Request | Response |
|---|---|---|---|---|
| GET | `/admin/workers?status=` | society_admin (own society), federation_admin (any in federation) | — | `[{ worker_profile }]` |
| PATCH | `/admin/workers/:id/status` | society_admin | `{ status, reason }` | `{ worker_profile }` |
| GET | `/admin/jobs/live` | society_admin | — | `[{ booking, assignment_status }]` scoped to society |
| GET | `/admin/jobs/:bookingId/fair-match-explain` | society_admin | — | `{ candidates: [{ worker_id, score, score_breakdown }], selected_worker_id }` — the explainability panel |
| GET | `/admin/disputes?status=` | society_admin, federation_admin | — | `[{ dispute }]` |
| POST | `/admin/disputes/:id/resolve` | society_admin | `{ resolution, note }` | `{ dispute }` |
| GET | `/admin/welfare-claims?status=` | society_admin | — | `[{ welfare_claim }]` |
| POST | `/admin/welfare-claims/:id/review` | society_admin | `{ action: approve\|reject, note }` | `{ welfare_claim }` |
| GET | `/admin/federation/overview` | federation_admin | — | `{ societies: [{ society, worker_count, active_jobs, welfare_fund_balance, avg_rating }] }` |
| GET | `/admin/federation/welfare-fund/audit` | federation_admin | — | `[{ welfare_fund_ledger entries across societies }]` |

## Payments (server-to-server + webhook)

| Method | Path | Role | Request | Response |
|---|---|---|---|---|
| POST | `/payments/create-order` | customer | `{ booking_id }` | `{ razorpay_order_id, amount }` |
| POST | `/payments/webhook/razorpay` | Razorpay signature-verified | Razorpay payload | `200 OK` — triggers commission split (`COOP_BUSINESS_LOGIC.md` §2) and payout ledger write |

## Conventions

- All list endpoints support `?page=&limit=` (default limit 20).
- Errors: `{ error: { code, message } }`, HTTP status matches semantics (400 validation, 401/403 auth, 404 not found, 409 conflict e.g. double-accept of an offer).
- All monetary values as `DECIMAL` strings in JSON, never floats, to avoid rounding drift in commission math.
- Fastify JSON Schema validation on every route — schemas live in `packages/shared-types` and are the same types consumed by frontend TanStack Query hooks, so drift between spec and implementation is structurally harder, not just policed by discipline.
