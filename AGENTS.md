# AGENTS.md — Using `@safelagoon/ui` in Frontend Projects

This document is for AI coding agents integrating Safe Lagoon UI into React frontends (Next.js App Router, Vite, etc.). Read this before writing or modifying consumer-app code.

**Canonical docs:** https://ui.safelagoon.com  
**Source:** https://github.com/Safe-Lagoon/ui  
**npm:** `@safelagoon/ui`

---

## What this library is

`@safelagoon/ui` is a **React 19 + Tailwind CSS v4** component library for Safe Lagoon portals. It is built on shadcn/Radix primitives, restyled to the Figma brandbook.

Components are grouped into tiers:

| Tier | Location in package | Use when |
|------|---------------------|----------|
| **Tier 1 — Brand** | Main export (`@safelagoon/ui`) | Marketing CTAs, branded inputs, header/footer, cards matching brandbook |
| **Tier 2 — Primitives** | Main export | Forms, dialogs, tables, tabs — standard app UI on brand tokens |
| **Tier 3 — Domain** | Main export | Parental-control portal screens (rules, schedules, profiles, logs) |
| **Tier 4 — Heavy** | Subpath exports | Charts (`/charts`), Google Maps geofence (`/map`) |
| **Blocks** | `@safelagoon/ui/blocks` | Full-page layouts and auth flows |
| **Icons** | `@safelagoon/ui/icons` | Brand SVG icons (tree-shakeable) |

**Two consumption modes:**

1. **npm package** (preferred for apps) — import from `@safelagoon/ui`
2. **shadcn registry eject** — copy source into the consumer repo for full customization:
   ```bash
   npx shadcn@latest add @Safe-Lagoon/ui/button
   ```
   Registry JSON is served from `https://ui.safelagoon.com/r/{name}.json`

---

## Hard requirements

Agents MUST follow these when using this library:

1. **React 19+**, **Tailwind CSS v4+** — peer dependencies; do not downgrade.
2. **Import styles once** in the app root CSS — without this, components render unstyled.
3. **Tailwind must scan the package dist** — utility classes inside the library won't generate unless `@source` includes `node_modules/@safelagoon/ui/dist`.
4. **Wrap the app in `ThemeProvider`** — handles light/dark class on `<html>` and `dir` for RTL.
5. **No hardcoded user-facing copy in components you build** — Safe Lagoon ships 13 languages. Pass all labels, placeholders, errors, and button text via props. Library components already follow this; your page code must too.
6. **RTL-safe layout** — use logical Tailwind classes (`ps-`, `pe-`, `ms-`, `me-`, `start-`, `end-`). Never use `pl-`, `pr-`, `ml-`, `mr-`, `left-`, `right-` in new code.
7. **Primary CTA color is lilac, not blue** — `Button variant="primary"` uses lilac. Brand blue is accent/links/secondary actions.

---

## Installation

### npm (production apps)

```bash
npm install @safelagoon/ui
# or
pnpm add @safelagoon/ui
```

Optional bundled fonts (recommended):

```bash
pnpm add @fontsource-variable/ibm-plex-sans @fontsource/ibm-plex-serif
```

### Monorepo / local development

If working inside the `Safe-Lagoon/ui` repo itself:

```bash
pnpm install
pnpm --filter @safelagoon/ui build   # required before consumer apps resolve dist/
pnpm dev                              # docs at localhost:3000
```

In a sibling monorepo, reference via `"@safelagoon/ui": "workspace:*"` and build the ui package first.

---

## Tailwind v4 setup (required)

In the consumer app's global CSS (e.g. `app/globals.css` or `src/index.css`):

```css
@import "tailwindcss";
@import "@safelagoon/ui/styles.css";

/* Scan library class names so Tailwind generates them */
@source "../node_modules/@safelagoon/ui/dist/**/*.{js,ts,tsx}";

/* Also scan your own components */
@source "./app/**/*.{ts,tsx}";
@source "./components/**/*.{ts,tsx}";
```

Adjust `@source` paths relative to your CSS file location.

**Fonts** — add to root layout or entry:

```tsx
import "@fontsource-variable/ibm-plex-sans";
import "@fontsource/ibm-plex-serif";
```

Or load IBM Plex from Google Fonts in `<head>` if you prefer not to bundle fonts.

---

## App shell setup

