---
trigger: always_on
description: Green Dreams architecture constraints.
---
# Architecture Rules

- Medusa.js v2 is the commerce backend; Next.js TypeScript is the storefront.
- Keep the built-in Medusa Admin and extend through supported widgets/UI routes.
- Do not create a separate admin app or fork Medusa Admin without explicit approval.
- PostgreSQL is the commerce source of truth; browser code never accesses it directly.
- Use supported Medusa APIs/SDK patterns and verify against installed package versions.
- Prefer built-in Medusa capabilities before custom modules.
- Keep secrets server-side; never expose Admin secrets or DB credentials.
- Keep Bangladesh delivery fees authoritative on the backend.
- COD is not a successful online payment capture.
- Avoid speculative infrastructure and scope creep.
