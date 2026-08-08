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
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-[10px] border border-dashed border-border-soft bg-muted/20 px-6 py-16 text-center",
        className,
      )}
    >
      {icon ? (
        <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-brand-blue-100 text-brand-blue">
          {icon}
        </div>
      ) : null}
      <h3 className="text-h4 text-foreground">{title}</h3>
      {description ? (
        <p className="mt-2 max-w-md text-body-16 text-muted-foreground">{description}</p>
      ) : null}
      {actionLabel && onAction ? (
        <Button variant="primary" className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
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
