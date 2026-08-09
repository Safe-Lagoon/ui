"use client";

import { useTheme, cn } from "@safelagoon/ui";
import { Languages, Moon, SlidersHorizontal, Sun, X } from "lucide-react";
import { useState } from "react";
import { useDocsPreview } from "@/components/docs-preview-context";

const breakpoints = [
  { label: "360", width: 360 },
  { label: "768", width: 768 },
  { label: "1024", width: 1024 },
  { label: "1360", width: 1360 },
] as const;

export function DocsControls() {
  const { resolvedTheme, setTheme, dir, setDir } = useTheme();
  const preview = useDocsPreview();
  const [expanded, setExpanded] = useState(false);

  const panel = (
    <>
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
    </>
  );

  return (
    <>
      <button
        type="button"
        className={cn(
          "fixed bottom-4 end-4 z-50 flex size-10 items-center justify-center rounded-[10px] border border-border-soft bg-background shadow-lg transition-opacity",
          expanded && "pointer-events-none opacity-0",
        )}
        aria-label="Open preview controls"
        aria-expanded={expanded}
        onClick={() => setExpanded(true)}
      >
        <SlidersHorizontal className="size-4" aria-hidden />
      </button>

      {expanded ? (
        <div className="fixed bottom-4 end-4 z-50 flex max-w-[calc(100vw-2rem)] flex-wrap items-center gap-1 rounded-[10px] border border-border-soft bg-background p-1 shadow-lg">
          {panel}
          <button
            type="button"
            className="rounded-md p-2 hover:bg-muted"
            aria-label="Close preview controls"
            onClick={() => setExpanded(false)}
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>
      ) : null}
    </>
  );
}
