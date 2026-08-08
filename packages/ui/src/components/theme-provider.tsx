"use client";

import * as React from "react";

export type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: "light" | "dark" | "system";
  dir?: "ltr" | "rtl";
  storageKey?: string;
};

type Theme = "light" | "dark" | "system";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark";
  dir: "ltr" | "rtl";
  setDir: (dir: "ltr" | "rtl") => void;
};

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  dir: defaultDir = "ltr",
  storageKey = "safelagoon-ui-theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme;
    return (localStorage.getItem(storageKey) as Theme) ?? defaultTheme;
  });
  const [dir, setDirState] = React.useState<"ltr" | "rtl">(defaultDir);

  const resolvedTheme = theme === "system" ? getSystemTheme() : theme;

  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(resolvedTheme);
    root.setAttribute("dir", dir);
  }, [resolvedTheme, dir]);

  const setTheme = React.useCallback(
    (next: Theme) => {
      localStorage.setItem(storageKey, next);
      setThemeState(next);
    },
    [storageKey],
  );

  const setDir = React.useCallback((next: "ltr" | "rtl") => {
    setDirState(next);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme, dir, setDir }}>
      <div className="safelagoon-ui">{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
