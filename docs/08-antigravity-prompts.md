# 08 — Antigravity Prompt Library

Use one prompt per phase. Do not paste all prompts at once.

## Prompt 1 — Discovery and plan (start here)

```text
You are the lead engineer for the Green Dreams project. Before coding, read AGENTS.md and all relevant docs, especially docs/00-project-brief.md, docs/01-requirements.md, docs/02-architecture.md and docs/07-roadmap-and-acceptance.md.

Inspect the current workspace. Do not modify files yet.

Return:
1. Current repository state.
2. Recommended compatible versions of Node.js, Medusa v2, Next.js and package manager, verified against current official documentation.
3. Any conflicts, missing decisions or technical risks in this blueprint.
4. A concrete Phase 1 implementation plan with files to create, commands to run and acceptance checks.
5. Any question that blocks safe implementation.

Do not assume outdated Medusa v1 APIs. Do not invent package APIs. Wait for my approval before implementation.
```

## Prompt 2 — Phase 1 foundation

```text
Implement Phase 1 only, following the approved plan and AGENTS.md.

Create the minimal repository foundation for a Medusa v2 backend and Next.js TypeScript storefront. Pin compatible dependencies and commit the lockfile. Configure local development and PostgreSQL using environment variables and safe placeholders.

Do not implement business features yet. Do not add unnecessary infrastructure. Do not commit secrets.

Run the available install, typecheck, lint, tests and build commands. Report exact commands and outcomes, changed files, and remaining setup steps. Stop after Phase 1 acceptance criteria.
```

## Prompt 3 — Commerce configuration

```text
Implement Phase 2 only. First inspect installed Medusa package versions and official documentation matching those versions.

Configure Bangladesh/BDT region, catalog structure, inventory, shipping configuration and a tested COD-compatible order flow. Use built-in Medusa capabilities wherever possible. Create only clearly labelled demo data.

Do not implement live bKash/Nagad or courier APIs. Verify the actual payment semantics: COD must not be falsely marked as an online payment capture.

Add tests for the core configuration and order flow. Report evidence and stop at the Phase 2 gate.
```

## Prompt 4 — Storefront

```text
Implement Phase 3 only using docs/06-storefront-spec.md.

Build the responsive Green Dreams storefront: homepage, shop/category listing, product details, cart, checkout and order confirmation. Connect through supported Medusa Store API/SDK patterns. The backend is authoritative for price, inventory, shipping and order creation.

Use polished botanical visual design, accessible controls, loading/error/empty states and real API data. Do not invent reviews, product content, stock or policies. Use clearly marked placeholders where client content is missing.

Test the critical customer journey on mobile and desktop. Report screenshots/browser evidence, test commands and results. Stop at the Phase 3 gate.
```

## Prompt 5 — Hybrid Admin

```text
Implement Phase 4 only using docs/05-admin-spec.md.

Keep the existing Medusa Admin. Use the supported Admin extension mechanism for the installed Medusa version. Implement the Plant Care product widget first. Then implement only the approved delivery-zone and merchandising UI routes/widgets that fit the phase scope.

Do not fork Medusa Admin or create a separate admin app. Respect Admin authentication/permissions. Avoid direct database writes from the UI.

Verify create/edit/save/reload behavior and storefront display. Add tests where practical. Stop at the Phase 4 gate.
```

## Prompt 6 — QA and production readiness

```text
Perform Phase 6 and Phase 7 readiness work using docs/09-qa-security-deployment.md.

Do not deploy, change DNS, or perform destructive production operations without my explicit approval. Inspect configuration, run tests, lint, typecheck, production builds and browser checks. Identify security issues, exposed secrets, CORS/auth problems, checkout defects and missing backup/restore steps.

Fix safe issues in the workspace. For risky changes, explain the issue and request approval. Produce a release checklist and handover notes. Never claim production readiness without evidence.
```

## Prompt 7 — Bug fixing

```text
Investigate this bug without broad refactoring: [PASTE BUG].

Reproduce it first. Identify the root cause with evidence. Make the smallest safe fix, add a regression test, run relevant checks, and explain the result. Do not change unrelated behavior or dependencies. If the issue is caused by unclear requirements, ask one focused question rather than guessing.
```
