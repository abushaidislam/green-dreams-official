---
trigger: always_on
description: Green Dreams testing, security and completion requirements.
---
# Testing Rules

- Reproduce bugs before fixing them.
- Add regression tests for bug fixes and business rules.
- Run relevant tests, lint, typecheck and production build after meaningful changes.
- Never claim checks passed unless commands were actually run successfully.
- Test checkout and inventory validation on the server.
- Test responsive UI at mobile and desktop sizes.
- Do not deploy, change DNS, delete production data or run destructive migrations without explicit approval.
- Report changed files, commands, results, limitations and next step.
