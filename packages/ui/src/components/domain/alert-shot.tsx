"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export interface AlertShotProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  src?: string;
  alt?: string;
  title: React.ReactNode;
  meta?: React.ReactNode;
  categories?: string[];
  terms?: string[];
  categoriesLabel?: string;
  termsLabel?: string;
}

export function AlertShot({
  src,
  alt = "",
  title,
  meta,
  categories = [],
  terms = [],
  categoriesLabel = "Categories",
  termsLabel = "Terms",
  className,
  ...props
}: AlertShotProps) {
  return (
    <article
      data-slot="alert-shot"
      className={cn(
        "grid overflow-hidden rounded-[14px] border border-destructive/40 bg-card shadow-[0_1px_2px_rgba(45,44,50,0.06)] md:grid-cols-[minmax(180px,240px)_minmax(0,1fr)]",
        className,
      )}
      {...props}
    >
      <div className="relative aspect-[9/16] min-h-[280px] max-h-[360px] bg-ink md:max-h-none">
        {src ? (
          <img src={src} alt={alt} className="size-full object-contain" />
        ) : (
          <div className="flex size-full items-center justify-center text-[13px] text-white/50">
            blurred screenshot
          </div>
        )}
      </div>
      <div className="space-y-3 border-t border-border-soft p-5 md:border-t-0 md:border-l md:p-6">
        <div>
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
  );
}
