# 09 — QA, Security, Deployment and Handover

## Test strategy

### Unit tests
- Phone/address validation.
- Plant-care schema validation.
- Delivery zone selection and fee calculation.
- Formatting and mapping functions.

### Integration tests
- Product retrieval.
- Cart line update.
- Server-side price/stock validation.
- Shipping option calculation.
- COD order creation and state.
- Admin plant-care update persistence.

### End-to-end tests
1. Browse category.
2. Open product.
3. Add product to cart.
4. Update quantity.
5. Enter customer/address details.
6. Select delivery option.
7. Place COD order.
8. See confirmation.
9. Admin locates order and processes it.

Test at minimum one narrow mobile viewport and one desktop viewport.

## Security checklist

- Admin routes require authentication and authorization.
- Secret API keys and database credentials remain server-side.
- `.env` files are ignored by Git; `.env.example` contains placeholders only.
- CORS is restricted to expected origins.
- Validate and sanitize user input on server.
- Avoid leaking customer data in URLs, analytics, logs or error responses.
- Apply rate limiting / abuse protection where appropriate for public endpoints.
- Use secure cookies/session settings according to the chosen auth setup.
- Use HTTPS in production.
- Keep dependencies updated deliberately; review breaking changes.
- Do not expose database ports publicly.
- Protect backups and storage credentials.

## Environment variable policy

Create `.env.example` documenting required variable names and purpose. Exact variable names must follow the installed Medusa/Next.js versions and chosen providers. Never invent a variable name without verifying the provider docs.

Potential categories:
- Database connection
- Backend host/public URL
- Storefront public backend URL
- Publishable key (public, if required by selected Medusa setup)
- Admin secret/private API key (server-side only)
- CORS origins
- Storage provider credentials
- Store WhatsApp phone number
- Optional monitoring/analytics IDs

## Deployment checklist

- Production Node/runtime versions supported by installed dependencies.
- Backend and storefront deployed with correct environment variables.
- Database provisioned, private and backed up.
- Migrations run using documented release process.
- Media storage configured and tested.
- Domain DNS and HTTPS configured by owner/authorized operator.
- CORS and callback URLs verified.
- Admin login verified.
- Product image upload verified.
- Checkout smoke test performed without charging a real customer.
- Logs and health checks reviewed.
- Backup restore procedure tested in a safe environment.

## Handover package

- Source repository and lockfile.
- Environment variable inventory (names only; credentials shared securely).
- Deployment and rollback instructions.
- Admin operator quick guide.
- Backup/restore instructions.
- Known limitations and deferred features.
- Third-party service ownership and renewal dates.
