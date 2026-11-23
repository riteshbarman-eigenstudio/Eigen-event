# Eigen Event: Full App Plan

A web app for planning, selling, running and measuring events (in the same space as Zoho Backstage). This plan covers the whole product, the code structure and the build order. The pitch deck is `eigen-event-mvp.html`.

---

## 1. Product scope

**Users:** organizers (owner, manager, finance, door staff), attendees, speakers, sponsors.

**Modules:** Events, Event page, Ticketing, Agenda, Speakers (CFP), Sponsors, Attendees, Check-in, Messaging, Virtual, Engagement, Analytics, Integrations, Settings.

**MVP (Phase 1):** event creation, public event page, ticketing and payments, attendee list, email, QR check-in, basic analytics.
**Phase 2:** agenda, speakers and CFP, sponsors, virtual/hybrid, SMS and automations.
**Phase 3:** event app (PWA) and networking, public API and webhooks, multi-event workspaces, SSO.

---

## 2. Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | Routing, server rendering for public event pages (SEO), route handlers for the API |
| UI | **Untitled UI React** (Tailwind v4 + React Aria) | Base components are copied into `src/vendor`, so we own them. shadcn/ui is the fallback; use one system, never both |
| Styling | Tailwind with a single token file | One place for spacing, radius, type, colors |
| Data | PostgreSQL + Drizzle (or Prisma) | Relational data: events, orders, attendees |
| Auth | Auth.js (or Clerk) | Email + Google login, org membership, roles |
| Payments | Stripe and Razorpay behind one `PaymentProvider` interface | Cards, UPI, refunds, webhooks |
| Email / SMS | Resend (email), Twilio or MSG91 (SMS) | Transactional + campaigns |
| Jobs | Inngest or BullMQ | Emails, exports, webhooks, reminders |
| Files | S3-compatible storage | Banners, badges, exports |
| Forms / validation | React Hook Form + Zod | One schema for client and server |
| Data fetching | TanStack Query | Caching in dashboard screens |
| Tests | Vitest, Playwright | Unit and end-to-end |

---

## 3. Design system rules

Everything uses the grey Untitled UI look from the deck: charcoal `#262A32` as the primary color, grey neutrals, no gradients.

- **Single source of truth:** `src/styles/tokens.css` (CSS variables) feeds Tailwind. No hard-coded hex, px or font sizes in components.
- **Spacing:** 4px base scale (4, 8, 12, 16, 20, 24, 32, 40, 48, 64). Gap, margin and padding only use these steps.
- **Layout rhythm:** page padding 32px (desktop) / 16px (mobile). Section gap 32px. Card padding 24px. Form field gap 16px.
- **Radius:** `sm` 6px (badges), `md` 8px (inputs, buttons), `lg` 12px (cards, modals), `full` (avatars, pills).
- **Borders:** 1px `gray-200`. Focus ring 4px `gray-100` plus 1px `gray-900`.
- **Typography:** Inter. Scale: display 48/56, h1 30/38, h2 24/32, h3 20/30, body 16/24, small 14/20, caption 12/18. Weights 400, 500, 600 only.
- **Shadows:** `xs`, `sm`, `lg` from Untitled UI only.
- **Rule:** if a style is needed twice, it becomes a token or a vendor component. Pages never contain custom styling.

---

## 4. Folder structure

