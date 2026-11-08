# 12 — Production Deployment & Handover Inventory

This document serves as the formal handover inventory for the **Green Dreams** Bangladesh Plant eCommerce MVP.

---

## 1. Production Service Inventory

| Component | Platform | Resource / URL | Status | Notes |
|---|---|---|---|---|
| **Storefront App** | Vercel | [`https://green-dreams-official.vercel.app`](https://green-dreams-official.vercel.app) | **READY (Live)** | Next.js 15 App Router, React 19, Tailwind CSS. Auto-deploys on `master`. |
| **Commerce Backend** | Railway | [`https://medusa-backend-production-e218.up.railway.app`](https://medusa-backend-production-e218.up.railway.app) | **Configured** | Medusa.js v2, Node.js 22 runtime, port 9000 target. |
| **Admin Dashboard** | Railway | `https://medusa-backend-production-e218.up.railway.app/app` | **Configured** | Medusa built-in Admin with botanical extensions. |
| **Primary Database** | Supabase | `aws-0-ap-southeast-1.pooler.supabase.com:5432` | **Active** | PostgreSQL 15, SSL session pooler, Singapore region. |
| **Source Repository** | GitHub | [`https://github.com/abushaidislam/green-dreams-official`](https://github.com/abushaidislam/green-dreams-official) | **Active** | Monorepo structure, pnpm workspace, pinned lockfile. |

---

## 2. Environment Variables Inventory

### A. Vercel Storefront (`green-dreams-official`)

| Variable Name | Environment | Value / Pattern | Sensitive |
|---|---|---|---|
| `NEXT_PUBLIC_MEDUSA_BACKEND_URL` | Production, Preview, Dev | `https://medusa-backend-production-e218.up.railway.app` | No |
| `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | Production, Preview, Dev | `pk_f99102c7f3f02d9814198899e7f43186c556d291e9283329a440e6db1fe6d480` | No |
| `NEXT_PUBLIC_STORE_NAME` | Production, Preview, Dev | `Green Dreams` | No |

### B. Railway Backend (`medusa-backend`)

| Variable Name | Value / Purpose | Sensitive |
|---|---|---|
| `DATABASE_URL` | `postgresql://postgres.cvriidykoydkniungdbd:[PASS]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres` | **YES** |
| `NODE_ENV` | `production` | No |
| `PORT` | `9000` | No |
| `MEDUSA_BACKEND_URL` | `https://medusa-backend-production-e218.up.railway.app` | No |
| `JWT_SECRET` | 32-character cryptographically secure token | **YES** |
| `COOKIE_SECRET` | 32-character cryptographically secure token | **YES** |
| `STORE_CORS` | `https://green-dreams-official.vercel.app,http://localhost:3000` | No |
| `ADMIN_CORS` | `https://medusa-backend-production-e218.up.railway.app,http://localhost:9000` | No |
| `AUTH_CORS` | `https://medusa-backend-production-e218.up.railway.app,https://green-dreams-official.vercel.app,http://localhost:3000` | No |

---

## 3. Verified Business Capabilities

- **Bangladeshi Currency:** Authoritative BDT (৳) pricing across all catalog and checkout flows.
- **Delivery Zone Authoritative Calculation:**
  - Inside Dhaka: Flat ৳60.
  - Outside Dhaka (all 64 districts): Flat ৳130.
- **Payment Method:** Cash on Delivery (COD) tested and verified. Orders initialize as `authorized` / `pending` (never falsely marked as captured online).
- **Mobile Validation:** Strict regex enforcement for all major Bangladeshi operators (017, 013, 019, 014, 018, 016, 015).
- **Plant Care System:** 7-point schema (difficulty, petSafety, light, water, humidity, fertilizer, repotting) verified with XSS sanitization.
- **WhatsApp Customer Engagement:** Integrated click-to-chat links for customer care and order confirmation.
- **Security Hardening:** Zero secret exposure in client bundles, admin route authentication enforcement, and explicit CORS lockdown.

---

## 4. Final Monorepo Cleanliness & Verification

- **Automated Tests:** 47/47 Passed (`32 Passed, 15 Security Passed, 0 Failed`).
- **Storefront Typecheck:** Passed (0 errors).
- **Production Build:** Compiled cleanly (`13/13 routes`).
