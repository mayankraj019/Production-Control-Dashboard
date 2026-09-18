# Production Control Dashboard

An internal factory operations web application designed for operations managers to monitor production lines, identify operational exceptions, inspect work orders, and dispatch status updates.

Built strictly with:
- **Next.js** (App Router)
- **React 19**
- **TypeScript** (Strict Mode)
- **Tailwind CSS v4**
- **shadcn/ui Primitives**
- **lucide-react**

---

## Operations Manager Workflow

```
Understand Production Status  ──>  Identify Exceptions  ──>  Inspect Work Order  ──>  Update Status / Action
(Summary Metrics Bar)             (Delayed Jobs & Holds)     (Interactive Drawer)      (Live Floor Dispatch)
```

1. **Understand Production Status**: Instant visibility across Total Jobs, In-Progress runs, and Completed targets.
2. **Identify Exceptions**: Spot Delayed runs and urgent Due Today orders highlighted with restrained semantic treatments.
3. **Inspect Work Order**: Click any desktop row or mobile card to open the right-side detail drawer without losing dashboard context.
4. **Take Action**: Update work order status directly from the drawer with real-time propagation across summary metrics, filters, and tables.

---

## Architectural Principles

- **Single Source of Truth**: The original `jobs` array is the sole authoritative state. All filtered jobs, sorted jobs, and summary metrics are purely derived (`useMemo`).
- **Restrained Industrial Design**: Neutral zinc palette, subtle 1px borders, high-contrast monospace figures for numerical alignment, and restrained semantic badges. Zero gradients, zero neon, zero excessive shadows, and zero unnecessary animations.
- **Dual-Mode Responsive Design**:
  - **Desktop (≥ 768px)**: Semantic, information-dense 7-column data table.
  - **Mobile (< 768px)**: Purpose-built compact card list showing all 7 key attributes with touch-friendly 44px+ tap targets.
- **Resilient States**: Initial streaming skeleton loading, database empty state, search/filter empty state, job without notes state, status update success banner, and Next.js error boundary with retry.
- **Accessibility**: Semantic HTML, distinct shapes for status badges (diamond for Delayed) so status does not rely solely on color, visible focus rings, ARIA roles, and native `Escape` key dismissal.

---

## Project Structure

```text
src/
├── app/
│   ├── error.tsx               # Next.js Error boundary with retry
│   ├── globals.css             # Neutral industrial theme variables
│   ├── layout.tsx              # Root layout with compact AppHeader
│   ├── loading.tsx             # Streaming skeleton loading state
│   └── page.tsx                # Server Component entry point
├── components/
│   ├── common/
│   │   └── status-badge.tsx    # Accessible status badge with shape + text + color
│   ├── dashboard/
│   │   ├── empty-state.tsx     # Reusable empty states (no-jobs, search, error)
│   │   ├── job-detail-drawer.tsx # Right-side drawer with sectioned details & status update
│   │   ├── production-dashboard.tsx # Dashboard coordinator (state derivation & mutations)
│   │   ├── production-summary.tsx # 4-metric KPI summary section
│   │   ├── work-order-controls.tsx # Search, status filter, and multi-field sorting
│   │   └── work-orders-table.tsx # Dual-mode responsive table & mobile card list
│   ├── layout/
│   │   └── app-header.tsx      # Compact top bar (facility, shift, title)
│   └── ui/                     # shadcn/ui primitives (button, card, separator, badge)
├── data/
│   └── mock-jobs.ts            # Realistic dataset of 18 manufacturing jobs
├── lib/
│   └── utils.ts                # cn helper (clsx + tailwind-merge)
├── services/
│   └── job-service.ts          # API-ready service layer abstraction
└── types/
    ├── job.ts                  # Job, JobStatus, and query models
    └── production.ts           # Facility and station telemetry models
```

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### 3. Production Build & Lint
```bash
npm run build
npm run lint
```
