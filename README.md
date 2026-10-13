# Card Benefit Activation Engine (CardBenefit)

> **College Major Project** • Automated Credit Card Protection Discovery & Claim Preparation Platform

An intelligent, modern fintech dashboard that helps cardholders uncover hidden credit card benefits, monitor transaction claim windows, and prepare automated claim packets without the traditional insurance paperwork maze.

---

## 📌 Project Overview

Most premium and rewards credit cards include built-in protections such as **Purchase Protection**, **Travel Delay Reimbursement**, **Return Guarantees**, and **Extended Warranties**. However, over 85% of eligible cardholders never utilize these benefits due to complex cardholder agreements, strict notification deadlines, and tedious documentation requirements.

The **Card Benefit Activation Engine** bridges this gap by:
1. **Cataloging & Mapping**: Automatically indexing policy rules across linked credit card issuers.
2. **Transaction Monitoring**: Scanning merchant charges against policy qualification criteria.
3. **Anomaly & Signal Detection**: Proactively identifying claim-triggering events (such as flight delays or damage windows).
4. **Claim Preparation**: Generating pre-filled claim packets and tracking time-sensitive filing deadlines.

---

## 🗺️ Project Phases & Implementation Roadmap

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PROJECT PROGRESS OVERVIEW                       │
├──────────────────────────┬──────────────────────────┬──────────────────┤
│ Phase                    │ Scope / Technology       │ Status           │
├──────────────────────────┼──────────────────────────┼──────────────────┤
│ Phase 1: Frontend Core   │ React 19 + Vite + TS     │ ✅ Completed     │
│ Phase 2: Backend Core    │ Java Spring Boot + REST  │ ⏳ Upcoming (0%) │
│ Phase 3: Telemetry & OCR │ Flight API + Receipt OCR │ ⏳ Upcoming (0%) │
│ Phase 4: Claim Pipeline  │ PDF Gen + Email Service  │ ⏳ Upcoming (0%) │
│ Phase 5: CI/CD & Deploy  │ Docker + Cloud Hosting   │ ⏳ Upcoming (0%) │
└──────────────────────────┴──────────────────────────┴──────────────────┘
```

### ✅ Phase 1: Frontend User Interface & Interactive Mock Engine (100% Complete)

* **Design System**:
  * Deep midnight navy background (`#080D1B`), elevated navy panels (`#111A2E`), electric cyan highlights (`#45D9F5`), and violet accents (`#8B7CFF`).
  * Custom metallic card sheens, glassmorphism, and accessible focus states.
* **Core Views & Pages**:
  * **Dashboard (Overview)**: Hero banner with live radar preview, 4 summary KPI cards, active card selector, benefit discovery grid, potential claims radar, and recent transactions.
  * **My Cards**: Portfolio overview with 3 realistic fictional cards (*Platinum Card*, *Travel Rewards Card*, *Everyday Cashback Card*), credit line metrics, fee breakdowns, and card-specific protection checklists.
  * **Benefits Catalog**: Searchable and filterable catalog with category pills (*Purchase Safeguard*, *Travel Disruption*, *Retail & Return*) and linked card filters.
  * **Claims Radar**: Active claim opportunity tracker with urgency timers, detected signal narratives, status filters (*Draft Ready*, *Action Recommended*, *Under Review*), and a simulated claim packet generator.
  * **Scanned Transactions**: Searchable transaction table with category filters, amount sorting, CSV export, and a simulated feed refresh with skeleton loading.
  * **Settings & Preferences**: In-memory configuration for claim trigger thresholds, flight delay windows, notification channels, and cardholder profile info.
  * **Interactive Detail Modal**: Modal with policy rules, coverage ceilings, copyable policy codes, and interactive document readiness checkboxes.
* **Architecture**: Clean, modular React component hierarchy with typed TypeScript definitions and standalone mock data.

---

### ⏳ Phase 2: Spring Boot Backend Architecture & REST APIs (Remaining)

* **Framework**: Java 21 with Spring Boot 3.x
* **Database**: PostgreSQL with Spring Data JPA / Hibernate
* **Authentication**: Spring Security with JWT token-based authentication
* **Planned Endpoints**:
  * `GET /api/v1/cards` — Retrieve user linked credit cards
  * `POST /api/v1/cards` — Link a new card with cardholder agreement mapping
  * `GET /api/v1/benefits` — Query benefit rules with eligibility criteria
  * `GET /api/v1/transactions` — Fetch synced transactions with automatic benefit tags
  * `GET /api/v1/claims` — List detected claim opportunities and filing status
  * `POST /api/v1/claims/draft` — Initialize and save a claim application draft
  * `PUT /api/v1/settings` — Persist cardholder risk thresholds and alerts

---

### ⏳ Phase 3: Telemetry, Flight Tracking & OCR (Remaining)

