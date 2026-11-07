# 04 — API and Integration Contracts

## General rules

- Use the installed Medusa v2 Store API and supported SDK/client patterns.
- Use Admin API only from authenticated Admin contexts or secure server-side code as appropriate.
- Never expose secret Admin API keys to the browser.
- Confirm exact route names, request bodies, response types and SDK methods from current installed-version docs/types. The examples below are capability-level requirements, not guaranteed literal endpoint paths.

## Required commerce capabilities

| Capability | Source of truth | Expected behavior |
|---|---|---|
| Product listing/detail | Medusa Product APIs | Published products only; support category/filter needs |
| Cart | Medusa Cart APIs | Server validates price, variant and availability |
| Shipping options | Medusa shipping configuration/API | Return valid options for region/address |
| Checkout | Medusa cart/order/payment workflows | Validate customer/address/shipping before order completion |
| COD | Compatible payment provider/flow | Order created with unpaid/pending collection semantics |
| Order management | Medusa Admin | Staff can process orders and fulfillment |
| Inventory | Medusa Inventory | Validate availability server-side |
| Plant care | Product metadata or custom module | Typed, validated and editable data |
| Delivery zone | Config/custom module | Server-authoritative fee calculation |

## COD requirements

- Confirm the appropriate Medusa v2 payment provider/collection workflow for COD.
- COD must not be represented as a successful online capture.
- Store payment state accurately (e.g. pending/authorized/awaiting collection as supported by the actual provider/workflow).
- Verify how cancellation, partial fulfillment, failed delivery and refund/return scenarios are represented.
- Add tests for duplicate submission/idempotency where supported.

## WhatsApp integration

MVP can use a click-to-chat link with a prefilled, URL-encoded message. The phone number must be supplied by the client and stored in configuration. Do not imply that WhatsApp messages are automatically sent or delivered unless an approved WhatsApp Business API integration is separately implemented.

## bKash / Nagad

Out of initial MVP scope. Before implementation, require:
- merchant account and approved credentials
- official provider documentation and current API contract
- payment initiation and server-side verification
- webhook/callback signature or authenticity validation as specified by provider
- idempotency and duplicate callback handling
- success, failure, cancel and refund behavior
- test/sandbox evidence
- separate estimate and client approval

Do not collect or commit credentials in source code. Do not use unofficial endpoints.

## Courier APIs

Out of initial MVP scope. If later approved, evaluate courier partner, serviceability, rate quotation, booking, tracking, cancellation and webhook support. Keep courier integration behind an adapter/provider boundary.
