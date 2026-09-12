import * as React from "react";
import { cn } from "../../lib/utils";

export type SectionCardStatusTone = "ok" | "warn" | "danger" | "neutral";

export type SectionCardLink = {
  label: string;
  onClick?: () => void;
  href?: string;
};

export interface MetricRingProps {
  ratio?: number;
  empty?: boolean;
  className?: string;
}

export function MetricRing({ ratio = 0, empty, className }: MetricRingProps) {
  const clamped = Math.max(0, Math.min(1, ratio));
  const deg = empty || clamped <= 0 ? 0 : Math.round(clamped * 360);

  return (
    <span
      aria-hidden
      className={cn("size-[52px] shrink-0 rounded-full", className)}
      style={{
        background:
          empty || deg === 0
            ? "conic-gradient(var(--color-border-soft) 0deg 360deg)"
            : `conic-gradient(var(--color-lilac) 0deg ${deg}deg, var(--color-border-soft) ${deg}deg 360deg)`,
      }}
    >
      <span className="block size-full rounded-full border-[5px] border-transparent bg-card [background-clip:padding-box]" />
    </span>
  );
}

const statusClass: Record<SectionCardStatusTone, string> = {
  ok: "bg-success-soft text-success-strong",
  warn: "bg-warning-soft text-[#b45309]",
  danger: "bg-destructive-soft text-destructive",
  neutral: "bg-muted text-muted-foreground",
};

export interface SectionCardProps extends React.HTMLAttributes<HTMLElement> {
  label: string;
  metric: React.ReactNode;
  caption?: React.ReactNode;
  leading?: React.ReactNode;
  status?: { tone: SectionCardStatusTone; label: string };
  links?: SectionCardLink[];
}

export function SectionCard({
  label,
  metric,
  caption,
  leading,
  status,
  links,
  className,
  ...props
}: SectionCardProps) {
  return (
    <article
      data-slot="section-card"
      className={cn(
        "flex min-h-[140px] flex-col gap-2.5 rounded-lg border border-border-soft bg-card px-4 pb-3.5 pt-4",
        "shadow-card",
        className,
      )}
      {...props}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">{label}</p>
      <div className="flex min-w-0 items-center gap-3">
        {leading}
        <div className="min-w-0">
          <div className="text-[26px] font-bold leading-tight tracking-[-0.02em] text-ink">{metric}</div>
          {caption ? <p className="mt-1 text-[12.5px] text-muted-foreground">{caption}</p> : null}
        </div>
      </div>
      {links?.length || status ? (
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-1">
          {links?.map((link) =>
            link.href && !link.onClick ? (
              <a key={link.label} href={link.href} className="text-[13px] font-semibold text-brand-blue hover:underline">
                {link.label}
              </a>
            ) : (
              <button
                key={link.label}
                type="button"
                className="text-[13px] font-semibold text-brand-blue hover:underline"
                onClick={link.onClick}
              >
                {link.label}
              </button>
            ),
          )}
          {status ? (
            <span
              className={cn(
                "ms-auto inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold",
                statusClass[status.tone],
              )}
            >
              {status.label}
            </span>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
