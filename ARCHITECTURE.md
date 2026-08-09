# Safe Lagoon UI — Architecture

Monorepo for `@safelagoon/ui` (component library) and the docs site (`apps/docs`).

```
identity/
├── packages/ui/          @safelagoon/ui — React 19 + Tailwind v4 library
├── apps/docs/            Next.js docs + shadcn registry host (ui.safelagoon.com)
├── registry.json         shadcn registry source → apps/docs/public/r/
├── deploy/               Production nginx + Docker scripts
└── .github/workflows/    CI build/test, npm release, docs deploy
```

## Package tiers

| Tier | Path | Export |
|------|------|--------|
| Brand | `components/brand/` | `@safelagoon/ui` |
| Primitives | `components/ui/` | `@safelagoon/ui` |
| Domain | `components/domain/` | `@safelagoon/ui` |
| Blocks | `blocks/` | `@safelagoon/ui/blocks` |
| Icons | `icons/` | `@safelagoon/ui/icons` |
| Charts / Map | `charts/`, `map/` | subpath exports |

Consumer apps must import `@safelagoon/ui/styles.css` once and add a Tailwind `@source` for `node_modules/@safelagoon/ui/dist`.

## App shell

Portal layouts use `AppShellLayout` + `AppShellPageHeader` from `@safelagoon/ui/blocks`.

```
┌─────────────┬──────────────────────────────────────┐
│  AppSidebar │  AppShellPageHeader (sticky)         │
│  (scroll)   ├──────────────────────────────────────┤
│             │  page content (main scroll)            │
│  profile    │                                      │
└─────────────┴──────────────────────────────────────┘
         AI trigger (top-right) → full-area AiChat popup
```

**Mobile:** sidebar collapses; navigation moves into an inline burger in `AppShellPageHeader` (left of title icon). Burger opens a left `Sheet` drawer with the same nav tree. State is provided by `AppShellNavigationProvider` in `app-shell-navigation-context.tsx`.

**Desktop:** sidebar + main scroll independently (`h-svh overflow-hidden` on shell, `overflow-auto` on `<main>`).

## AiChat

`AiChat` is a domain component for in-shell AI assistance. It supports suggested prompts, streaming-style loading, reasoning blocks, and session history.

### Input

The textarea auto-expands between 56px and 200px while typing and resets to default height after send or session switch.

### Session persistence

Sessions are stored as `AiChatStorageState`:

```ts
{
  version: 1;
  activeSessionId: string;
  sessions: StoredAiChatSession[]; // id, createdAt, updatedAt, summary, messages
}
```

| `storage` prop | Backend | Use when |
|----------------|---------|----------|
| `"local"` (default) | Browser `localStorage` via `sessionStorageKey` | Docs demo, offline-first, no account |
| `"remote"` | App-provided `remoteStorage.load()` / `.save()` | Production portal with server-side history |

**Local:** key defaults to `safelagoon-ai-chat`. Sessions expire after `sessionRetentionDays` (default 30) based on `updatedAt`. Purge runs on load and save.

**Remote:** the host app wires API calls. Typical production mapping against Safe Lagoon AI:

```
Portal (AiChat storage="remote")
  remoteStorage.load()  →  GET  https://safelagoon.com/ai/chat/sessions
  remoteStorage.save()  →  PUT  https://safelagoon.com/ai/chat/sessions

Chat messages (onSend)  →  POST https://safelagoon.com/ai/chat/...  (SSE)
```

The UI library does not call chat endpoints directly — only `onSend` and optional `remoteStorage`. Session cookies from the portal auth flow must be sent by the host app's fetch layer.

**Controlled mode:** when `messages` is passed, persistence is disabled regardless of `storage`.

### Session UI

History button (left of send) opens a popover: **New chat** + scrollable session list. Each row shows relative age (`5w`, `2d`, …) and a one-line summary from the first user message.

## Sheet animations

Left/right drawer sheets use custom CSS in `packages/ui/src/styles/base.css`:

- Open: 333ms ease-out
- Close: 100ms ease-in

Classes: `.sheet-content-left`, `.sheet-content-right`, `.sheet-overlay`.

## Docs site

`apps/docs` is the reference implementation and registry host.

- Dev: `pnpm --filter @safelagoon/docs dev:clean` (port 3000)
- Registry JSON: `pnpm registry:build` → `apps/docs/public/r/{name}.json`
- Production: Docker on port 8083, nginx TLS at `ui.safelagoon.com`

## Release pipeline

1. Add a changeset: `pnpm changeset`
2. Merge / push to `main`
3. CI `release` job: `changeset version` → commit → `changeset publish` → GitHub Release `v{version}`

Requires GitHub secrets: `NPMJS_TOKEN`, `DOCS_HOST`, `DOCS_SSH_KEY`.

## Related services

| Repo | Role |
|------|------|
| `Safe-Lagoon/ui` (this) | Component library + docs |
| `Safe-Lagoon/ai` | Mistral chat API + MCP at `/ai/*` on safelagoon.com |
| `Safe-Lagoon/webapi` | Parent portal REST API (session auth) |

See `ai/docs/ARCHITECTURE.md` for OAuth, chat routes, and Postgres schema (`chat_conversation`, `chat_message`).