### Next.js App Router

```tsx
// app/layout.tsx
import { ThemeProvider } from "@safelagoon/ui";
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

### Vite / SPA

```tsx
// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@safelagoon/ui";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light">
      <App />
    </ThemeProvider>
  </StrictMode>,
);
```

### ThemeProvider API

```tsx
<ThemeProvider
  defaultTheme="light"   // "light" | "dark" | "system"
  dir="ltr"                // "ltr" | "rtl" — sets documentElement dir
  storageKey="safelagoon-ui-theme"  // localStorage key for theme preference
>
```

Use `useTheme()` in client components to toggle theme or direction:

```tsx
"use client";
import { useTheme } from "@safelagoon/ui";

function ThemeToggle() {
  const { theme, setTheme, dir, setDir } = useTheme();
  return (
    <>
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>Toggle theme</button>
      <button onClick={() => setDir(dir === "ltr" ? "rtl" : "ltr")}>Toggle RTL</button>
    </>
  );
}
```

Dark mode applies `.dark` on `<html>`. Token overrides live in `packages/ui/src/styles/theme.css`.

---

## Import map

```tsx
// Core — brand, primitives, domain, theme, cn()
import {
  ThemeProvider,
  useTheme,
  cn,
  Button,
  Input,
  Dialog,
  DialogContent,
  LogCard,
  RuleCard,
  ScheduleGrid,
} from "@safelagoon/ui";

// Styles (in CSS, not JS)
import "@safelagoon/ui/styles.css";

// Icons — tree-shake individual exports
import { LogoMark, FeatureGps, ChevronRight } from "@safelagoon/ui/icons";

// Layouts & auth blocks
import { DashboardLayout, SignInForm, BeforeWeStart } from "@safelagoon/ui/blocks";

// Charts — pulls in recharts
import { ScreenTimeChart, CategoryDonut } from "@safelagoon/ui/charts";

// Maps — pulls in @vis.gl/react-google-maps
import { GeofenceMap, MiniMap, LocationPin } from "@safelagoon/ui/map";
```

**Rule:** import `/charts` and `/map` only on pages that need them — keeps bundle size down.

---

## Component selection guide

When implementing a screen, pick the highest-level component that fits before composing primitives.

### Marketing / public pages

```tsx
import { MarketingLayout, Button, CTABlock, Card } from "@safelagoon/ui";
import { MarketingLayout as Layout } from "@safelagoon/ui/blocks";

<Layout
  headerLinks={[{ label: t("nav.pricing"), href: "/pricing" }]}
  footerSections={[...]}
>
  <CTABlock
    title={t("home.cta.title")}
    description={t("home.cta.description")}
    action={<Button>{t("home.cta.button")}</Button>}
  />
</Layout>
```

Brand components: `Header`, `Footer`, `BurgerMenu`, `Card`, `CTABlock`, `CookieConsent`, `Popup`.

### Auth flows

Use blocks — they accept all copy via props:

```tsx
import { AuthLayout, SignInForm } from "@safelagoon/ui/blocks";

<AuthLayout title={t("auth.signIn.title")} subtitle={t("auth.signIn.subtitle")}>
  <SignInForm
    emailLabel={t("auth.email")}
    passwordLabel={t("auth.password")}
    submitLabel={t("auth.signIn.submit")}
    forgotPasswordLabel={t("auth.forgotPassword")}
    onForgotPassword={() => router.push("/forgot-password")}
    onSubmit={handleSignIn}
    emailError={errors.email}
    passwordError={errors.password}
    isLoading={isPending}
  />
</AuthLayout>
```

Also available: `SignUpForm`, `BeforeWeStart` (Android/iOS onboarding steps).

### Parental-control dashboard (cabinet)

```tsx
import { CabinetLayout } from "@safelagoon/ui/blocks";
import { ProfileCard, RuleCard, ScheduleGrid, LogCard, EmptyState } from "@safelagoon/ui";

<CabinetLayout navItems={navItems} activeHref={pathname}>
  {profiles.length === 0 ? (
    <EmptyState
      title={t("profiles.empty.title")}
      description={t("profiles.empty.description")}
      action={<Button>{t("profiles.empty.action")}</Button>}
    />
  ) : (
    profiles.map((p) => (
      <ProfileCard key={p.id} name={p.name} osLabel={p.os} {...} />
    ))
  )}
