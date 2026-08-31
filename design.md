# design.md — Design System

## 1. Design Principles

1. **Icon-first, not text-first.** A meaningful share of workers (domestic help, gardeners, drivers) may have variable literacy or limited comfort with English UI text. Every primary action gets a clear icon + short label, never icon-only and never text-only.
2. **Low-bandwidth tolerant.** No heavy hero imagery on the worker app; skeleton loaders, aggressive caching of category icons, graceful degradation on 2G/3G.
3. **Not a private-platform reskin.** Deliberately avoid the black/white/minimalist "premium marketplace" look of typical gig apps — that aesthetic signals "corporate platform," which is the wrong signal here. Warmer, civic, cooperative-institution feel instead — closer to a trusted public-service app than a luxury on-demand app.
4. **Transparency is a visual feature, not a footnote.** Price breakdowns, fairness scores, and welfare fund numbers are shown prominently, not buried in settings.

## 2. Color Palette

Rooted in Indian cooperative-movement and civic branding rather than generic startup gradients:

| Token | Hex | Use |
|---|---|---|
| `--coop-teal-900` | #0B4F4A | Primary brand, headers, primary buttons |
| `--coop-teal-600` | #147D74 | Interactive elements, links |
| `--coop-saffron-500` | #E8A33D | Accent — CTAs, highlights, "trust" badges (ties to Indian civic/tricolor association without being literal) |
| `--coop-cream-50` | #FBF7EF | App background (warm, not clinical white) |
| `--coop-charcoal-800` | #2B2B2B | Body text |
| `--coop-success-600` | #2E8B57 | Confirmed/completed states |
| `--coop-warning-500` | #D97706 | Pending/attention states |
| `--coop-danger-600` | #C0392B | Disputes, rejections, errors |

## 3. Typography

- Primary UI font: **Inter** (excellent Devanagari-adjacent legibility at small sizes, wide language support).
- Regional script support: **Noto Sans Devanagari** loaded for Hindi/Marathi labels — non-negotiable given the worker app's primary language is not English.
- Scale: 12/14/16/20/24/32px, generous line-height (1.5+) for readability on low-end screens.

## 4. Core Components

- `ServiceCategoryCard` — icon + label, large tap target (min 48x48dp)
- `PriceBreakdownChip` — expandable, shows base price → 88/5/4/3 split on tap
- `FairnessMeter` (worker app) — simple horizontal bar: "Your jobs this week" vs "Society median" — the single most important trust-building widget in the entire product
- `JobOfferCard` — countdown ring (45s), accept (saffron, primary) / reject (outline) buttons, distance + estimated earning shown big
- `StatusTimeline` — horizontal stepper (booked → matched → en route → in progress → done) used identically on customer tracking screen and worker job screen, for visual consistency across the two-sided experience
- `TrustBadge` — society-verified checkmark + "Cooperative Member since [year]" — replaces the generic star-rating-only trust signal private platforms rely on

## 5. Key Wireframe Descriptions (textual — build these as low-fi Figma frames before coding)

**Customer — Service Detail screen:** top: service name + category icon; price shown large with a small "ⓘ see breakdown" link expanding the 88/5/4/3 chip; below: "How this compares" micro-copy ("12% total fee vs typical 20–30% on other apps") — used sparingly, once, not repeated everywhere it'd feel defensive.

**Worker — Home screen:** on-duty toggle top-center (large, thumb-reachable); FairnessMeter directly below it; today's earnings running total; offer cards appear as a bottom-sheet overlay when pushed, not buried in a tab.

**Admin — Fair-Match Explainability panel:** table of candidate workers for a given job with a horizontal stacked bar per worker showing the four score components (proximity/rating/fairness/skill) — makes the algorithm legible to a non-technical society admin, which matters both for real trust and for a strong live demo moment.

## 6. Accessibility

- WCAG AA contrast minimum across the palette above (teal-900 on cream-50 passes; saffron-500 used only for large text/icons, not small body text, since it doesn't pass AA at small sizes on light backgrounds — verify in build).
- Voice-first assistant (worker app, Hindi/Marathi) as an alternate input path for status updates and job navigation, not just a novelty add-on — genuinely reduces literacy/typing burden for the primary user of that app.
