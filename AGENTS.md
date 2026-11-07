# Green Dreams — Agent Operating Instructions

You are implementing a production-minded, Bangladesh-focused plant eCommerce MVP.

## 1. Read before coding

Before making changes, read:
- `README.md`
- `docs/00-project-brief.md`
- `docs/01-requirements.md`
- `docs/02-architecture.md`
- `docs/07-roadmap-and-acceptance.md`
- Relevant feature-specific documents.

## 2. Execution method

- Work phase by phase. Never implement the entire product in one unreviewed batch.
- Start each phase by inspecting the repository and reporting the current state.
- Present a concise implementation plan and identify assumptions before changing files.
- Implement the smallest complete vertical slice.
- Run relevant tests, lint, typecheck, and production build.
- Fix failures caused by your changes before declaring completion.
- Report changed files, commands run, results, remaining risks, and next step.
- Do not claim a test passed unless you actually ran it and saw a successful result.

## 3. Architecture constraints

- Use Medusa.js v2 as the commerce backend.
- Use Next.js + TypeScript for the customer storefront.
- Use Medusa's existing Admin as the foundation; extend it with supported widgets and UI routes.
- Do not create a separate custom admin application unless the owner explicitly approves a scope change.
- PostgreSQL is the primary relational database.
- Storefront communicates with Medusa through supported Store API endpoints / SDK patterns. Never connect the browser directly to PostgreSQL.
- Keep secrets on the server. Never expose Medusa secret API keys, database credentials, payment secrets, or private storage credentials in client bundles.
- Prefer built-in Medusa modules and workflows over custom reimplementation.
- Keep custom business logic isolated and documented.
- Avoid premature microservices, unnecessary abstractions, and speculative features.

## 4. Version and documentation discipline

- Verify current stable compatible versions of Medusa v2, Next.js, Node.js, and supporting packages before installation.
- Use official documentation matching the installed major/minor version.
- Pin dependencies and commit the package-manager lockfile.
- Do not copy outdated v1 Medusa examples into a v2 project.
- Do not invent SDK methods, module registration keys, Admin extension APIs, or workflow names. Inspect installed package types and official docs.

## 5. Data and business rules

- Currency: BDT for the Bangladesh sales region.
- Initial payment method: Cash on Delivery (COD), subject to a tested payment flow.
- Delivery pricing must be configurable, not hardcoded across components.
- Product stock must be validated server-side.
- Do not mark an order delivered merely because it was created or fulfilled.
- Keep order, payment, and fulfillment states conceptually separate.
- Plant-care content must be editable by authorized admins.
- Do not invent plant-care facts. Seed data must be clearly marked as sample content and verified by the store owner before publication.

## 6. Safety and approvals

Always ask before:
- Deleting production data or destructive database operations.
- Running migrations that drop/rename data.
- Changing payment, shipping, tax, or order business rules beyond the approved spec.
- Adding paid services, external accounts, or production credentials.
- Deploying to production, changing DNS, or sending real customer notifications.
- Committing secrets or accessing files outside the project.

Use `.env.example` with placeholders only. Never put real credentials in documentation or source control.

## 7. Definition of done

A task is not complete until:
- Its acceptance criteria are met.
- Relevant automated checks have been run.
- Important manual/browser checks are recorded.
- No known regression introduced by the task remains.
- Documentation is updated where behavior or setup changed.
