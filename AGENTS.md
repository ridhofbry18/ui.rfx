# RFX UI Ecosystem - Implementation Blueprint & Task Tracker

## 1. Platform Vision & Architecture
- **Hybrid Model**: Marketplace Engine (Premium UI Sales) + Directory Engine (Curated Affiliate Links).
- **Frontend Stack**: React 18, Vite, Tailwind CSS (Utility-first, Glassmorphism).
- **Backend Stack**: Node.js/Express (acting as Serverless API for AI Studio environment) to handle secure Webhooks and Database ops.
- **Database**: Turso (libSQL) handling `users`, `products`, `transactions`.
- **Assets**: Cloudinary integration for media optimization.

## 2. Core Features
- Premium Marketplace with automated delivery upon payment.
- Curated Directory with affiliate links to generate inbound revenue.
- Admin Control with Custom JWT/Email Authentication to manage overrides and catalogs.

## 3. The "Saweria Hack Matrix" (Payment Strategy)
Due to pending primary gateway verifications, we bypass via Saweria:
1. **Pre-checkout**: User clicks Buy.
2. **Order Code Generation**: React generates a unique code (e.g., `RFX-8821`).
3. **Database Pre-flight**: Insert code into Turso `transactions` table with status `PENDING`.
4. **Auto-Copy UX**: Use Clipboard API to auto-copy the code (0% manual typing errors).
5. **QRIS Redirect**: Redirect user to Saweria payment page. The buyer passes the 5% service tax.
6. **Webhook Sync**: Saweria fires a webhook to our Express server (`/api/webhooks/saweria`).
7. **Fulfillment**: API extracts the code via Regex, validates the payload amount, updates Turso status to `PAID`, and unlocks the download.

## 4. Task Checklist (Execution Tracker)
- [x] **Phase 1a**: Basic React & Vite Setup.
- [x] **Phase 1b**: Glassmorphism UI & Core Pages.
- [x] **Phase 2a**: Convert architecture to Full-Stack (Express `server.ts`) for Webhooks.
- [x] **Phase 2b**: Move Turso DB logic to Backend for security (Schema & Queries).
- [x] **Phase 3a**: Implement auto-copy Checkout UX.
- [x] **Phase 3b**: Implement `/api/webhooks/saweria` listener logic.
- [x] **Phase 3c**: Implement Admin Auth (JWT/Email) & Dashboard.
- [x] **Phase 4**: Security, Edge Case Testing, and Final Grooming.

> **Directive**: Implement pelan-pelan (slowly), akurat (accurately), dan jangan lalai (without negligence). Verify every step.
