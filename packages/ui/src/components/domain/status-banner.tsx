import * as React from "react";
import { cn } from "../../lib/utils";

export type StatusBannerTone = "danger" | "success" | "warning" | "info";

const toneClass: Record<StatusBannerTone, string> = {
  danger:
    "border-[#f5c4c0] border-l-destructive bg-destructive-soft [&_[data-slot=sb-icon]]:border-[#f5c4c0] [&_[data-slot=sb-icon]]:text-destructive",
  success:
    "border-[#a8e0bf] border-l-success-strong bg-success-soft [&_[data-slot=sb-icon]]:border-[#a8e0bf] [&_[data-slot=sb-icon]]:text-success-strong",
  warning:
    "border-[#f5d48a] border-l-warning bg-warning-soft [&_[data-slot=sb-icon]]:border-[#f5d48a] [&_[data-slot=sb-icon]]:text-[#b45309]",
  info: "border-brand-blue-300 border-l-brand-blue bg-brand-blue-100/60 [&_[data-slot=sb-icon]]:border-brand-blue-300 [&_[data-slot=sb-icon]]:text-brand-blue",
};

export interface StatusBannerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  meta?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  tone?: StatusBannerTone;
  icon?: React.ReactNode;
}

export function StatusBanner({
  title,
  meta,
  actionLabel,
  onAction,
  tone = "danger",
  icon = "!",
  className,
  ...props
}: StatusBannerProps) {
  return (
    <div
      role="status"
      data-slot="status-banner"
      className={cn("mb-5 flex items-center gap-3.5 rounded-lg border border-l-4 px-4 py-3.5", toneClass[tone], className)}
      {...props}
    >
      <div
        data-slot="sb-icon"
        className="flex size-9 shrink-0 items-center justify-center rounded-full border bg-card text-sm font-bold"
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-body-14-semibold text-foreground">{title}</p>
        {meta ? <p className="mt-0.5 text-[12.5px] text-muted-foreground">{meta}</p> : null}
      </div>
      {actionLabel && onAction ? (
        <button
          type="button"
          className="inline-flex h-9 shrink-0 items-center justify-center rounded-md border border-border bg-card px-3.5 text-[13px] font-semibold leading-none text-foreground hover:border-destructive hover:text-destructive"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
