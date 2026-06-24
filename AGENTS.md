# AGENTS.md

## Project Overview

Personal developer portfolio for **Youness El Mesbahy**, built with **Astro 5**, **React 19**, and **Tailwind CSS v4**. Content is managed via Astro content collections loaded from local JSON files. Features a custom "Carbon Fiber + Oregon Blue" design system with dark mode support.

### Tech Stack

| Layer | Technology |
|---|---|
| Framework | Astro 5 |
| UI Library | React 19 (Astro islands) |
| CSS | Tailwind CSS v4 (CSS-based config, no tailwind.config.*) |
| Icons | `@lucide/astro` + `lucide-react` |
| Content | Astro Content Collections (JSON loaders) |
| Language | TypeScript (strict) |
| Formatting | Prettier |

## Quick Start

```bash
npm install
npm run dev          # dev server at localhost:4321
npm run dev:network  # dev server accessible on network
npm run build        # production build → dist/
npm run preview      # preview production build locally
npm run astro        # astro CLI
```

## Project Architecture

```
src/
  assets/              # Static images (my-img.jpeg, younesselmesbahy.jpg)
  components/
    ui/                # Primitive UI components (Button, Card, Modal, Input, etc.)
      *.astro          # Astro variants (static/SSR)
      *.jsx            # React variants (interactive)
    landing-page/      # Page-level section components
      Section.astro    # Reusable section wrapper
      sections/        # Hero, About, Navbar, Projects, Skills, Contact, etc.
        Experience/
          ExperienceEntry.astro
    ContactModal.jsx   # Contact modal
  content.config.ts    # Content collections schema + loaders
  contents/
    portfolio/         # JSON data files per collection
      about/index.json
      education/index.json
      projects/index.json
      skills/index.json
  layouts/
    Layout.astro       # Root HTML layout
  pages/
    index.astro        # Single-page entry point
  styles/
    global.css         # Tailwind v4 import, design tokens, CSS variables
public/
  favicon.png
  favicon.svg
  Youness-El-Mesbahy.pdf    # Resume/CV
```

## Content Management

Content is stored in `src/contents/portfolio/` as JSON files and loaded via Astro Content Collections. Each collection is defined in `src/content.config.ts`.

### Collections

| Collection | File | Key Fields |
|---|---|---|
| `projects` | `src/contents/portfolio/projects/index.json` | `title`, `description`, `imageUrl`, `technologies[]` (`name`, `icon`), `year` |
| `skills` | `src/contents/portfolio/skills/index.json` | `category`, `items[]` (`name`, `icon`) |
| `about` | `src/contents/portfolio/about/index.json` | `headline`, `summary[]` |
| `education` | `src/contents/portfolio/education/index.json` | `startYear`, `endYear` (nullable), `title`, `heading`, `institution`, `location`, `descriptionBlocks[]` (`type: "list"`, `items[]`) |

To query content in Astro components:
```astro
import { getCollection } from "astro:content"
const projects = await getCollection("projects")
```

To add content, edit the corresponding JSON file — the schema is validated at build time.

## Design System

### Tailwind CSS v4

Uses CSS-based config (no `tailwind.config.*`). Configuration lives in `src/styles/global.css`:

```css
@import "tailwindcss";
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));
```

### Custom Color Palette

All custom colors are defined as CSS variables in `:root` and registered via `@theme`:

- **Carbon** (`--color-carbon-*`): Neutral grays from `50` (lightest) to `1800` (darkest)
- **Oregon Blue** (`--color-oregon-blue-*`): Blues from `50` to `1700`
- **Primary** (`--color-primary`): `oregon-blue-900` (light) / `oregon-blue-950` (dark)
- **Milk** (`--color-milk`): Page background

Use Tailwind utility classes: `bg-carbon-900`, `text-oregon-blue-500`, `bg-primary`, etc.

### Dark Mode

Toggled via `data-theme` attribute on `<html>`:
- Light: `<html data-theme="light">`
- Dark: `<html data-theme="dark">`

CSS variables invert for dark mode automatically. Use `dark:` variants in Tailwind.

### Fonts

- **Body**: Open Sans (Google Fonts)
- **Base**: `font-size: 105%` on `html`
- Responsive fallbacks at 408px (90%) and 341px (80%)

### Layout

