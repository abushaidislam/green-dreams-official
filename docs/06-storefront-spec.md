# 06 — Storefront Specification

## Visual direction

Premium botanical retail: natural greens, warm off-white backgrounds, restrained typography, strong photography, spacious layout, subtle motion. Avoid clutter and generic marketplace appearance.

Brand colors are provisional; confirm exact logo, colors and fonts with the client before final polish. Do not use third-party shop imagery without permission.

## Sitemap

```text
/
├── /shop
├── /categories/[handle]
├── /products/[handle]
├── /cart
├── /checkout
├── /order/[id]       # protect private details appropriately
├── /account          # P1
└── /contact
```

## Homepage sections (P0)

1. Header with logo, navigation, search entry point and cart.
2. Hero with clear value proposition and CTA.
3. Shop by category.
4. Featured plants.
5. Best sellers/new arrivals (only when actual merchandising data exists).
6. Plant-care/value proposition section.
7. Delivery/payment trust information approved by client.
8. Contact/WhatsApp CTA.
9. Footer with policies and social links.

## Product listing

- Product image, name, price, availability.
- Category filtering and sorting if feasible.
- Empty state and loading state.
- Do not display fake ratings/review counts.
- Use server-side pagination/filtering when supported.

## Product detail

- Image gallery with alt text.
- Name, price, variant selector if applicable.
- Stock/availability.
- Plant-care summary.
- Quantity control.
- Add-to-cart feedback.
- Delivery information and contact CTA.
- Related products only if real relationship/data exists.

## Cart and checkout

- Edit quantity/remove items.
- Revalidate product availability and price on server.
- Collect customer name, Bangladesh phone, address, area/district and delivery notes.
- Show shipping fee and order total from backend calculation.
- Make COD terms clear.
- Prevent accidental duplicate submissions.
- Show a clear confirmation after successful order creation.
- Never expose other customers' orders by guessable IDs.

## Accessibility, responsive and performance

- Mobile-first layout.
- Semantic landmarks and heading order.
- Form labels and helpful errors.
- Keyboard-accessible navigation and controls.
- Responsive images and lazy loading where appropriate.
- Avoid large client bundles and unnecessary animation.
- Provide skeleton/loading, empty, error and success states.
