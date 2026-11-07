# 05 — Hybrid Medusa Admin Specification

## Strategy

Keep Medusa Admin as the only staff admin application for MVP. Extend it using the officially supported extension mechanism for the exact installed Medusa version.

## Built-in capabilities to retain

- Product and variant management
- Category management
- Inventory management
- Order and fulfillment management
- Customer management
- Promotions (if configured)
- Region, shipping and settings management

Do not rebuild these screens.

## Custom widgets

### Product detail: Plant Care widget
Fields:
- Plant type
- Scientific name (optional)
- Light requirement
- Watering guidance
- Humidity (optional)
- Difficulty
- Pet safety (unknown/safe/unsafe)
- Care instructions
- Internal verification indicator

Acceptance:
- Authorized admin can view and edit fields.
- Validation prevents invalid enum values and excessive text.
- Save/reload preserves values.
- Storefront displays only approved/public fields.
- Errors and loading states are visible.

### Order detail: Operations widget
- Display order operational notes.
- Provide a WhatsApp click-to-chat link using configured store number.
- Include order reference and only the minimum necessary customer data in the message.
- Link is a convenience; it does not send automatically.

## Custom UI routes

### Green Dreams overview (P1)
- Total orders in selected period, if safely available through supported APIs.
- Orders needing attention.
- Low-stock products.
- Avoid complex analytics or expensive unbounded queries.

### Delivery zones (P0 if editable by store owner)
- List active zones and fee.
- Create/edit/disable zone if backed by an approved data model.
- Validate fees as non-negative integer BDT amounts.
- Ensure checkout uses the same backend rules.

### Homepage merchandising (P1)
- Select featured products from existing catalog.
- Validate selected products are published and available.
- Provide preview/ordering if feasible.
- Do not build drag-and-drop page builder.

## Admin UX and permissions

- Reuse Medusa UI components and conventions.
- Respect Admin authentication and permissions.
- Do not create public unauthenticated admin routes.
- Keep forms keyboard accessible.
- Show save status and validation errors.
- Confirm destructive actions.
- Do not bypass Admin APIs with direct database writes.