```
src/
├─ app/                          # Routing only. Files here are thin wrappers.
│  ├─ (marketing)/               # Public marketing site
│  │  ├─ page.tsx
│  │  └─ pricing/page.tsx
│  ├─ (auth)/
│  │  ├─ login/page.tsx
│  │  ├─ signup/page.tsx
│  │  └─ forgot-password/page.tsx
│  ├─ (dashboard)/               # Organizer console (needs login)
│  │  ├─ layout.tsx              # Uses DashboardShell
│  │  ├─ events/page.tsx
│  │  ├─ events/new/page.tsx
│  │  ├─ events/[eventId]/
│  │  │  ├─ page.tsx             # Overview
│  │  │  ├─ page-builder/page.tsx
│  │  │  ├─ tickets/page.tsx
│  │  │  ├─ orders/page.tsx
│  │  │  ├─ attendees/page.tsx
│  │  │  ├─ agenda/page.tsx
│  │  │  ├─ speakers/page.tsx
│  │  │  ├─ sponsors/page.tsx
│  │  │  ├─ check-in/page.tsx
│  │  │  ├─ messaging/page.tsx
│  │  │  ├─ virtual/page.tsx
│  │  │  ├─ analytics/page.tsx
│  │  │  └─ settings/page.tsx
│  │  ├─ contacts/page.tsx
│  │  ├─ integrations/page.tsx
│  │  ├─ team/page.tsx
│  │  └─ settings/page.tsx
│  ├─ (public)/                  # Attendee-facing, server rendered
│  │  ├─ e/[slug]/page.tsx       # Event page
│  │  ├─ e/[slug]/checkout/page.tsx
│  │  ├─ e/[slug]/agenda/page.tsx
│  │  ├─ tickets/[orderId]/page.tsx
│  │  └─ cfp/[slug]/page.tsx
│  ├─ scan/page.tsx              # Door staff scanner (PWA)
│  └─ api/                       # Route handlers
│     ├─ events/ orders/ attendees/ check-in/ webhooks/ ...
│
├─ components/
│  ├─ pages/                     # 1. One tsx per page. Only composes sections + layouts.
│  │  ├─ events-list-page.tsx
│  │  ├─ event-overview-page.tsx
│  │  ├─ tickets-page.tsx
│  │  ├─ attendees-page.tsx
│  │  ├─ public-event-page.tsx
│  │  └─ ...
│  ├─ sections/                  # 2. Page-specific building blocks, one folder per page
│  │  ├─ events-list/            (events-table, events-filters, empty-state)
│  │  ├─ event-overview/         (kpi-cards, sales-chart, task-checklist)
│  │  ├─ tickets/                (ticket-type-list, ticket-form-drawer, promo-code-table)
│  │  ├─ attendees/              (attendee-table, segment-bar, import-dialog)
│  │  ├─ agenda/                 (schedule-grid, session-drawer, track-list)
│  │  ├─ check-in/               (scanner-panel, arrivals-counter, guest-search)
│  │  ├─ analytics/              (revenue-chart, source-breakdown, report-list)
│  │  ├─ public-event/           (hero, speakers-grid, agenda-preview, ticket-picker, faq)
│  │  └─ ...
│  └─ layout/                    # 3. Shared page frames
│     ├─ app-header.tsx
│     ├─ sidebar.tsx
│     ├─ dashboard-shell.tsx
│     ├─ event-subnav.tsx
│     ├─ page-header.tsx         (title, breadcrumb, actions)
│     ├─ public-header.tsx
│     ├─ footer.tsx
│     └─ auth-layout.tsx
│
├─ context/                      # React context providers
│  ├─ auth-context.tsx           # Current user, active organization, role
│  ├─ event-context.tsx          # Current event inside /events/[eventId]
│  ├─ cart-context.tsx           # Ticket selection during checkout
│  ├─ toast-context.tsx
│  └─ theme-context.tsx
│
├─ vendor/                       # Untitled UI base code. Copied in, rarely edited.
│  └─ untitledui/
│     ├─ base/ (button, input, textarea, select, checkbox, radio, toggle, badge, avatar, tooltip, tabs)
│     ├─ application/ (table, modal, slideout-menu, dropdown, date-picker, pagination, empty-state, charts)
│     ├─ foundations/ (icons, logo helpers)
│     └─ utils/ (cx, is-react-component)
│
├─ lib/                          # Pure helpers
│  ├─ db/ (client, schema, queries)
│  ├─ payments/ (provider interface, stripe, razorpay)
│  ├─ email/ (client, templates)
│  ├─ auth/ (session, permissions)
│  └─ utils/ (format-money, format-date, slug, qr)
├─ hooks/                        # use-debounce, use-event, use-permissions ...
├─ services/                     # API calls used by the UI (events.ts, orders.ts ...)
├─ schemas/                      # Zod schemas shared by forms and API
├─ types/
├─ config/                       # nav items, roles, plan limits, feature flags
└─ styles/
   ├─ tokens.css                 # Colors, spacing, radius, type scale
   └─ globals.css
```

### Folder rules

1. **`app/` has no UI code.** Each `page.tsx` only imports its page component from `components/pages` and returns it. Data loading for server components happens here and is passed down as props.
2. **`components/pages/*.tsx`** build a page only by calling `layout` and `sections` components. No raw HTML styling, no business logic.
3. **`components/sections/<page-name>/`** holds components used by that page only. If a second page needs one, move it to `components/sections/shared/` or promote it to `vendor`.
4. **`components/layout/`** holds frames used by many pages (header, sidebar, shell, page header).
5. **`vendor/`** holds every base Untitled UI file (Button, Input, Select, Badge, Table, Modal...). Sections import from `@/vendor/...`, never from an npm UI package directly. Edits to vendor files are limited to token alignment.
6. **Import direction:** `app → pages → sections/layout → vendor`. Never the reverse. Sections never import from other pages' section folders.
7. **Naming:** kebab-case files, one component per file, `index.ts` only inside vendor folders.

