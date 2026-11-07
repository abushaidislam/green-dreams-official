# 02 — System Architecture

## Logical topology

```text
Customer Browser
      |
      v
Next.js Storefront (TypeScript)
      |
      | Medusa Store API / supported SDK
      v
Medusa.js v2 Backend -------------------- Medusa Admin (staff)
      |                                         |
      |                                         | Admin API / supported extension APIs
      v                                         v
PostgreSQL                              Admin widgets + UI routes
      |
      +---- Object storage for product media (via configured provider)
      |
      +---- Redis / event infrastructure only if required by selected deployment/features
```

## Application boundaries

### Storefront
Owns presentation, navigation, SEO, responsive UX, client interactions and customer-facing form validation. It does not own authoritative pricing, inventory, shipping calculation, order creation or payment state.

### Medusa backend
Owns commerce data and business operations: products, variants, pricing, inventory, carts, orders, customers, regions, shipping, promotions and payment/fulfillment workflows.

### Medusa Admin
Uses the built-in Admin. Extend through supported Admin widgets and UI routes. Avoid forking core Admin or creating a separate dashboard in MVP.

### Database and media
PostgreSQL is the source of truth for commerce records. Product images should use a supported file storage provider (S3-compatible or another officially supported provider). Do not store large binary images directly in relational tables.

## Suggested repository layout

Use a monorepo only if it simplifies local development and deployment for the selected team. A practical starting layout:

```text
green-dreams/
  apps/
    backend/       # Medusa v2 project
    storefront/    # Next.js app
  packages/
    shared-types/  # only stable shared contracts, if needed
  docs/
  .agents/
  AGENTS.md
  .env.example
  README.md
```

Do not force a workspace tool (Turborepo/Nx/pnpm workspaces) unless dependency management benefits justify it. Select one package manager and use it consistently.

## Backend extension strategy

1. Prefer built-in Medusa modules and configuration.
2. Use product metadata for a small, stable set of optional plant-care fields in the first iteration, after confirming how the selected Medusa version exposes metadata safely.
3. Create a custom module only if plant-care data needs independent lifecycle, relationships, validation, querying or reuse.
4. Use supported workflows/API routes for custom business actions.
5. Use Admin widgets for contextual product/order information and UI routes for distinct management screens.
6. Keep all custom code version-compatible and covered by tests.

## Reliability and operations

- Separate development, staging and production environments.
- Use environment-specific secrets.
- Configure database backups before production launch.
- Use HTTPS and restrict CORS to known storefront/admin origins.
- Configure health checks and structured logs.
- Do not add Redis or extra infrastructure by habit; verify actual Medusa deployment requirements for the selected version and features.
