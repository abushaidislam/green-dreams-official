# 01 — Functional and Non-functional Requirements

Priority: **P0** = required for MVP; **P1** = desirable if budget/time allows; **P2** = post-MVP.

## Customer storefront

| ID | Requirement | Priority |
|---|---|---|
| SF-01 | Responsive homepage with hero, featured plants, categories, best sellers and trust/contact sections | P0 |
| SF-02 | Product listing with pagination or incremental loading | P0 |
| SF-03 | Category navigation | P0 |
| SF-04 | Product search | P1 |
| SF-05 | Product detail with images, price, variant, stock and care details | P0 |
| SF-06 | Add/update/remove cart items | P0 |
| SF-07 | Checkout with customer name, phone, address and delivery zone | P0 |
| SF-08 | COD order placement and confirmation page | P0 |
| SF-09 | Customer account and order history | P1 |
| SF-10 | Wishlist | P2 |
| SF-11 | Blog/plant-care learning hub | P2 |

## Commerce and admin

| ID | Requirement | Priority |
|---|---|---|
| AD-01 | Admin can create, edit, publish and archive products | P0 |
| AD-02 | Admin can manage product categories and variants | P0 |
| AD-03 | Admin can update inventory | P0 |
| AD-04 | Admin can view and process orders | P0 |
| AD-05 | Admin can view customer details | P0 |
| AD-06 | Admin can configure promotions/discounts | P1 |
| AD-07 | Admin can manage plant-care information | P0 |
| AD-08 | Admin can configure delivery zones/rates | P0 |
| AD-09 | Admin can select featured homepage products | P1 |
| AD-10 | Basic business overview widget/page | P1 |

## Bangladesh-specific requirements

- Store region/currency must be configured for Bangladesh and BDT.
- Phone number validation must accept intended Bangladesh formats; normalize consistently and document the stored format.
- Address fields should capture district/city, area/locality, street/house details, and delivery notes as appropriate.
- Delivery rate rules must be configurable by zone (e.g. inside Dhaka / outside Dhaka), not embedded in UI code.
- COD must create an order with a clearly represented payment state; do not falsely mark payment as captured.
- bKash/Nagad are not part of the initial live MVP unless merchant access and separate scope are approved.

## Non-functional requirements

- Mobile-first layout and usable keyboard navigation.
- Semantic HTML, labels, visible focus states and sufficient contrast.
- Server-side validation for checkout and stock-sensitive operations.
- Authentication and authorization for all Admin operations.
- No secrets in Git, browser bundles, screenshots or logs.
- Meaningful error states and loading states.
- Basic SEO metadata, canonical URLs where appropriate, sitemap/robots configuration.
- Production logging without sensitive personal/payment data.
- Automated tests for core business logic and checkout path.
- Documented database backup and restore procedure.

## Content requirements

- Product title, description, price, images, category, SKU/variant and inventory.
- Plant-care information: plant type, scientific name (optional), light, watering, humidity (optional), difficulty, pet safety (only if verified), care instructions.
- Mark all placeholder content as demo content; never publish fabricated product claims or reviews.
