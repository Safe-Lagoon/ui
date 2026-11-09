"use client";

import * as React from "react";
import { AppWindow, Maximize2, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../brand/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

export interface AlertShotProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  src?: string;
  alt?: string;
  title: React.ReactNode;
  icon?: string;
  meta?: React.ReactNode;
  categories?: string[];
  terms?: string[];
  categoriesLabel?: string;
  termsLabel?: string;
  revealLabel?: string;
  expandLabel?: string;
  closeLabel?: string;
}

function AppMark({
  icon,
  iconFailed,
  onIconError,
}: {
  icon?: string;
  iconFailed: boolean;
  onIconError: () => void;
}) {
  if (icon && !iconFailed) {
    return (
      <img
        src={icon}
        alt=""
        data-slot="alert-app-icon"
        className="mb-2.5 size-10 rounded-[10px] bg-muted object-contain"
        onError={onIconError}
      />
    );
  }
  return (
    <div
      data-slot="alert-app-icon-fallback"
      className="mb-2.5 flex size-10 items-center justify-center rounded-[10px] bg-muted text-muted-foreground"
      aria-hidden
    >
      <AppWindow className="size-5" />
    </div>
  );
}

export function AlertShot({
  src,
  alt = "",
  title,
  icon,
  meta,
  categories = [],
  terms = [],
  categoriesLabel = "Categories",
  termsLabel = "Terms",
  revealLabel = "Unblur",
  expandLabel = "Full screen",
  closeLabel = "Close",
  className,
  ...props
}: AlertShotProps) {
  const [revealed, setRevealed] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [iconFailed, setIconFailed] = React.useState(false);
  const toggle = () => setRevealed((value) => !value);
  const hasImage = Boolean(src);

  return (
    <>
      <article
        data-slot="alert-shot"
        data-revealed={revealed ? "true" : "false"}
        data-has-image={hasImage ? "true" : "false"}
        className={cn(
          "grid overflow-hidden rounded-[14px] border border-destructive/40 bg-card shadow-[0_1px_2px_rgba(45,44,50,0.06)]",
          hasImage && "md:grid-cols-[minmax(180px,240px)_minmax(0,1fr)]",
          className,
        )}
        {...props}
      >
        {hasImage ? (
          <div className="relative isolate aspect-[9/16] min-h-[280px] max-h-[360px] overflow-hidden bg-ink md:max-h-none">
            <button
              type="button"
              className="relative size-full cursor-pointer overflow-hidden"
              aria-pressed={revealed}
              aria-label={revealLabel}
              onClick={toggle}
            >
              <img
                src={src}
                alt={alt}
                className={cn(
                  "pointer-events-none size-full object-contain transition-[filter] duration-300",
                  !revealed && "blur-sm",
                )}
              />
              {revealed ? null : (
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span className="rounded-full bg-card px-4 py-2 text-[13px] font-semibold text-ink shadow-lg">
                    {revealLabel}
                  </span>
                </span>
              )}
            </button>
            <button
              type="button"
              className="absolute end-2 top-2 z-10 flex size-8 cursor-pointer items-center justify-center rounded-full bg-card/90 text-ink shadow-md"
              aria-label={expandLabel}
              onClick={() => setOpen(true)}
            >
              <Maximize2 className="size-4" aria-hidden />
            </button>
          </div>
        ) : null}
        <div className={cn("space-y-3 p-5 md:p-6", hasImage && "border-t border-border-soft md:border-t-0 md:border-l")}>
          <div>
            <AppMark icon={icon} iconFailed={iconFailed} onIconError={() => setIconFailed(true)} />
            <h3 className="text-[16px] font-semibold text-destructive">{title}</h3>
            {meta ? <p className="mt-1 text-body-14 text-muted-foreground">{meta}</p> : null}
          </div>
          {categories.length ? (
            <div>
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                {categoriesLabel}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-[#fdecea] px-2.5 py-0.5 text-[12px] font-semibold text-destructive"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
          {terms.length ? (
            <div>
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                {termsLabel}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {terms.map((item) => (
                  <span key={item} className="rounded-full bg-muted px-2.5 py-0.5 text-[12px] font-medium">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </article>
      {src && open ? (
        <Dialog open onOpenChange={(next) => !next && setOpen(false)}>
          <DialogContent className="max-w-[min(96vw,920px)] border-none bg-transparent p-0 shadow-none [&>button:last-child]:hidden">
            <DialogTitle className="sr-only">{alt || revealLabel}</DialogTitle>
            <div className="relative flex items-center justify-center">
              <img src={src} alt={alt} className="max-h-[90vh] w-full rounded-[10px] object-contain" />
              <Button
                variant="ghost"
                size="icon"
                className="absolute end-2 top-2 bg-background/80"
                aria-label={closeLabel}
                onClick={() => setOpen(false)}
              >
                <X />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  );
}
