# appflow.md — End-to-End User Journeys

## 1. Customer Booking Journey

```mermaid
stateDiagram-v2
    [*] --> BrowsingServices
    BrowsingServices --> SelectingSlot: pick service listing
    SelectingSlot --> ConfirmingBooking: choose date/time
    ConfirmingBooking --> AwaitingMatch: pay (Razorpay order created, held)
    AwaitingMatch --> WorkerAssigned: Fair-Match Engine finds + worker accepts
    AwaitingMatch --> NoMatchFound: pool exhausted (society + federation) → notify + offer reschedule
    WorkerAssigned --> WorkerEnRoute
    WorkerEnRoute --> JobInProgress: worker marks arrived + starts
    JobInProgress --> JobCompleted: worker marks complete
    JobCompleted --> PaymentCaptured: commission split executes
    PaymentCaptured --> RatingPrompt
    RatingPrompt --> [*]
    JobInProgress --> DisputeFiled: customer flags issue
    JobCompleted --> DisputeFiled: post-hoc issue
    DisputeFiled --> [*]
```

**Key screen sequence (customer web):** Home (category grid, icon-first) → Category listing → Service detail (transparent price shown here, including the 12% breakdown on tap — "See where your money goes") → Slot picker → Address confirm → Payment → Live tracking (map + status timeline) → Completion → Rate & review.

## 2. Worker Job Journey

```mermaid
stateDiagram-v2
    [*] --> Offline
    Offline --> Available: toggle "on duty"
    Available --> OfferReceived: Fair-Match offer pushed
    OfferReceived --> Available: reject or 45s timeout
    OfferReceived --> Assigned: accept
    Assigned --> EnRoute
    EnRoute --> Arrived
    Arrived --> InProgress
    InProgress --> Completed
    Completed --> Available
    Completed --> PayoutCredited: async on payment capture
```

**Key screen sequence (worker app):** Login (OTP) → Home (on-duty toggle, today's job count vs society median — visible fairness signal, see note below) → Offer card (accept/reject, 45s countdown) → Navigation view (map + customer contact) → Status buttons (arrived/start/complete) → Payout tab → Welfare fund tab → Voice assistant toggle (Hindi/Marathi).

> Design note: showing the worker their own `jobs_this_week` vs `society_median_jobs_this_week` (the same numbers driving `rotation_fairness_score`) directly in the app is a deliberate transparency choice — it makes the cooperative's fairness mechanism visible and legible to the people it's meant to protect, not just something the admin can see. This is worth calling out explicitly in the pitch as a UX decision, not just a backend one.

## 3. Cooperative Admin Journey (Worker Onboarding)

```mermaid
flowchart LR
    A[Worker submits application] --> B[Society Admin reviews KYC docs]
    B -->|docs incomplete| A
    B -->|docs OK| C[Skill certification check]
    C --> D[Society Admin approves]
    D --> E[Status: verified, probation flag on]
    E --> F[First 5 jobs completed]
    F --> G[Status: active, probation off]
```

## 4. Dispute Journey

```mermaid
flowchart LR
    A[Filed by customer or worker] --> B[Society Admin review queue]
    B -->|resolved within 48h SLA| C[Resolved/Closed]
    B -->|SLA breached| D[Auto-escalate to Federation Admin]
    D --> C
```

## 5. Federation Oversight Journey

Federation Admin logs in → sees aggregate dashboard (societies list with worker count, active jobs, avg rating, welfare fund balance) → drills into one society (read-only for worker-level records, respecting society autonomy — see `architecture.md` §4) → welfare fund audit trail across all societies → exportable report (for NCCT-level reporting).
