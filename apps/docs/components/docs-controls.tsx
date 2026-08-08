"use client";

import { useTheme } from "@safelagoon/ui";
import { cn } from "@safelagoon/ui";
import { Moon, Sun, Languages } from "lucide-react";
import { useDocsPreview } from "@/components/docs-preview-context";

const breakpoints = [
  { label: "360", width: 360 },
  { label: "768", width: 768 },
  { label: "1024", width: 1024 },
  { label: "1360", width: 1360 },
] as const;

type DocsControlsProps = {
  variant?: "fixed" | "inline";
};

export function DocsControls({ variant = "fixed" }: DocsControlsProps) {
  const { resolvedTheme, setTheme, dir, setDir } = useTheme();
  const preview = useDocsPreview();

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
        aria-pressed={dir === "rtl"}
        onClick={() => setDir(dir === "ltr" ? "rtl" : "ltr")}
      >
        <Languages className="size-4" />
      </button>
      {breakpoints.map((bp) => {
        const active = preview?.previewWidth === bp.width;

        return (
          <button
            key={bp.label}
            type="button"
            aria-label={`Preview at ${bp.label}px`}
            aria-pressed={active}
            className={cn(
              "rounded-md px-2 py-1 text-body-14 hover:bg-muted",
              active && "bg-muted font-medium text-foreground",
            )}
            onClick={() => {
              preview?.setPreviewWidth(active ? null : bp.width);
            }}
          >
            {bp.label}
          </button>
        );
      })}
    </div>
  );
}