- `.container-xl`: max-width 1140px, padding 0 8.5%

## Components

### Pattern: Dual Astro/React Files

Interactive components have both `.astro` (static shell) and `.jsx` (React interactive) variants in the same directory:

```
ui/Input.astro    # Static/SSR version
ui/Input.jsx      # Client-interactive React version
```

React components used as Astro islands: `<Input client:load />`

### UI Components (`src/components/ui/`)

| Component | Files | Usage |
|---|---|---|
| `Button` | `.astro`, `.jsx` | Primary/secondary, various sizes |
| `Card` | `.astro` | Project cards |
| `Container` | `.astro` | Width-constrained wrapper |
| `SectionHeader` | `.astro` | Section title + subtitle |
| `Badge` | `.astro` | Small/normal tag badges |
| `Modal` | `.jsx` | Compound: `Modal.Open`, `Modal.Window` |
| `Input` | `.astro`, `.jsx` | Form input field |
| `TextArea` | `.astro`, `.jsx` | Form textarea |
| `ContactF` | `.astro`, `.jsx` | Contact form wrapper |

### Landing Page Sections (`src/components/landing-page/sections/`)

`Hero`, `About`, `Experience`, `Projects`, `Skills`, `Contact`, `ContactForm`, `Navbar`

### Import Conventions

Astro components import from `@lucide/astro`, React components from `lucide-react`:
```astro
import { Github, Linkedin } from "@lucide/astro"
```
```jsx
import { Send } from "lucide-react"
```

## Code Style

### Prettier (`.prettierrc`)

- No semicolons, single quotes, trailing commas (ES5)
- Print width: 100, tab width: 2
- Arrow parens: avoid
- Plugins: `prettier-plugin-astro`, `prettier-plugin-tailwindcss`
- Astro files use `parser: "astro"`

Format command:
```bash
npx prettier --write .
```

While `@trivago/prettier-plugin-sort-imports` is a devDependency, it is **not** configured in `.prettierrc` — do not rely on automatic import sorting.

### TypeScript

- Strict mode (`astro/tsconfigs/strict`)
- `strictNullChecks: true`, `allowJs: true`
- JSX: `react-jsx` with `react` as import source
- Generated types in `.astro/types.d.ts`

### Naming Conventions

- **Files**: PascalCase for components (`Button.astro`, `ContactModal.jsx`)
- **Directories**: PascalCase for component directories
- **Content ID fields**: kebab-case (`technicien-specialise-developpement-digital-web-full-stack`)
- **CSS custom properties**: kebab-case (`--carbon-900`, `--oregon-blue-500`)

## Tests

No test framework is currently configured. When adding tests:
- Use Vitest (natural fit with Astro/Vite ecosystem)
- Place test files co-located with source or in `src/**/*.test.{ts,tsx}`
- Future commands may include `npm run test`

## Build & Deployment

- Build output: `dist/` (gitignored)
- Build command: `npm run build`
- The output is a fully static site (Astro default, no `output: "server"` configured)
- No deployment config or CI/CD pipeline exists yet. Deploy to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages).

## Environment Variables

No `.env` files exist yet. The project uses Web3Forms for contact form submissions (key referenced in `ContactForm.astro`). If needed:
```bash
# .env
PUBLIC_WEB3FORMS_KEY=your-key-here
```

## Installed Agent Skills

The following skills guide agent behavior for this project:

| Skill | Purpose |
|---|---|
| `astrolicious/agent-skills@astro` | Astro CLI, config, patterns |
| `addyosmani/web-quality-skills` | Accessibility, SEO, performance, Core Web Vitals, best practices, audit |
| `pbakaus/impeccable` | Design critique, polish, optimization, animation, typography, color |
| `vercel-labs/agent-skills@vercel-react-best-practices` | React best practices |
| `vercel-labs/agent-skills@web-design-guidelines` | Web design guidelines |
| `coreyhaines31/marketingskills@seo-audit` | SEO auditing |

## Troubleshooting

- After changing content JSON, run `npm run build` to validate schemas
- Generated `.astro/` types may need a rebuild after content config changes
- Tailwind v4: use `@theme` directive in `global.css` for custom tokens, not `tailwind.config.*`
- For Vite config changes, edit the `vite` property in `astro.config.mjs`
