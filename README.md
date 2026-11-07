# Green Dreams — Antigravity Development Blueprint

**Purpose:** A practical, agent-ready implementation specification for a Bangladesh-focused plant eCommerce MVP using Medusa.js v2, Next.js, PostgreSQL, and a hybrid Medusa Admin.

## How to use this package

1. Extract this ZIP into a new, empty project folder named `green-dreams`.
2. Open that folder as a project/workspace in Google Antigravity.
3. Read `AGENTS.md` and `docs/00-project-brief.md`.
4. Start Antigravity in **Plan** mode. Ask it to inspect the blueprint and produce a detailed Phase 1 plan. Do not ask it to build every feature in one prompt.
5. Review the plan. Then implement one phase at a time using `docs/08-antigravity-prompts.md`.
6. Require tests, build output, screenshots or browser verification where appropriate, and a short change report before accepting each phase.

## Documents

| File | Purpose |
|---|---|
| `AGENTS.md` | Persistent project rules for Antigravity |
| `docs/00-project-brief.md` | Product goals, scope, assumptions |
| `docs/01-requirements.md` | Functional and non-functional requirements |
| `docs/02-architecture.md` | System architecture and boundaries |
| `docs/03-data-model.md` | Product, plant-care, delivery and order data |
| `docs/04-api-and-integrations.md` | API boundaries and integration contracts |
| `docs/05-admin-spec.md` | Hybrid Medusa Admin requirements |
| `docs/06-storefront-spec.md` | Customer-facing website requirements |
| `docs/07-roadmap-and-acceptance.md` | Phases, dependencies, acceptance criteria |
| `docs/08-antigravity-prompts.md` | Copy/paste prompts for the agent |
| `docs/09-qa-security-deployment.md` | QA, security, deployment and handover |
| `docs/10-decisions-and-open-questions.md` | Decisions, assumptions and items needing client confirmation |
| `.agents/rules/architecture.md` | Architecture guardrails |
| `.agents/rules/testing.md` | Testing and verification guardrails |
| `.agents/workflows/phase-implementation.md` | Repeatable phase workflow |

## Important scope warning

The original client budget discussed was **BDT 20,000**. This blueprint deliberately defines a controlled MVP, not a full enterprise store. Live bKash/Nagad, courier API automation, advanced analytics, loyalty, multi-warehouse logic, and extensive content management are excluded unless separately approved and funded.

The previously discussed 20–28 working-day estimate is a planning estimate, not a guarantee. Actual delivery depends on developer experience, content readiness, merchant credentials, hosting, feedback turnaround, and integration availability.

## Non-negotiable engineering rule

Do not guess current Medusa APIs, package versions, or extension conventions. Verify against the installed version and current official Medusa documentation before implementing. Pin compatible package versions and commit the lockfile.