</CabinetLayout>
```

Domain components map to portal features:

| Component | Portal feature |
|-----------|----------------|
| `LogCard`, `Timeline` | Activity / audit logs |
| `RuleCard` | Screen time & app rules |
| `ScheduleGrid`, `WeekdayPicker`, `TimeLimitSlider` | Schedules & limits |
| `AppTile`, `AppReviewCard`, `CategoryIconPicker` | App management |
| `ProfileCard`, `ProfileCarousel` | Child profiles |
| `GalleryGrid` | Photos / screenshots |
| `AlarmCard`, `ChatBubble` | Alerts & messaging |
| `AvatarUploader` | Profile photo upload |
| `PricingTable`, `LanguageSwitcher` | Billing & locale |
| `Stepper` | Multi-step wizards |

### Data display & forms

Use Tier 2 primitives styled on brand tokens:

```tsx
import {
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage,
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
  Tabs, TabsList, TabsTrigger, TabsContent,
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle,
  Sonner, toast,
} from "@safelagoon/ui";
```

Form helpers integrate **react-hook-form**. Pair with your own zod schemas in the app layer.

Specialized inputs: `SearchInput`, `PasswordInput`, `PhoneInput`, `InputOTP`, `Calendar` (date picker).

Feedback: `Alert`, `Sonner` (toasts), `Spinner`, `BrandedPreloader`, `Skeleton`, `Progress`.

---

## Brand component patterns

### Button

Primary actions use **lilac**. Do not override with brand-blue for main CTAs.

```tsx
<Button variant="primary">{t("save")}</Button>
<Button variant="secondary-lilac">{t("cancel")}</Button>
<Button variant="secondary-blue">{t("learnMore")}</Button>
<Button variant="tertiary">{t("skip")}</Button>
<Button variant="primary" size="sm">{t("mobileCta")}</Button>  {/* 48px on mobile */}
<Button asChild><a href="/pricing">{t("pricing")}</a></Button>
```

Variants: `primary`, `primary-long`, `secondary-lilac`, `secondary-blue`, `tertiary`, plus shadcn-compat `destructive`, `outline`, `ghost`, `link`.

### Input

Brand `Input` (not the shadcn one) supports error state:

```tsx
<Input
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder={t("email.placeholder")}
  error={errors.email}   // shows error styling + message
  disabled={isLoading}
/>
```

### Typography

Use responsive utilities from the design system — do not hardcode `text-[40px]` for headings:

```tsx
<h1 className="text-h1 text-foreground">{title}</h1>
<h1 className="text-h1-serif">{title}</h1>   {/* IBM Plex Serif */}
<h2 className="text-h2">{subtitle}</h2>
<p className="text-body-16 text-muted-foreground">{body}</p>
<p className="text-body-14-semibold">{label}</p>
```

Available: `text-h1`, `text-h1-serif`, `text-h2`, `text-h3`, `text-h3-serif`, `text-h4`, `text-body-{14,16,18,20,24,32}` with weight suffixes (`-medium`, `-semibold`, `-bold`).

### Icons

Prefer brand icons for product features; use `lucide-react` only for generic UI chrome inside Tier 2 primitives.

```tsx
import { FeatureScreenTime, ChevronRight, LogoMark } from "@safelagoon/ui/icons";

<FeatureScreenTime className="size-6 text-brand-blue" aria-hidden />
```

All icons accept `className` and standard SVG props.

---

## Client vs server components

Many exports are `"use client"` modules (Radix wrappers, hooks, interactive domain components).

**Next.js App Router rules:**

- Import interactive components in Client Components (`"use client"` at top of file).
- `ThemeProvider` must wrap client subtrees — put it in `layout.tsx` (layouts can be Server Components that render client children).
- You can import `@safelagoon/ui` from Server Components only for purely presentational exports that don't use hooks — when in doubt, add `"use client"` to the consuming file.

```tsx
"use client";

import { Button, Dialog, DialogContent } from "@safelagoon/ui";
// safe — this file is a Client Component
```

---

## Internationalization (i18n)

Safe Lagoon portals ship **13 languages** including Hebrew (RTL).

**Do:**

```tsx
<Button>{t("common.save")}</Button>
<LogCard
  title={entry.title}
  description={entry.description}
  timestamp={formatDate(entry.at, locale)}
  blockedLabel={t("logs.blocked")}
  icon={<FeatureWeb className="size-5" />}
