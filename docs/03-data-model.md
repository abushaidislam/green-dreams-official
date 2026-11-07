# 03 — Data Model and Domain Rules

## Use built-in Medusa entities first

Use Medusa's supported Product, Product Variant, Product Category, Inventory, Customer, Cart, Order, Region, Shipping Option, Promotion, Payment and Fulfillment capabilities. Do not create duplicate custom tables for functionality already provided.

## Plant-care data: MVP approach

Start with a small typed application-level schema stored in product metadata if this fits the installed Medusa version and query/update workflow. Validate on both API boundary and Admin form.

Suggested shape (illustrative contract, not a database migration):

```ts
type PlantCareProfile = {
  plantType?: "indoor" | "outdoor" | "succulent" | "flowering" | "tree" | "other";
  scientificName?: string;
  light?: string;
  watering?: string;
  humidity?: string;
  difficulty?: "easy" | "medium" | "advanced";
  petSafety?: "unknown" | "safe" | "unsafe";
  careInstructions?: string;
  sourceVerified?: boolean;
};
```

Rules:
- `unknown` is the default for pet safety; never infer safety.
- Do not claim a watering schedule is universally correct. Allow editable, product-specific guidance.
- `sourceVerified` should be an internal editorial indicator, not a marketing claim.
- If metadata becomes too complex, propose a dedicated Plant Care module and migration plan before implementing it.

## Delivery configuration

Model delivery zones/rates using a maintainable backend configuration or a custom module if dynamic admin editing is required. Avoid hardcoding the same rate in frontend, backend and admin.

A delivery rule should conceptually include:
- zone identifier/name
- geographic coverage description or district/area mapping
- fee in BDT
- active/inactive flag
- optional minimum order threshold
- optional delivery note/ETA text (only if store owner confirms)

The backend must be authoritative for the final shipping amount. Frontend may display estimates but must not override server calculation.

## Homepage merchandising

For MVP, use a controlled list of featured product IDs/handles managed through an Admin UI route or a simple supported merchandising mechanism. Do not build a general page builder.

## Order notes and WhatsApp

Store only operationally necessary notes. Do not expose private customer details in public URLs or logs. WhatsApp click-to-chat can be a storefront/admin convenience, but it is not proof that a message was delivered.

## Seed data

- Use clearly labelled demo products only in development.
- Do not invent Green Dreams actual catalog, prices, inventory, care facts, reviews, or policies.
- Replace all seed content with client-approved data before launch.
