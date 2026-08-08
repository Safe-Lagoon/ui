"use client";

import { useTheme } from "@safelagoon/ui";
import { cn } from "@safelagoon/ui";
import { Moon, Sun, Languages } from "lucide-react";

const breakpoints = [
  { label: "360", width: "360px" },
  { label: "768", width: "768px" },
  { label: "1024", width: "1024px" },
  { label: "1360", width: "1360px" },
] as const;

type DocsControlsProps = {
  variant?: "fixed" | "inline";
};

export function DocsControls({ variant = "fixed" }: DocsControlsProps) {
  const { resolvedTheme, setTheme, dir, setDir } = useTheme();

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-1 rounded-[10px] border border-border-soft bg-background p-1",
        variant === "fixed" && "fixed bottom-4 end-4 z-50 shadow-lg",
        variant === "inline" && "shrink-0 shadow-none",
      )}
    >
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
