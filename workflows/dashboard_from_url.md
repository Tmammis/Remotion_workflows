---
description: Create a dashboard UI from a URL and record it as a video
---

# Create Dashboard from URL

Generate a fully functional dashboard web app by crawling a website for brand identity, data patterns, and content — then record it as a polished video.

## Required Input

- **URL** — the website to extract brand identity and data from

## Step 1 — Crawl & Extract Brand Identity

Fetch the URL and extract:

- **Brand colors** — primary, secondary, accent, backgrounds, text colors
- **Typography** — font families, sizes, weights
- **Logo** — download to `dashboard/public/`
- **Data patterns** — identify metrics, stats, user counts, or KPIs mentioned on the site
- **Copy** — product name, tagline, section headings, feature names

## Step 2 — Generate Dashboard App

The dashboard lives in `dashboard/` and is a **Vite + React + TypeScript** app.

### Architecture

```
dashboard/
  src/
    App.tsx              — Routes (react-router-dom)
    main.tsx             — Entry point
    index.css            — Global styles
    components/
      Layout/            — Sidebar, header, dashboard shell
      Cards/             — Stat cards, info cards
      Charts/            — Chart components
      DataTable/         — Table components
      Modals/            — Modal dialogs
      UI/                — Buttons, inputs, badges
    pages/
      Dashboard.tsx      — Main overview page
      Users.tsx          — Users/customers page
      Settings.tsx       — Settings page
    data/                — Mock data files
    hooks/               — Custom React hooks
    lib/                 — Utilities
    assets/              — Static assets
```

### Pages & Features

- **Dashboard** — KPI stat cards, charts (line/bar/pie), recent activity table
- **Users** — Searchable data table with user records
- **Settings** — Configuration forms
- Additional placeholder routes: Analytics, Calls, Reports

### Styling Requirements

- Match the brand's color palette exactly
- Use the brand's fonts (load via Google Fonts or local files)
- Dark/light theme based on the site's aesthetic
- Responsive layout with sidebar navigation
- Smooth transitions and hover effects

## Step 3 — Populate with Mock Data

Generate realistic mock data that matches the website's domain:

- If it's a SaaS product → users, subscriptions, MRR, churn
- If it's an e-commerce site → orders, revenue, products, customers
- If it's a service company → bookings, clients, response times

Data should feel authentic to the brand.

## Step 4 — Build & Preview

```bash
cd dashboard
npm install
npm run dev
```

Verify the dashboard renders correctly at `http://localhost:5173`.

## Step 5 — Record as Video

Open the dashboard in a browser and record a walkthrough video showing:

1. Dashboard overview with animated stat cards loading in
2. Scroll through charts and data
3. Navigate between pages (sidebar clicks)
4. Hover interactions on cards and table rows

Save the recording to `~/Desktop/[website-name]-dashboard.mp4`.

---

## Key Files

- `dashboard/src/App.tsx` — Route definitions
- `dashboard/src/components/Layout/DashboardLayout.tsx` — Sidebar + header shell
- `dashboard/src/pages/Dashboard.tsx` — Main dashboard page
- `dashboard/src/pages/Users.tsx` — Users data table
- `dashboard/src/pages/Settings.tsx` — Settings page
- `dashboard/src/index.css` — Global styles with brand tokens
- `dashboard/src/data/` — Mock data files

## Dependencies

- `react`, `react-dom`, `react-router-dom`
- `recharts` or similar for charts
- `vite` for build tooling

## Edge Cases

- If the website has no obvious metrics, infer reasonable KPIs from the business type
- If brand fonts aren't available on Google Fonts, fall back to visually similar alternatives
- For sites in non-English languages, keep the dashboard in the original language unless instructed otherwise
