# INTEGRATIONS.md

Every integration below is labeled **REAL** (actually wired up and functioning in the prototype) or **MOCKED** (simulated to match the real API's contract, honestly disclosed — see `rules.md` §3). Never present a MOCKED item as REAL to judges.

## 1. Payments — Razorpay — **REAL (test mode)**

- Test-mode API keys, UPI test flow.
- Order creation → checkout → webhook capture → commission split (`COOP_BUSINESS_LOGIC.md` §2) → payout ledger write. This full loop should genuinely run live in the demo.
- Production path: swap test keys for live keys post-KYB (Know Your Business) verification with Razorpay for the cooperative federation as the registered entity — a real, known process, not a blocker requiring government partnership (unlike the items below).

## 2. Maps / Geocoding — Mapbox — **REAL**

- Geocoding customer address → lat/lng.
- Directions API for worker navigation view + ETA calculation.
- Free tier sufficient for hackathon-scale demo traffic.

## 3. SMS/OTP — MSG91 (or Twilio) — **MOCKED**

- Dev builds use a fixed OTP (`123456`) with a visible `[DEV MODE]` label on the OTP screen.
- Real integration is a same-day task post-hackathon (both providers have simple REST APIs); not implemented now purely to avoid burning demo-day SMS credits/rate limits on unpredictable judge wifi.

## 4. e-Shram Worker Database — **MOCKED**

- Purpose: verify a worker's existing e-Shram Unique Account Number (UAN) as part of onboarding — reduces duplicate KYC effort for workers already registered in India's national database for unorganized-sector workers.
- Prototype behavior: `POST /admin/workers/:id/verify-eshram` calls an internal mock endpoint that returns a response shaped to match e-Shram's published data fields (name, UAN, registered trade category, address) for a small fixed set of seeded test UANs.
- Real integration requires API access granted through a government partnership — realistically obtained via an NCCT/Ministry of Cooperation MoU, not something a student team can self-serve. State this plainly if asked; it's the correct answer, not a weak one.

## 5. DigiLocker — **MOCKED**

- Purpose: fetch/verify skill certificates and identity documents a worker has already stored in their DigiLocker, avoiding re-upload and giving a government-backed verification signal.
- Prototype behavior: same mock-endpoint pattern as e-Shram — response shape matches DigiLocker's document-pull API contract.
- Real path: DigiLocker has a documented Partner API program requiring registration as a Requester entity; feasible post-hackathon for a real cooperative-federation-backed rollout, not for a student prototype in the hackathon window.

## 6. Aadhaar eKYC — **NOT ATTEMPTED (documented as future work, not mocked)**

- Direct Aadhaar authentication requires AUA/KUA (Authentication User Agency / KYC User Agency) licensing from UIDAI — a formal, audited registration process, not an API key signup. No hackathon team should claim to have this "mocked as if it were almost real" — it's a materially different tier of access than e-Shram/DigiLocker.
- Correct framing for the pitch: identity verification in v1 uses DigiLocker-mediated document pull (which can itself surface Aadhaar-linked documents with user consent, without SahakarConnect ever directly handling raw Aadhaar authentication) — this is both more honest and, correctly explained, a *stronger* answer than claiming direct Aadhaar integration, because it shows the team understands the actual regulatory boundary.

## 7. Push Notifications — Firebase Cloud Messaging — **REAL**

- Standard Expo-compatible push for job offers, booking updates, welfare claim status changes.

## 8. Object Storage — AWS S3 (or local disk in `dev`) — **REAL in demo (S3), local fallback for offline dev**

- KYC document uploads, job-completion photos. Encrypted at rest (see `rules.md` §4).

## 9. Voice Assistant (Hindi/Marathi, worker app) — **REAL, scoped**

- Speech-to-text (device-native or a lightweight cloud STT API) → intent match against a small fixed command set ("mark arrived," "mark complete," "read next offer aloud") → text-to-speech confirmation.
- Deliberately not a general-purpose LLM chatbot — scoped to a fixed, testable command grammar so it's reliably demoable rather than a live-LLM gamble on stage with unpredictable wifi.

## 10. Summary Table

| Integration | Status | Demo-day risk if it fails |
|---|---|---|
| Razorpay (test) | REAL | Low — test mode is stable |
| Mapbox | REAL | Low |
| SMS/OTP | MOCKED | None — fixed OTP has no external dependency |
| e-Shram | MOCKED | None — internal mock |
| DigiLocker | MOCKED | None — internal mock |
| Aadhaar eKYC | NOT ATTEMPTED | None — not claimed |
| FCM Push | REAL | Medium — venue wifi/firewall; have a polling fallback |
| S3 | REAL (fallback local) | Low |
| Voice assistant | REAL, scoped | Medium — have a visible text-input fallback if STT API is unreachable on venue wifi |