/>
<EmptyState title={t("empty.title")} description={t("empty.body")} />
```

**Don't:**

```tsx
// BAD — hardcoded English
<Button>Save</Button>
<LogCard blockedLabel="Blocked" ... />
```

Switch RTL via `ThemeProvider` `dir` prop or `useTheme().setDir("rtl")` when locale is Hebrew/Arabic.

---

## Charts subpath (`@safelagoon/ui/charts`)

Requires **recharts** (bundled as dependency of the subpath).

```tsx
"use client";
import { ScreenTimeChart, UsageBar, CategoryDonut, SparkLine } from "@safelagoon/ui/charts";

<ScreenTimeChart
  data={screenTimeByDay}
  xKey="date"
  yKey="minutes"
  label={t("charts.screenTime")}
/>
```

Pass formatted labels and tooltips from the app's i18n layer. Chart colors use brand tokens (`brand-blue`, `lilac`, `green`).

---

## Map subpath (`@safelagoon/ui/map`)

Requires a **Google Maps API key** with Maps JavaScript API enabled.

```tsx
"use client";
import { GeofenceMap } from "@safelagoon/ui/map";

<GeofenceMap
  apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!}
  center={{ lat: 32.0853, lng: 34.7818 }}
  radius={500}
  onCenterChange={setCenter}
  onRadiusChange={setRadius}
  editable
  height={400}
/>
```

Also: `MiniMap` (read-only preview), `LocationPin`.

Never commit API keys — use env vars.

---

## Styling & customization

### Extend, don't fork (unless needed)

Prefer `className` on components (merged via `cn()` / `tailwind-merge`):

```tsx
<Button className="w-full">{t("submit")}</Button>
<Card className="shadow-lg">{children}</Card>
```

### Override design tokens

In consumer CSS, after importing `@safelagoon/ui/styles.css`:

```css
@theme {
  --color-lilac: #c080ff; /* only if product requires it — default matches brandbook */
}
```

Prefer semantic tokens (`bg-primary`, `text-muted-foreground`, `border-border`) over raw brand colors in app code.

### shadcn eject workflow

When the team needs to modify component source:

1. Configure shadcn in the consumer project pointing at the Safe Lagoon registry.
2. `npx shadcn@latest add @Safe-Lagoon/ui/button`
3. Component lands in `components/ui/` (or configured path) — edit freely.
4. Keep `cn()` utility and token CSS imports aligned with the library.

---

## Common page recipes

### List + empty state + loading

```tsx
import { Skeleton, EmptyState, Button } from "@safelagoon/ui";

if (isLoading) return <Skeleton className="h-24 w-full" />;
if (!items.length) return (
  <EmptyState
    title={t("list.empty")}
    description={t("list.emptyHint")}
    action={<Button onClick={onCreate}>{t("list.create")}</Button>}
  />
);
```

### Modal confirm (destructive action)

```tsx
import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent,
  AlertDialogHeader, AlertDialogTitle, AlertDialogDescription,
  AlertDialogFooter, AlertDialogCancel, AlertDialogAction,
  Button,
} from "@safelagoon/ui";

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">{t("delete")}</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>{t("delete.confirmTitle")}</AlertDialogTitle>
      <AlertDialogDescription>{t("delete.confirmBody")}</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
      <AlertDialogAction onClick={onConfirm}>{t("delete.confirm")}</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

### Toast notifications

```tsx
// layout.tsx — add once
import { Toaster } from "@safelagoon/ui";

<ThemeProvider>
  {children}
  <Toaster />
</ThemeProvider>

// anywhere in client code
import { toast } from "@safelagoon/ui";
toast.success(t("saved"));
toast.error(t("error.generic"));
```

---

## Anti-patterns (agents must avoid)