---

## 5. Route map

| Route | Page component | Sections folder |
|---|---|---|
| `/login`, `/signup` | `login-page`, `signup-page` | `auth` |
| `/events` | `events-list-page` | `events-list` |
| `/events/new` | `event-create-page` | `event-create` (wizard steps) |
| `/events/[id]` | `event-overview-page` | `event-overview` |
| `/events/[id]/page-builder` | `page-builder-page` | `page-builder` |
| `/events/[id]/tickets` | `tickets-page` | `tickets` |
| `/events/[id]/orders` | `orders-page` | `orders` |
| `/events/[id]/attendees` | `attendees-page` | `attendees` |
| `/events/[id]/agenda` | `agenda-page` | `agenda` |
| `/events/[id]/speakers` | `speakers-page` | `speakers` |
| `/events/[id]/sponsors` | `sponsors-page` | `sponsors` |
| `/events/[id]/check-in` | `check-in-page` | `check-in` |
| `/events/[id]/messaging` | `messaging-page` | `messaging` |
| `/events/[id]/virtual` | `virtual-page` | `virtual` |
| `/events/[id]/analytics` | `analytics-page` | `analytics` |
| `/events/[id]/settings` | `event-settings-page` | `event-settings` |
| `/integrations`, `/team`, `/settings` | matching `*-page` | `integrations`, `team`, `settings` |
| `/e/[slug]` (public) | `public-event-page` | `public-event` |
| `/e/[slug]/checkout` | `checkout-page` | `checkout` |
| `/tickets/[orderId]` | `my-ticket-page` | `my-ticket` |
| `/scan` | `scanner-page` | `scanner` |

---

## 6. Data model (core tables)

`organization`, `user`, `membership (role)`, `event`, `venue`, `room`, `track`, `session`, `speaker`, `session_speaker`, `ticket_type`, `promo_code`, `form_question`, `order`, `order_item`, `payment`, `attendee`, `form_answer`, `check_in`, `campaign`, `message_log`, `sponsor_package`, `sponsor`, `cfp_submission`, `poll`, `poll_vote`, `webhook_endpoint`, `api_key`, `audit_log`.

Key rules: every row carries `organization_id` (one tenant per organization); money stored as integer minor units plus currency; times stored in UTC with the event's time zone on `event`.

---

## 7. Roles and permissions

Owner (everything), Manager (event content, no billing), Finance (orders, payouts, refunds), Door staff (scan and check-in only), Volunteer (read-only agenda and attendees). Permissions are checked in `lib/auth/permissions.ts` and surfaced to the UI through `use-permissions`.

---

## 8. Build order

| Step | Work | Output |
|---|---|---|
| 0 | Project setup: Next.js, TypeScript, Tailwind, Untitled UI into `vendor`, tokens, lint, CI | Empty app with themed shell |
| 1 | Auth, organization, roles, dashboard shell (header, sidebar) | Login and empty dashboard |
| 2 | Events: create wizard, list, overview | Organizers can create events |
| 3 | Ticketing and public event page, checkout, payments, QR ticket email | First paid registration |
| 4 | Attendees, orders, refunds, CSV import and export | Guest list management |
| 5 | Check-in: scanner PWA, offline queue, live counter | Door-ready |
| 6 | Messaging (email) and basic analytics | **MVP complete** |
| 7 | Agenda, speakers, CFP, sponsors | Phase 2 |
| 8 | Virtual/hybrid, SMS, automations | Phase 2 |
| 9 | Event app, networking, API, webhooks, workspaces, SSO | Phase 3 |

---

## 9. Quality and non-functional

- **Accessibility:** React Aria components from Untitled UI give keyboard and screen-reader support. Keep contrast AA on the grey palette.
- **Performance:** public event pages server rendered and cached; checkout must load in under 2s on mobile.
- **Security:** row-level tenant checks on every query, signed webhooks, rate limits on checkout and login, audit log for money and role changes.
- **Privacy:** consent capture, export and delete attendee data on request.
- **Testing:** unit tests for pricing, tax and promo logic; Playwright for register, pay and check-in flows.
- **Reliability:** idempotent payment webhooks, offline-safe scanner with later sync.

---

## 10. Open decisions

1. Untitled UI React or shadcn/ui as the base (default: Untitled UI, as the deck already uses it).
2. Payments at launch: Stripe only, Razorpay only, or both (depends on first market).
3. Auth provider: self-hosted Auth.js or managed Clerk.
4. Hosting: Vercel plus managed Postgres, or self-hosted containers.
5. Free-tier limits and per-ticket fee percentage (the deck's pricing is illustrative).
