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

function parseTheme(value: string | null | undefined): Theme | null {
  if (value === "light" || value === "dark" || value === "system") return value;
  return null;
}

function readThemeCookie(name: string): Theme | null {
  if (typeof document === "undefined") return null;
  const prefix = `${name}=`;
  const parts = document.cookie.split("; ");
  for (const part of parts) {
    if (part.startsWith(prefix)) return parseTheme(decodeURIComponent(part.slice(prefix.length)));
  }
  return null;
}

function writeThemeCookie(name: string, theme: Theme) {
  if (typeof document === "undefined") return;
  const secure = typeof location !== "undefined" && location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(theme)}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
}

function applyResolvedTheme(resolved: "light" | "dark") {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(resolved);
  root.style.colorScheme = resolved;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", resolved === "dark" ? "#0f1729" : "#ffffff");
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  dir: defaultDir = "ltr",
  storageKey = "safelagoon-ui-theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme;
    return readThemeCookie(storageKey) ?? defaultTheme;
  });
  const [dir, setDirState] = React.useState<"ltr" | "rtl">(defaultDir);
  const [systemTheme, setSystemTheme] = React.useState(getSystemTheme);
  const resolvedTheme = theme === "system" ? systemTheme : theme;

  React.useEffect(() => {
    applyResolvedTheme(resolvedTheme);
  }, [resolvedTheme]);

  React.useEffect(() => {
    document.documentElement.setAttribute("dir", dir);
  }, [dir]);

  React.useEffect(() => {
    if (theme !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setSystemTheme(media.matches ? "dark" : "light");
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [theme]);

  const setTheme = React.useCallback(
    (next: Theme) => {
      writeThemeCookie(storageKey, next);
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