| Anti-pattern | Why | Fix |
|--------------|-----|-----|
| Forgetting `@import "@safelagoon/ui/styles.css"` | Unstyled components | Add to global CSS |
| Missing `@source` for `node_modules/@safelagoon/ui/dist` | Missing Tailwind classes | Add `@source` directive |
| Hardcoded English strings | Breaks i18n | Pass via props / `t()` |
| `pl-4` / `mr-2` in new layout code | Breaks RTL | Use `ps-4` / `me-2` |
| Blue primary buttons | Off-brand | Use `variant="primary"` (lilac) |
| Importing `/map` on every page | Bloats bundle | Lazy-load map routes |
| Duplicating components that exist in the library | Drift from brand | Import from `@safelagoon/ui` |
| Using raw `<input>` for branded forms | Inconsistent states | Use `Input`, `PasswordInput`, etc. |
| Skipping `ThemeProvider` | Dark mode / RTL broken | Wrap app root |

---

## Troubleshooting

### Components look unstyled

1. Confirm `@import "@safelagoon/ui/styles.css"` is in loaded CSS.
2. Confirm `@source "../node_modules/@safelagoon/ui/dist/**/*.{js,ts,tsx}"` path is correct.
3. Rebuild Tailwind / restart dev server.

### `"use client"` / hydration errors in Next.js

Mark the consuming file `"use client"` or split into a client wrapper component.

### Types not found

Ensure `@safelagoon/ui` is built (`dist/` exists). In monorepos run `pnpm --filter @safelagoon/ui build`.

### Registry add fails

```bash
npx shadcn@latest add @Safe-Lagoon/ui/button
```

Requires network access to `ui.safelagoon.com/r/`. Fallback: copy from `packages/ui/src/` in the GitHub repo.

---

## Working in this repository

Repo layout:

```
packages/ui/src/
  components/brand/     # Tier 1
  components/ui/        # Tier 2 (shadcn)
  components/domain/    # Tier 3
  blocks/               # Layouts + auth
  icons/                # SVG React icons
  charts/               # recharts
  map/                  # Google Maps
  styles/               # theme.css, typography.css, base.css
apps/docs/              # Documentation site (reference implementation)
registry.json           # shadcn registry source
```

**Commands:**

```bash
pnpm install
pnpm build                    # ui + docs
pnpm --filter @safelagoon/ui test
pnpm --filter @safelagoon/docs test   # Playwright
pnpm registry:validate
pnpm registry:build           # outputs apps/docs/public/r/
```

When adding a component to the library:

1. Implement under the correct tier directory.
2. Export from `packages/ui/src/index.ts` (or subpath index).
3. Use string props for all user-visible text.
4. Use logical CSS properties for spacing/positioning.
5. Add a docs entry in `apps/docs/lib/doc-pages.ts` and optional demo in `apps/docs/registry/demos/`.
6. Add registry item to `registry.json` if it should be shadcn-installable.

---

## Quick reference — main exports

**Brand (Tier 1):** `Button`, `CloseButton`, `Input`, `Checkbox`, `Slider`, `Tag`, `Header`, `BurgerMenu`, `Footer`, `NavPrev`, `NavNext`, `Card`, `CTABlock`, `Popup`, `Avatar`, `CookieConsent`

**Primitives (Tier 2):** `Label`, `Textarea`, `Select`, `Switch`, `RadioGroup`, `ToggleGroup`, `Dialog`, `AlertDialog`, `Sheet`, `Popover`, `Tooltip`, `DropdownMenu`, `Tabs`, `Accordion`, `Badge`, `Separator`, `ScrollArea`, `Skeleton`, `Progress`, `Table`, `Breadcrumb`, `Pagination`, `Carousel`, `Command`, `HoverCard`, `Collapsible`, `Alert`, `Form`, `Calendar`, `InputOTP`, `Sonner`, `SearchInput`, `PasswordInput`, `PhoneInput`, `Spinner`, `BrandedPreloader`

**Domain (Tier 3):** `LogCard`, `Timeline`, `StatTile`, `ProfileCard`, `ProfileCarousel`, `AppTile`, `RuleCard`, `WeekdayPicker`, `CategoryIconPicker`, `ScheduleGrid`, `TimeLimitSlider`, `AlarmCard`, `AppReviewCard`, `ChatBubble`, `GalleryGrid`, `EmptyState`, `AvatarUploader`, `Stepper`, `PricingTable`, `LanguageSwitcher`

**Blocks:** `MarketingLayout`, `AuthLayout`, `DashboardLayout`, `CabinetLayout`, `SignInForm`, `SignUpForm`, `BeforeWeStart`

**Utils:** `cn`, `ThemeProvider`, `useTheme`

For props and live examples, see https://ui.safelagoon.com/docs.
