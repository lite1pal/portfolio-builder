# React + TypeScript + Vite

# Portfolio Builder

A small, focused React app for building and previewing a personal portfolio profile.  
Right now the main feature is a profile form (e.g. name, bio, GitHub URL) with simple, reusable validation, built on a clean, extensible architecture.

## Tech Stack

- **Framework:** React + Vite (TypeScript)
- **Styling:** Tailwind CSS + DaisyUI
- **Forms:** `react-hook-form`
- **Tooling:** ESLint, TypeScript

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- `pnpm` installed globally

```bash
npm install -g pnpm
```

### Install dependencies

```bash
pnpm install
```

### Run the dev server

```bash
pnpm dev
```

Vite will start a dev server (by default on `http://localhost:5173`).

### Build for production

```bash
pnpm build
```

### Preview the production build

```bash
pnpm preview
```

## Project Structure

Current high‑level structure:

```text
.
├─ public/                     # Static assets
├─ src/
│  ├─ assets/                  # Images, icons, etc.
│  ├─ components/
│  │  └─ ProfileForm.tsx       # Main profile form UI
│  ├─ lib/
│  │  └─ urlValidators.ts      # Reusable URL validation helpers
│  ├─ types/
│  │  └─ ProfileFormType.ts    # Shared form typings
│  ├─ App.tsx                  # App shell and layout
│  ├─ main.tsx                 # React entry point
│  └─ index.css                # Global styles & Tailwind setup
├─ eslint.config.js
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
├─ vite.config.ts
└─ package.json
```

## Architectural Notes

- **Feature‑oriented direction**  
  The profile form is currently the main feature. As the app grows, related logic (form UI, validation, hooks, services) can be grouped under feature folders, for example `src/features/profile/`.

- **Typed domain model**  
  Shared types for the profile form live in `src/types` so UI components and validation share the same contracts.

- **Validation**  
  Reusable validators (like the GitHub URL validator) live in `src/lib/urlValidators.ts`. They are:

  - pure functions
  - easy to test
  - intended to be composed into form logic (e.g. in `ProfileForm`).

- **Styling**  
  Layout and spacing use Tailwind utility classes. DaisyUI is used for higher‑level UI patterns and consistent styling of common components.

## Development Guidelines

- **Components**

  - Keep components small and focused.
  - Use domain‑specific components for feature logic (e.g. profile‑related UI) and keep generic primitives reusable.

- **Styling**

  - Prefer Tailwind utilities for layout and spacing.
  - Use DaisyUI for consistent component styling where it makes sense.

- **Validation**

  - Prefer reusable, typed validators in `src/lib` (e.g. `validateGithubUrl`).
  - Keep validation logic independent from React so it can be unit tested easily.

- **Testing (planned)**
  - Colocate tests with code (e.g. `src/lib/urlValidators.test.ts` next to `src/lib/urlValidators.ts`).
  - Start with:
    - unit tests for URL validators
    - basic behavior tests for `ProfileForm` (valid vs invalid GitHub URLs).

## Roadmap / Next Steps

- Add unit tests for `urlValidators` and the profile form.
- Introduce a `features/` structure to group profile and future features (projects, skills, contact).
- Add persistent storage for generated portfolios (local storage or backend).
- Extend the UI with more portfolio sections and a live preview mode.

## License

Personal project; no explicit license specified yet.
