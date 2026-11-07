# 10 — Architecture Decisions and Open Questions

## Decisions already selected

| Topic | Decision |
|---|---|
| Commerce backend | Medusa.js v2 |
| Storefront | Next.js + TypeScript |
| Admin approach | Hybrid: existing Medusa Admin + supported extensions |
| Database | PostgreSQL |
| Initial payment | COD-first |
| Market/currency | Bangladesh / BDT |
| Scope | Controlled MVP |
| Target budget context | BDT 20,000, with exclusions clearly stated |

## Decisions the developer must verify

- Exact compatible package versions and Node.js runtime.
- Medusa v2 COD provider/workflow semantics for the selected version.
- Whether product metadata is sufficient for plant-care fields.
- Exact supported Admin widget/UI route extension APIs.
- Storage provider and deployment topology.
- Whether Redis is required for selected features/deployment configuration.
- Hosting provider and backup approach.

## Client questions — must be answered before production

1. What are the approved logo, brand colors, typography and social links?
2. What is the actual product catalog with names, prices, variants, stock and photos?
3. Which delivery zones exist and what is the fee for each?
4. What is the store's official WhatsApp/phone number?
5. What are the shipping, cancellation, return and damaged-plant policies?
6. Is customer account registration required for launch, or is guest checkout acceptable?
7. Who owns the domain, hosting, storage and payment merchant accounts?
8. Is live bKash/Nagad required in the initial contract, or a later phase?
9. Which courier is used, and is manual fulfillment acceptable for MVP?
10. Who provides final content and who approves plant-care guidance?

## Assumptions until confirmed

- Guest checkout is acceptable for MVP.
- COD is the only live payment option in the initial release.
- Delivery zones can initially be simple configurable zones.
- WhatsApp is click-to-chat, not automated Business API messaging.
- Product content and images are supplied/approved by the client.
- No live gateway or courier API is promised in the BDT 20,000 scope.
