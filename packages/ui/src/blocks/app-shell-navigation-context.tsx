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

export function shellModeFromWidth(width: number): AppShellMode {
  if (width <= 430) return "phone";
  if (width <= 900) return "tablet";
  return "desktop";
}
