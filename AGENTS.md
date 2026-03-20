# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

Trackstar is a front-end-only Next.js 16 MVP (running/training app). All data is mocked in `src/lib/mock-data.ts` — there is no backend, database, or external API integration. No environment variables or secrets are required.

### Commands

Standard commands are documented in `package.json` scripts and `README.md`. Quick reference:

- **Dev server:** `npm run dev` (starts on port 3000, uses Turbopack)
- **Lint:** `npm run lint` (ESLint 9 with next core-web-vitals + TypeScript rules)
- **Build:** `npm run build`
- **Production server:** `npm start` (requires a prior build)

### Notes

- The app code lives on the `cursor/trackstar-mvp-application-0a23` branch; the `main` branch only contains the initial README. Ensure you are working on a branch that has the application code merged in.
- Next.js 16 uses Turbopack by default for `next dev`. First page loads compile on-demand and may take a few seconds.
- No automated tests exist yet (no test framework configured). Validation relies on lint, build, and manual testing.
- The project uses npm (`package-lock.json` is the lockfile). Do not use yarn or pnpm.
