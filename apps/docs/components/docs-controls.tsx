"use client";

import { useTheme } from "@safelagoon/ui";
import { Moon, Sun, Languages } from "lucide-react";

const breakpoints = [
  { label: "360", width: "360px" },
  { label: "768", width: "768px" },
  { label: "1024", width: "1024px" },
  { label: "1360", width: "1360px" },
] as const;

export function DocsControls() {
  const { resolvedTheme, setTheme, dir, setDir } = useTheme();

  return (
    <div className="fixed bottom-4 end-4 z-50 flex flex-wrap items-center gap-2 rounded-[10px] border border-border-soft bg-background p-2 shadow-lg">
      <button
        type="button"
        className="rounded-md p-2 hover:bg-muted"
        aria-label="Toggle theme"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
        {resolvedTheme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </button>
      <button
        type="button"
        className="rounded-md p-2 hover:bg-muted"
        aria-label="Toggle direction"
        onClick={() => setDir(dir === "ltr" ? "rtl" : "ltr")}
      >
        <Languages className="size-4" />
      </button>
      {breakpoints.map((bp) => (
        <button
          key={bp.label}
          type="button"
          className="rounded-md px-2 py-1 text-body-14 hover:bg-muted"
          onClick={() => {
            document.documentElement.style.setProperty("--preview-width", bp.width);
          }}
        >
          {bp.label}
        </button>
      ))}
    </div>
  );
}
