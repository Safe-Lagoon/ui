"use client";

import * as React from "react";

export type AppShellMode = "phone" | "tablet" | "desktop";

export type AppShellNavigationContextValue = {
  menuButton: React.ReactNode;
  setInlineMenuActive: (active: boolean) => void;
  shellMode: AppShellMode;
};

export const AppShellNavigationContext = React.createContext<AppShellNavigationContextValue | null>(null);

export function useAppShellNavigation() {
  return React.useContext(AppShellNavigationContext);
}

/** Inclusive phone ceiling in px. Proto default; `AppShellLayout.phoneMaxWidth` overrides. */
export const DEFAULT_PHONE_MAX_WIDTH = 430;
/** Inclusive tablet/rail ceiling in px. Not configurable. */
export const TABLET_MAX_WIDTH = 900;

/**
 * Clamp `phoneMaxWidth` so the tablet band (`phoneMaxWidth < width ≤ 900`) cannot be empty.
 * Values ≥ 900 are clamped to 899 and warn.
 */
export function resolvePhoneMaxWidth(phoneMaxWidth = DEFAULT_PHONE_MAX_WIDTH): number {
  if (phoneMaxWidth >= TABLET_MAX_WIDTH) {
    console.warn(
      `[safelagoon-ui] AppShell phoneMaxWidth (${phoneMaxWidth}) must be < ${TABLET_MAX_WIDTH}; clamping to ${TABLET_MAX_WIDTH - 1} so the tablet band is non-empty.`,
    );
    return TABLET_MAX_WIDTH - 1;
  }
  return phoneMaxWidth;
}

/**
 * Map a width to shell mode.
 * @param width Shell or viewport width in px
 * @param phoneMaxWidth Inclusive phone ceiling. Default 430. Clamped to < 900.
 */
export function shellModeFromWidth(
  width: number,
  phoneMaxWidth = DEFAULT_PHONE_MAX_WIDTH,
): AppShellMode {
  const phoneMax = resolvePhoneMaxWidth(phoneMaxWidth);
  if (width <= phoneMax) return "phone";
  if (width <= TABLET_MAX_WIDTH) return "tablet";
  return "desktop";
}
