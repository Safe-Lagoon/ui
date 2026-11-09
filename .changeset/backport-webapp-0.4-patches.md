---
"@safelagoon/ui": minor
---

Back-port the webapp-vendored 0.4.0 hand patches into `packages/ui` source.

**Breaking changes:**

- `ThemeProvider` defaults to `theme="system"` (was `"light"`) and persists the preference in a cookie (`safelagoon-ui-theme`) instead of `localStorage`. Consumers that assumed a light first paint or read `localStorage` must wrap with `defaultTheme` / `storageKey` and read the cookie.
- `DeviceModeControl` default middle label is `"Apply Rules"` (was `"By rules"` / `"Rules"`). Pass `options` to keep the old copy.
- `GeofenceMap` `center` is nullable. Render without a pin until click-to-place (or pass `fallbackCenter`). The map reads `useTheme()` for `colorScheme`, so it must sit under `ThemeProvider`.
- `AndroidBadge` / `IOSBadge` (and `AppPhoneChrome` OS badges) are 16px `currentColor` glyphs. They no longer draw the coloured 24px store-style rectangles (`#3DDC84` / `#1C1C1E`).
- `ChatBubble` always renders `senderLabel` above the bubble (sent included). Received bubbles use `bg-white`. `ConversationView` fills the parent (`min-h-0`) and jumps the Radix viewport instead of `scrollIntoView({ behavior: "smooth" })`.
- `ScreenMirrorViewer` is a fill viewer with a left 88px 9:16 filmstrip. The horizontal strip, `aspect-video` stage, and range progress slider are gone; `timelineLabel` is `sr-only`.
- `SessionFilmstrip` drops the rounded card chrome and is a `flex-1` fill wrapper.
- `FilterChips` adds `mb-[18px]`. Idle counts are plain numbers; only the selected count is a white pill.
- `DotCrumbs` are 16px (was 13px). Ancestor links/buttons are `cursor-pointer` with no underline.
- `ActivityStack` pads empty layers *behind* a single preview (`unshift`, gallery still fills forward). Internet tiles use the apps `fitIcon` treatment (white `#fff` tile, `object-contain`). Stacked layers keep the vendored `LAYER_RING` (`2px solid #fff` + 1px shadow). Proto #5/#7 stand-in rings/layout are not spec.
- `AppNavIcon` is two-tone `#2F77EE` / `#B97CFF` at `size-5`. It no longer uses 18px `currentColor` proto marks.
