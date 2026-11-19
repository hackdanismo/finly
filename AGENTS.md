# Finly Budget Manager

## Project purpose
Build a secure, accessible, mobile-friendly personal budget management web app. Users should be able to record income and expenses, manage monthly category budgets, and understand their financial position through clear dashboards and charts.

## Working approach
- Work on one clearly scoped feature or bug fix per request.
- Before editing, inspect the relevant files, existing conventions, package scripts, and tests. Do not assume a dependency or command exists.
- Prefer the smallest maintainable change that satisfies the request. Avoid unrelated refactors and unnecessary packages.
- For ambiguous, non-critical details, choose a sensible default and briefly document it. Ask before making destructive changes or changing financial calculations in material ways.
- Do not claim a feature, test, commit, or push succeeded unless you verified it.

## Technology and architecture
- Frontend: React + TypeScript (Vite unless the repo already uses another framework).
- Styling: Vanilla CSS; use shadcn/ui where already installed or explicitly approved.
- Charts: Recharts where appropriate.
- Backend and authentication: Use CSV files to store data locally for now as a database will be added at a later time.
- Follow the existing directory structure. Prefer small, reusable, typed components and hooks.
- Reusable components should be used where possible and always built inside of a components folder inside of src.
- Use strict TypeScript; avoid `any` unless justified.
- Separate UI, business logic, data access, and validation.
- Prefer existing libraries and conventions over introducing alternatives.

## Budgeting and financial rules
- Store monetary values as integer minor units (for example, pence) or an appropriate exact decimal type in the database. Do not use floating-point arithmetic for authoritative totals.
- Make currency explicit; default to GBP for initial development, but do not assume all future records share one currency.
- Treat income, expenses, transfers, refunds, and recurring transactions as distinct concepts.
- Define monthly boundaries and date/time-zone handling explicitly.
- Ensure financial totals derive from a consistent source of truth; never silently double-count transfers.
- Do not fabricate real transactions, balances, bank connections, or financial insights. Use clearly labelled sample data in demos and tests.

## UI and user experience
- Prioritise a clean, modern dashboard with responsive layouts for desktop and mobile.
- Support keyboard navigation, accessible labels, and adequate contrast.
- Provide loading, empty, error, and success states where appropriate.
- Use clear currency formatting and understandable chart labels.
- Keep visual and interaction patterns consistent with existing screens.

## Security and privacy
- Never commit `.env`, `.env.local`, credentials, API keys, secrets, personal bank details, or real transaction exports.
- Keep sensitive settings in environment variables and document required variable names in `.env.example` using placeholders only.
- Do not expose Supabase service-role keys in browser code.
- Enforce user-specific access through appropriate server-side authorization and Supabase Row Level Security policies; frontend filtering is not authorization.
- Validate input, handle errors without leaking sensitive data, and avoid logging personal financial information.
- Do not implement real bank integrations or payment initiation without an explicit request and a security review.

## Tests and quality gates
- Before committing, run the relevant available checks, including typecheck, lint, tests, and production build when scripts exist.
- Add or update tests for changed financial calculations, transaction behaviour, and important UI flows.
- Fix failures introduced by your changes. Clearly report unrelated pre-existing failures or checks that cannot run.
- Do not bypass failing checks or weaken tests just to obtain a green result.

## Git and GitHub workflow
- Target one logical commit per completed user request that changes repository files.
- Work on the currently designated development/feature branch; never push directly to `main` unless explicitly requested.
- Before editing, inspect `git status` and current branch. Preserve unrelated user changes.
- Never run destructive Git operations (`reset --hard`, forced push, cleaning untracked files) without explicit approval.
- Stage only files relevant to the task; do not blindly use `git add .`.
- After successful checks, create a descriptive Conventional Commit, for example:
  - `feat: add monthly budget overview`
  - `fix: correct recurring expense totals`
  - `chore: cover category budget calculations`
  - `chore: for anything else that does not meet the earlier categories`
- If a task requires multiple independently meaningful commits, explain the split.
- Push to the designated remote development/feature branch only if the environment has GitHub access and the user has authorized pushing. Otherwise leave the commit locally or provide the patch and explain the limitation.
- Prefer pull requests and review before merging to `main`.
- Git commit and push permissions depend on the Codex environment; these instructions do not grant access.

## Completion report
At the end of each task, report concisely:
1. What changed and which key files were updated.
2. Checks run and their results.
3. Commit hash and branch, or why no commit was created.
4. Push or pull request status, if applicable.
5. Any known limitations or follow-up steps.

## Feature priorities
1. App shell, navigation, and responsive dashboard.
2. Income and expense tracking.
3. Transaction categories and monthly budgets.
4. Charts and month-over-month comparisons.
5. Recurring transactions and savings goals.
6. Authentication and secure persistent storage.
7. Forecasting and advanced integrations only after core data integrity is established.

If repository code or a later explicit user instruction conflicts with an assumption here, inspect the situation and adapt safely rather than overwriting working behaviour.