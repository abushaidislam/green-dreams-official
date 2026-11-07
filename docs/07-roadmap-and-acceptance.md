# 07 — Delivery Roadmap and Acceptance Criteria

Work estimates are indicative and assume one experienced developer with timely client feedback. Do not promise fixed delivery dates until repo setup, assets and integration dependencies are verified.

## Phase 0 — Discovery and setup (0.5–1 day)
- Confirm logo, brand assets, catalog, policies, delivery zones and contact number.
- Confirm hosting and domain ownership.
- Confirm exact scope and what BDT 20,000 excludes.
- Inspect current official Medusa v2 and Next.js requirements.

**Gate:** written answers for blocking questions; scope signed off.

## Phase 1 — Foundation (2–3 days)
- Create repository and app structure.
- Install compatible pinned versions.
- Configure Medusa, PostgreSQL and storefront.
- Configure environment variables and local run scripts.
- Add health/readiness checks where appropriate.

**Acceptance:** both apps run locally; backend connects to DB; Admin login works; lockfile committed; no secrets committed.

## Phase 2 — Commerce configuration (3–4 days)
- Configure Bangladesh region and BDT.
- Configure product categories, variants and inventory.
- Configure shipping/delivery approach.
- Implement COD-compatible flow after verifying Medusa v2 behavior.
- Add sample data marked as demo.

**Acceptance:** Admin can create a product; Store API returns it; cart can be created; shipping option can be selected; COD order flow passes tests.

## Phase 3 — Storefront MVP (5–7 days)
- Implement homepage, shop, category, product, cart and checkout.
- Add responsive layout and core states.
- Integrate Medusa APIs.
- Add SEO basics.

**Acceptance:** customer can browse a real seeded product and complete a COD order on mobile and desktop.

## Phase 4 — Hybrid Admin (3–4 days)
- Plant-care product widget.
- Delivery zone UI/configuration if required.
- Order operations/WhatsApp convenience widget.
- Homepage featured products UI if time allows.

**Acceptance:** admin edits plant-care fields and storefront reflects approved data; delivery rules are consistent between admin and checkout.

## Phase 5 — Bangladesh business details (1–3 days)
- Phone/address validation.
- Dhaka/outside-Dhaka delivery rules.
- WhatsApp click-to-chat.
- Store policies and contact details.

**Acceptance:** valid/invalid phone and address cases tested; shipping fee is server-calculated; WhatsApp link uses client-confirmed number.

## Phase 6 — QA and hardening (2–4 days)
- Unit/integration tests for business logic.
- End-to-end checkout test.
- Admin access checks.
- Responsive/browser checks.
- Error handling, logging and basic security review.

**Acceptance:** critical path has no known blocker; all P0 acceptance criteria pass; test evidence recorded.

## Phase 7 — Deployment and handover (1–2 days)
- Configure production environment and domain.
- HTTPS, CORS, secrets and storage.
- Database backup and restore test.
- Production smoke test.
- Handover credentials securely and provide operator guide.

**Acceptance:** production storefront and Admin work; backup/restore process documented; no secrets in repository.

## MVP completion definition

All P0 requirements in `docs/01-requirements.md` and relevant criteria above are met. P1/P2 items are explicitly deferred rather than silently half-built.

## Scope control

Any request for live payment gateways, courier automation, advanced CMS, loyalty, multi-warehouse, or custom analytics requires written change approval and revised estimate.
