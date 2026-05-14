# FIFA World Cup 2026 — Fan Hub

A full-featured React web application built as a comprehensive fan destination for the 2026 FIFA World Cup. Features a live-style match center, interactive 3D globe, country profiles, all-time records with expandable leaderboards, historical moments with in-modal YouTube video, and multiple monetization integrations.

**Live site:** `[your-vercel-url]`

---

## Features

### Match Center
- Full fixture list for all 104 matches across Group Stage and Knockout rounds
- Filter by group (A–L), stage, and real-time team search
- Ticket purchasing via StubHub affiliate with stadium photo modal
- FanDuel sports betting affiliate banner

### Interactive 3D Globe
- Clickable WebGL globe rendered with `react-globe.gl` + Three.js
- Every qualified nation highlighted — click any country to open its full profile
- Smooth camera animation and hover highlighting

### Country Profiles
- Slide-in detail panel for all 80 World Cup nations
- All-time stats: appearances, titles, finals, semi-finals, win rate, goals scored/conceded
- SVG bar chart showing historical tournament performance across every World Cup year
- Legendary players with Wikipedia photo fetching via MediaWiki API
- Fun facts and confederation badges

### All-Time Records Page
- Cinematic split hero banner (Pelé 1970 · Maradona 1986) using verified Wikimedia Commons images
- All-Time Standings table — 80 nations sortable by titles, finals, appearances, win %
- Team Records, Player Records, and Tournament Records tabs
- Expandable top-20 leaderboard for every individual record category
- Categories: Goals, Assists, Appearances, Saves, Clean Sheets, Titles, Hat-tricks, and more

### This Day in World Cup History
- Curated database of iconic moments filterable by category
- Click any moment to open a detail modal with YouTube embed that autoplays immediately
- Categories: Goals, Upsets, Drama, Records, Culture

### Venue Explorer
- All 16 host stadiums across USA, Canada, and Mexico
- Stadium photos fetched live from Wikipedia pageimages API
- Booking.com hotel affiliate integration per venue city
- Capacity, location, and match count details

### Predictions
- Group stage and knockout bracket prediction builder

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 8 |
| 3D Rendering | Three.js via react-globe.gl |
| Routing | React Router v7 |
| Styling | Inline CSS-in-JS (zero external UI library) |
| Data | Static TypeScript + Wikipedia MediaWiki API |
| Deployment | Vercel |

---

## Architecture Highlights

- **Zero backend** — all data is strongly-typed TypeScript; no database or API server
- **Wikipedia pageimages API** — used throughout for stadium photos, player headshots, and country images; module-level cache prevents duplicate network requests
- **Portal-based modals** — country profiles and moment modals use `ReactDOM.createPortal` so they render above all page content regardless of DOM nesting
- **Error boundaries** — `ModalErrorBoundary` wraps country panels so a data error on one country never crashes the page
- **Affiliate-ready** — StubHub, FanDuel, and Booking.com links use `YOUR_AFFILIATE_ID` placeholders throughout, ready to activate with real IDs

---

## Project Structure

```
src/
├── components/
│   ├── WorldGlobe.tsx          # 3D interactive globe
│   ├── CountryProfileModal.tsx # Slide-in country detail panel
│   ├── MomentModal.tsx         # History moment + YouTube embed modal
│   └── Navbar.tsx
├── pages/
│   ├── HomePage.tsx            # Globe, fixtures, history widget
│   ├── MatchCenterPage.tsx     # Full fixture list + filters
│   ├── RecordsPage.tsx         # All-time standings + records
│   ├── VenuePage.tsx           # Stadium explorer
│   ├── HistoryPage.tsx         # This Day in WC History
│   └── PredictionsPage.tsx
├── data/
│   ├── fixtures.ts             # All 104 match fixtures
│   ├── wcStats.ts              # Per-country World Cup statistics
│   ├── records.ts              # Individual/team/tournament records + leaderboards
│   ├── wcHistory.ts            # Iconic moments with YouTube IDs
│   ├── venues.ts               # 16 host stadiums
│   └── countryProfiles.ts      # Legends, facts, history per nation
└── types/
```

---

## Getting Started

```bash
npm install
npm run dev       # → http://localhost:5173
npm run build     # production build → dist/
```

---

## Monetization

Built affiliate-ready with four revenue streams:

| Partner | Placement | Model |
|---|---|---|
| Google AdSense | Sitewide display ads | CPM (per 1,000 views) |
| FanDuel | Match Center banner | CPA (per signup) |
| StubHub | Fixture ticket modal | CPA (per ticket sale) |
| Booking.com | Venue hotel search | CPA (per booking) |

---

## Author

**Gui Trindade**  
[GitHub](https://github.com/noorgg22) · [LinkedIn](https://linkedin.com/in/YOUR_LINKEDIN)
