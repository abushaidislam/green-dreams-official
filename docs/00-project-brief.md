# 00 — Project Brief

## Product

Green Dreams is a Bangladesh-based online plant shop. The website should make it easy for customers to discover plants, understand basic care requirements, place orders, and contact the store. Store staff should manage products, orders, stock, and selected content through Medusa Admin.

## Business outcomes

1. Establish a credible, visually polished online storefront.
2. Allow staff to manage catalog and orders without developer intervention.
3. Support a reliable COD-first checkout for Bangladesh.
4. Present useful plant-care information alongside products.
5. Keep the architecture extensible without building unnecessary systems in MVP.

## Primary users

- **Customer:** browses plants, checks price/availability/care details, places an order.
- **Store admin:** manages products, inventory, orders, promotions and customers.
- **Store operator:** maintains delivery zones, homepage selections and customer communication.

## Product principles

- Mobile-first, fast and accessible.
- Clear product photography and honest stock status.
- Simple checkout with minimum friction.
- Admin workflows should be understandable to non-technical staff.
- No fake reviews, fake stock counts, or unverified care claims.
- Use existing Medusa commerce capabilities wherever practical.

## MVP success measures

- A customer can complete a COD order on mobile.
- Admin can create/edit a product and stock level.
- Product updates appear on the storefront without code changes.
- Admin can find and process a new order.
- Delivery charges are applied consistently.
- Plant-care details are editable and visible on relevant product pages.
- The production deployment has HTTPS, backups, and documented recovery steps.

## Scope boundaries

### In scope
- Storefront: home, shop/category, product detail, cart, checkout, order confirmation.
- Basic customer account only if it can be delivered without delaying core checkout.
- Medusa products, variants, inventory, customers, orders, regions, shipping, promotions.
- COD-first payment flow.
- Bangladesh address capture and configurable delivery zones/rates.
- Plant-care fields.
- Small number of Admin widgets/UI routes.
- Basic SEO, responsive behavior, analytics-ready structure, deployment.

### Out of scope unless separately approved
- Live bKash/Nagad payment processing.
- Courier provider API and automatic label generation.
- Loyalty/rewards, subscriptions, wholesale/B2B, marketplace.
- Multi-vendor or multi-warehouse workflows.
- Advanced BI dashboards and custom report builder.
- Native mobile apps.
- Complex CMS or drag-and-drop page builder.
- Automated plant diagnosis/recommendation.

## Brand and content assumptions

Use a calm, premium botanical visual direction: natural greens, warm neutrals, generous whitespace, strong plant photography, readable typography. Do not copy another shop's assets or exact layout. Use only client-provided or properly licensed images and copy.

## Budget context

Target client budget discussed: BDT 20,000. Treat this as a strict MVP constraint. Hosting, domain, paid plugins, gateway fees, courier fees, premium assets, and ongoing maintenance are separate unless contractually included.
