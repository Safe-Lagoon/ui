# @safelagoon/ui

React 19 component library for [Safe Lagoon](https://safelagoon.com) portals — shadcn/Radix primitives restyled to the Figma brandbook.

**Docs:** [ui.safelagoon.com](https://ui.safelagoon.com) · **Registry:** [shadcn install](https://ui.safelagoon.com)

## Install

```bash
npm install @safelagoon/ui
# or
pnpm add @safelagoon/ui
```

Peer dependencies: **React 19+**, **Tailwind CSS v4+**.

Optional fonts (recommended):

```bash
pnpm add @fontsource-variable/ibm-plex-sans @fontsource/ibm-plex-serif
```

## Quick start

**1. Import styles** in your global CSS:

```css
@import "tailwindcss";
@import "@safelagoon/ui/styles.css";

@source "../node_modules/@safelagoon/ui/dist/**/*.{js,ts,tsx}";
@source "./app/**/*.{ts,tsx}";
```

**2. Wrap the app:**

```tsx
import { ThemeProvider, Button } from "@safelagoon/ui";
import "@fontsource-variable/ibm-plex-sans";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="light" dir="ltr">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

**3. Use components:**

```tsx
import { Button, Input, Dialog, DialogContent } from "@safelagoon/ui";

<Button variant="primary">Save</Button>
```

Primary actions use **lilac** (`variant="primary"`), not blue — per brand guidelines.

## Subpath exports

| Import | Contents |
|--------|----------|
| `@safelagoon/ui` | Brand, primitives, domain components, theme |
| `@safelagoon/ui/styles.css` | Design tokens + base styles |
| `@safelagoon/ui/icons` | Tree-shakeable brand SVG icons |
| `@safelagoon/ui/blocks` | Layouts (`AppShellLayout`, auth forms, marketing) |
| `@safelagoon/ui/charts` | Recharts wrappers (screen time, usage) |
| `@safelagoon/ui/map` | Google Maps geofence components |

Import `/charts` and `/map` only on routes that need them.

## shadcn registry

Install individual components into your repo:

```bash
npx shadcn@latest add @Safe-Lagoon/ui/button
```

Registry JSON: `https://ui.safelagoon.com/r/{name}.json`

## Highlights

- **Brand tier** — `Button`, `Input`, `Header`, `Footer`, `Card`, marketing blocks
- **App shell** — `AppShellLayout`, `AppShellPageHeader`, sidebar, notifications, AI chat panel
- **Domain** — parental-control UI: `RuleCard`, `ScheduleGrid`, `ProfileCard`, `LogCard`, `KpiCard`
- **i18n-ready** — pass all user-visible copy via props; RTL via `ThemeProvider` `dir`
- **Dark mode** — `.dark` on `<html>` through `ThemeProvider`

## Requirements

- React 19+, React DOM 19+
- Tailwind CSS v4+ with `@source` scanning of `node_modules/@safelagoon/ui/dist`
- Next.js App Router or Vite/SPA — mark interactive consumers `"use client"` where needed

## Links

- [Documentation](https://ui.safelagoon.com/docs)
- [GitHub](https://github.com/Safe-Lagoon/ui)
- [Issues](https://github.com/Safe-Lagoon/ui/issues)

## License

MIT © Safe Lagoon Software
