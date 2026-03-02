# Project Overview

Brev.ly web — a React + TypeScript SPA built with Vite and styled with Tailwind CSS v4.

## Tech Stack

| Layer | Tool | Version |
|---|---|---|
| Framework | React | ^19.2.0 |
| Language | TypeScript | ~5.9.3 |
| Build tool | Vite | ^7.3.1 |
| Styling | Tailwind CSS | ^4.2.1 (via `@tailwindcss/vite` plugin) |
| Linting | ESLint | ^9.39.1 |
| Formatting | Prettier | ^3.4.1 (integrated via ESLint) |
| Package manager | pnpm | — |

## Development Commands

```bash
pnpm dev        # Start development server
pnpm build      # Type-check (tsc -b) then bundle (vite build)
pnpm lint       # Run ESLint
pnpm preview    # Preview production build locally
```

## Project Structure

```
src/
  main.tsx          # App entry point
  App.tsx           # Root component
  styles/
    index.css       # Global styles / Tailwind imports
    colors.css      # CSS custom properties for colors
    colors.ts       # Color tokens exported as TS constants
  assets/           # Static assets (SVGs, images)
```

## Code Standards

- Use **functional components** and React hooks only — no class components.
- Use **TypeScript** for all source files (`.ts` / `.tsx`).
- Style exclusively with **Tailwind utility classes**; avoid inline styles and external CSS unless adding global tokens to `src/styles/`.
- ESLint is configured with `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, and `eslint-plugin-prettier`. All lint rules must pass before committing.
- Prettier formatting is enforced through ESLint (`eslint-plugin-prettier`); do not bypass it.
- Linting targets only `**/*.{ts,tsx}` files; the `dist/` directory is ignored.

## Tailwind CSS Notes

- Tailwind v4 is loaded as a Vite plugin (`@tailwindcss/vite`) — there is no separate `tailwind.config.*` file.
- Global CSS lives in `src/styles/index.css`; custom color variables are defined in `src/styles/colors.css`.

## TypeScript Configuration

Three tsconfig files are used:

- `tsconfig.json` — project references root
- `tsconfig.app.json` — app source compilation
- `tsconfig.node.json` — Vite config / Node tooling