* **Flight Delay Detection**: Integration with aviation tracking APIs or mock flight status webhooks to verify 6+ hour delays on ticket purchases.
* **Receipt OCR Parsing**: Optical Character Recognition (OCR) pipeline to extract merchant name, transaction date, line items, and charged totals from uploaded receipts.
* **Damage Window Evaluator**: Background cron worker calculating policy expirations (e.g., 90-day purchase protection window).

---

### ⏳ Phase 4: Automated Claim Packet Pipeline (Remaining)

* **PDF Packet Generation**: Apache PDFBox / iText service to assemble itemized claim forms, flight verification letters, and purchase receipts into a single submission bundle.
* **Notification Dispatch**: Spring Boot Mail / SMTP service sending deadline countdown emails and status notifications.

---

### ⏳ Phase 5: Testing, Hardening & Deployment (Remaining)

* **Testing**: Unit tests (JUnit 5, Mockito, Vitest) and end-to-end integration tests.
* **Containerization**: Multi-stage `Dockerfile` for frontend and backend, with `docker-compose.yml` for PostgreSQL.
* **Documentation**: Final project thesis, architecture diagrams, and API swagger documentation (`SpringDoc / OpenAPI`).

---

## 📊 Completion Summary

| Component | Progress | Notes |
| :--- | :---: | :--- |
| **Frontend UI & Layout** | **100%** | All 6 pages, modals, filters, and design system complete. |
| **Frontend Interactions** | **100%** | Card filtering, search, modal previews, CSV export, and demo wizard. |
| **Local Mock Data** | **100%** | Realistic datasets adhering to fictional bank guidelines. |
| **Spring Boot Backend** | **0%** | Scheduled for implementation in Phase 2. |
| **Database & Persistence** | **0%** | PostgreSQL schema to be created in Phase 2. |
| **External Integrations** | **0%** | Scheduled for Phase 3 (Flight APIs & OCR). |

---

## 🛠️ Technology Stack (Current Frontend)

* **Core**: React 19, TypeScript
* **Build Tool**: Vite 8
* **Styling**: Tailwind CSS v4, Vanilla CSS Design Tokens
* **Typography**: Plus Jakarta Sans (Google Fonts)
* **Icons**: Lucide React
* **Code Quality**: Oxlint (0 warnings, 0 errors)

---

## 🚀 Running the Project Locally

### Prerequisites
* **Node.js**: v18.0 or higher (v20+ recommended)
* **npm**: v9.0 or higher

### Installation & Launch

1. Clone or open the workspace:
   ```bash
   cd "C:\Major Project"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173/](http://localhost:5173/) in your browser.

4. Run linting & build verification:
   ```bash
   # Lint check
   npm run lint

   # Production build check
   npm run build
   ```

---

## 📁 Project Directory Structure

```
Major Project/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── BenefitCard.tsx        # Benefit card with coverage limits
│   │   ├── ClaimCard.tsx          # Claim opportunity with signal audit
│   │   ├── DetailModal.tsx        # Interactive modal with document checklist
│   │   ├── HeroBanner.tsx         # Dashboard hero section with 3D card
│   │   ├── NotificationDropdown.tsx # Notifications panel
│   │   ├── PaymentCard.tsx        # Fictional metallic credit cards
│   │   ├── ProfileDropdown.tsx    # User account preferences menu
│   │   ├── Sidebar.tsx            # Navigation sidebar with brand logo
│   │   ├── StatCard.tsx           # KPI summary metrics cards
│   │   ├── Topbar.tsx             # Search, notifications, and profile
│   │   └── TransactionList.tsx    # Dashboard recent activity table
│   ├── data/
│   │   └── mockData.ts     # Realistic local mock datasets
│   ├── pages/              # Dedicated full-page views
│   │   ├── BenefitsPage.tsx       # Full benefit catalog with filters
│   │   ├── CardsPage.tsx          # Card portfolio & breakdown view
│   │   ├── ClaimsPage.tsx         # Claims radar & simulated wizard
│   │   ├── SettingsPage.tsx       # Configuration & sensitivity settings
│   │   └── TransactionsPage.tsx   # Searchable transactions & CSV export
│   ├── types/
│   │   └── index.ts        # TypeScript interface definitions
│   ├── App.tsx             # Root component and view state manager
│   ├── index.css           # Design tokens, gradients, and scrollbars
│   └── main.tsx            # React application entry point
├── package.json            # Project dependencies and npm scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite bundler configuration
└── README.md               # Project documentation
```

---

## 📜 Academic Disclaimer

This project is developed as an undergraduate major project. All credit card issuers, policy agreements, transactions, and claim opportunities represented in the Phase 1 frontend are simulated fictional records for educational demonstration and do not constitute legal insurance underwriting or binding coverage guarantees.
