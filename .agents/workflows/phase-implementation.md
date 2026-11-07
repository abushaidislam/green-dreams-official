# Phase Implementation Workflow

1. Read `AGENTS.md` and the relevant `docs/` specification.
2. Inspect current repository state and installed dependency versions.
3. Verify version-specific APIs against official documentation and installed types.
4. Summarize plan, assumptions, files to change and acceptance criteria.
5. Wait for owner approval if scope, data model, payments, security or deployment decisions change.
6. Implement one small vertical slice.
7. Run tests, lint, typecheck and build as relevant.
8. Verify UI in browser when UI behavior changes.
9. Update documentation and `.env.example` if setup changes.
10. Report evidence, remaining risks and stop at the phase gate.
