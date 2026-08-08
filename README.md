# Safe Lagoon UI

React component library for Safe Lagoon portals. Built on [shadcn/ui](https://ui.shadcn.com), styled with the [Figma brandbook](https://www.figma.com/design/6oh9nv9KYdFOTXAQ6oVuFw).

## Packages

| Package | Description |
|---------|-------------|
| `@safelagoon/ui` | Core component library |
| `@safelagoon/ui/icons` | Brand icon set |
| `@safelagoon/ui/charts` | Recharts wrappers |
| `@safelagoon/ui/map` | Google Maps geofence components |
| `@safelagoon/ui/blocks` | Layouts and auth forms |

## Quick start

```bash
npm install @safelagoon/ui
```

```tsx
import { ThemeProvider, Button } from "@safelagoon/ui";
import "@safelagoon/ui/styles.css";
```

## Development

```bash
pnpm install
pnpm dev          # docs site at localhost:3000
pnpm build        # build all packages
pnpm test         # run tests
```

## Docs

Documentation microsite: [ui.safelagoon.com](https://ui.safelagoon.com) (deploy from `apps/docs`).

## shadcn registry

```bash
npx shadcn@latest add @Safe-Lagoon/ui/button
```

## License

MIT © Safe Lagoon Software
