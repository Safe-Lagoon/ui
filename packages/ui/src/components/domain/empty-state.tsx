import * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "../brand/button";
import { CTABlock } from "../brand/cta-block";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  secondaryLabel,
  onSecondary,
  className,
}: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border border-border-soft bg-card px-6 py-7 text-center",
        "shadow-card",
        className,
      )}
    >
      {icon ? (
        <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-lilac-soft text-[22px] text-lilac [&_svg]:size-5">
          {icon}
        </div>
      ) : null}
      <h3 className="text-[15px] font-semibold text-ink">{title}</h3>
      {description ? (
        <p className="mt-1.5 max-w-[360px] text-[13px] text-muted-foreground">{description}</p>
      ) : null}
      {actionLabel && onAction ? (
        <Button variant="primary" size="portal-sm" className="mt-4 px-4" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
      {secondaryLabel && onSecondary ? (
        <button
          type="button"
          className="mt-2.5 text-body-14 font-medium text-brand-blue hover:underline"
          onClick={onSecondary}
        >
          {secondaryLabel}
        </button>
      ) : null}
    </div>
  );
}

export interface DenyPosterProps {
  title: string;
  description: string;
  featureList: string[];
  actionLabel: string;
  onAction?: () => void;
  actionHref?: string;
  className?: string;
}

export function DenyPoster({
  title,
  description,
  featureList,
  actionLabel,
  onAction,
  actionHref,
  className,
}: DenyPosterProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <EmptyState title={title} description={description} />
      <ul className="mx-auto max-w-md space-y-2 text-start">
        {featureList.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-body-16 text-muted-foreground">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-lilac" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>
      <CTABlock
        title={title}
        description={description}
        actionLabel={actionLabel}
        onAction={onAction}
        actionHref={actionHref}
      />
    </div>
  );
}
