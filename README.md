# Production Control Dashboard

A lightweight, real-time manufacturing and production operations dashboard built with Next.js and Tailwind CSS. Designed for plant floor managers to monitor work order queues, track machine routing, identify delayed jobs, and update order statuses in place.

## Features

- **Live Summary Metrics**: Real-time KPI cards for total jobs, active runs, delayed exceptions, and completed output.
- **Work Orders Table**: Density-optimized desktop table with machine assignments, order quantities, due dates, and status indicators.
- **Mobile Card View**: Responsive cards tailored for tablet and mobile viewports without horizontal table scrolling.
- **Search & Filters**: Case-insensitive filtering by Job ID, product name, customer, and status, with due-date and quantity sorting.
- **Interactive Job Detail Drawer**: Right-side drawer for inspecting job notes, machine stations, and updating statuses with real-time UI synchronization.
- **Paginated Frame View**: Clean page frame navigation (`Next` / `Prev` and page selectors) to fit standard shop-floor displays without unnecessary vertical scrolling.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: TypeScript (Strict)
- **Styling**: Tailwind CSS
- **Components & Icons**: shadcn/ui primitives, Lucide icons

## Getting Started

### Prerequisites
- Node.js 18.17+ or 20+
- npm, yarn, or pnpm

### Installation

```bash
git clone git@github.com:mayankraj019/Production-Control-Dashboard.git
cd Production-Control-Dashboard
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```
