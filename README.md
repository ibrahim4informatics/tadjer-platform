# Tadjer
 
**Multi-tenant inventory management system** — a full-stack SaaS-style application for tracking products, warehouses, stock movements, suppliers, and purchase orders across multiple organizations.
 
Built as a portfolio project to demonstrate production-style backend and frontend engineering: a modular monolith NestJS API, real multi-tenant data isolation, transactional inventory logic, role-based access control, and a responsive React frontend.
 
---
 
## Table of Contents
 
- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Database Design](#database-design)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Security](#security)
- [Deployment](#deployment)
- [Roadmap / Known Limitations](#roadmap--known-limitations)
- [License](#license)
---
 
## Overview
 
Tadjer lets multiple independent organizations manage inventory from a single shared platform, with each organization's data fully isolated from every other's. It covers the full inventory lifecycle: catalog management, multi-warehouse stock tracking, stock movements (in/out/transfer/adjustment) recorded as an immutable ledger, low-stock alerts, and a purchase order workflow that automatically updates inventory on receipt.
 
**Roles:** `OWNER`, `ADMIN`, `MANAGER`, `STAFF` — each with a distinct, enforced set of permissions.
 
## Features
 
- 🔐 JWT authentication with refresh token rotation and theft detection
- 🏢 Multi-tenant architecture with strict organization-level data isolation
- 👥 Role-based access control (RBAC) with a four-tier permission model
- 📦 Product catalog with search, filtering, sorting, and pagination
- 🏬 Multi-warehouse support with per-warehouse stock levels
- 🔄 Stock movements — stock-in, stock-out, transfer, and adjustment — recorded in a full, immutable audit ledger
- ⚛️ Atomic, transaction-safe stock transfers and purchase order receiving (no partial updates, no race conditions)
- 🚨 Low-stock alerts based on configurable minimum stock levels
- 🧾 Purchase order workflow (`DRAFT → PENDING → APPROVED → RECEIVED`) with automatic inventory updates on receipt
- 📊 Dashboard with live organization metrics
- 📈 Filterable reports (inventory, low-stock, movements, product catalog)
- 🧭 Full audit log of sensitive actions (who did what, and when)
- 📚 Auto-generated Swagger/OpenAPI documentation
- 🐳 Dockerized for local development and deployment
## Architecture
 
Tadjer is built as a **modular monolith** — a single deployable backend service organized into clean, independent NestJS modules (one per business domain), backed by a **shared database, shared schema** multi-tenancy model where every tenant-owned table carries an `organizationId` foreign key, enforced on every query at the service layer.
 
```mermaid
flowchart LR
    subgraph Client
        A[React + TypeScript SPA]
    end
 
    subgraph API["NestJS API (Modular Monolith)"]
        B[Auth Module]
        C[Organizations / Members]
        D[Products / Categories / Suppliers]
        E[Warehouses / Inventory]
        F[Purchase Orders]
        G[Dashboard / Reports]
        H[Audit Logs]
    end
 
    I[(PostgreSQL)]
 
    A -- REST / JWT --> API
    B --> I
    C --> I
    D --> I
    E --> I
    F --> I
    G --> I
    H --> I
```
 
This structure keeps the system simple to build and deploy as a solo developer while still demonstrating clean separation of concerns, transactional business logic, and enforced tenant isolation — the same patterns used in real production backend teams.
 
## Tech Stack
 
**Backend**
- NestJS · TypeScript
- PostgreSQL · Prisma ORM
- JWT + refresh token authentication
- Swagger / OpenAPI
- Docker
**Frontend**
- React · TypeScript
- React Router
- TanStack Query
- React Hook Form + Zod
- Tailwind CSS
## Screenshots
 
> _Add screenshots or GIFs of the Dashboard, Products list, Stock Transfer flow, and Purchase Order detail page here once available._
 
| Dashboard | Products | Inventory Movements |
|---|---|---|
| _screenshot_ | _screenshot_ | _screenshot_ |
 
## Installation
 
### Prerequisites
 
- Node.js 20+
- Docker & Docker Compose
- npm or pnpm
### Clone and set up
 
```bash
git clone https://github.com/<your-username>/tadjer.git
cd tadjer
```
 
### Backend
 
```bash
cd backend
cp .env.example .env
docker compose up -d          # starts PostgreSQL
npm install
npx prisma migrate dev
npx prisma db seed            # optional: seed demo data
npm run start:dev
```
 
Backend runs at `http://localhost:3000/api/v1`. Swagger docs at `http://localhost:3000/docs`.
 
### Frontend
 
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```
 
Frontend runs at `http://localhost:5173`.
 
## Environment Variables
 
**Backend (`backend/.env`)**
 
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tadjer"
JWT_ACCESS_SECRET="change-me"
JWT_REFRESH_SECRET="change-me-too"
JWT_ACCESS_EXPIRY="15m"
JWT_REFRESH_EXPIRY="7d"
PORT=3000
CORS_ORIGIN="http://localhost:5173"
```
 
**Frontend (`frontend/.env`)**
 
```env
VITE_API_BASE_URL="http://localhost:3000/api/v1"
```
 
## API Documentation
 
Full interactive API documentation is auto-generated with Swagger and served at:
 
```
http://localhost:3000/docs
```
 
Every endpoint requires `Authorization: Bearer <accessToken>` except `/auth/register`, `/auth/login`, `/auth/refresh`, and `/health`.
 
Core endpoint groups: `/auth`, `/organizations`, `/members`, `/categories`, `/suppliers`, `/products`, `/warehouses`, `/inventory`, `/purchase-orders`, `/dashboard`, `/reports`, `/audit-logs`.
 
## Database Design
 
PostgreSQL, managed with Prisma migrations. Core entities: `User`, `Organization`, `OrganizationMember`, `RefreshToken`, `Category`, `Supplier`, `Product`, `Warehouse`, `Inventory`, `InventoryMovement`, `PurchaseOrder`, `PurchaseOrderItem`, `AuditLog`.
 
```mermaid
erDiagram
    ORGANIZATION ||--o{ ORGANIZATION_MEMBER : has
    USER ||--o| ORGANIZATION_MEMBER : has
    ORGANIZATION ||--o{ PRODUCT : owns
    ORGANIZATION ||--o{ WAREHOUSE : owns
    CATEGORY ||--o{ PRODUCT : categorizes
    SUPPLIER ||--o{ PRODUCT : supplies
    SUPPLIER ||--o{ PURCHASE_ORDER : receives
    PRODUCT ||--o{ INVENTORY : "stocked as"
    WAREHOUSE ||--o{ INVENTORY : holds
    PRODUCT ||--o{ INVENTORY_MOVEMENT : "moved as"
    WAREHOUSE ||--o{ INVENTORY_MOVEMENT : "occurs at"
    PURCHASE_ORDER ||--o{ PURCHASE_ORDER_ITEM : contains
    PRODUCT ||--o{ PURCHASE_ORDER_ITEM : "ordered as"
```
 
Key design decisions:
- **Current stock** is stored as a maintained balance on `Inventory` (per product+warehouse), while `InventoryMovement` is an immutable ledger — giving fast reads and a full audit trail.
- **Multi-tenancy** is enforced via `organizationId` on every tenant-owned table, checked on every query (never trusting client-supplied IDs alone).
- **Soft deletes** (`archivedAt`) are used for `Product`, `Category`, `Supplier`, `Warehouse` to preserve historical movement and purchase order data.
See [`docs/srs.md`](./docs/srs.md) for the full schema, ERD, and business-rule documentation.
 
## Project Structure
 
```text
tadjer/
├── backend/
│   ├── prisma/
│   └── src/
│       ├── modules/       # auth, organizations, products, inventory, purchase-orders, ...
│       ├── common/        # filters, interceptors, pipes, shared services
│       └── config/
├── frontend/
│   └── src/
│       ├── app/
│       ├── components/
│       ├── features/      # auth, products, inventory, purchase-orders, ...
│       ├── hooks/
│       ├── lib/
│       ├── pages/
│       └── types/
└── docs/
    └── srs.md              # full software requirements & roadmap
```
 
## Testing
 
- **Unit tests** for service-layer business logic (inventory rules, PO status transitions, role hierarchy checks)
- **Integration tests** for tenant isolation and RBAC
- **E2E tests** for the critical flows: login/refresh, stock transfer, purchase order receiving
```bash
cd backend
npm run test          # unit
npm run test:e2e      # end-to-end
```
 
## Security
 
- Passwords hashed with bcrypt
- Refresh tokens stored hashed, rotated on every use, with reuse (theft) detection
- RBAC enforced at the API layer via guards, independent of frontend checks
- Strict tenant isolation on every query (`organizationId` scoping)
- Input validation on every endpoint (class-validator on the backend, Zod on the frontend)
- CORS restricted to the configured frontend origin
- Sensitive error details stripped in production responses
## Deployment
 
The app is designed for simple, affordable deployment:
- **Backend:** Dockerized NestJS service (e.g., Railway, Render, Fly.io)
- **Frontend:** Static build deployed to Vercel/Netlify
- **Database:** Managed PostgreSQL (e.g., Railway, Supabase, Neon)
```bash
docker build -t tadjer-backend ./backend
```
 
Run `npx prisma migrate deploy` against the production database as part of the deploy step.
 
## Roadmap / Known Limitations
 
- Email delivery for invitations is not yet implemented (invite links are shown in-app)
- No CSV/PDF export yet
- No real-time notifications (WebSockets) yet
- A user currently belongs to a single organization
## License
 
MIT
 
