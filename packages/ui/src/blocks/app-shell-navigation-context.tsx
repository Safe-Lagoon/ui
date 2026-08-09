"use client";

import * as React from "react";

export type AppShellNavigationContextValue = {
  menuButton: React.ReactNode;
  setInlineMenuActive: (active: boolean) => void;
};

export const AppShellNavigationContext = React.createContext<AppShellNavigationContextValue | null>(null);

export function useAppShellNavigation() {
  return React.useContext(AppShellNavigationContext);
}
