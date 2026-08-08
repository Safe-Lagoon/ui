import * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "./button";

export interface CTABlockProps {
  title: string;
  description?: string;
  actionLabel: string;
  onAction?: () => void;
  actionHref?: string;
  className?: string;
}

export function CTABlock({
  title,
  description,
  actionLabel,
  onAction,
  actionHref,
  className,
}: CTABlockProps) {
  return (
    <section
      className={cn(
        "rounded-[10px] bg-gradient-to-r from-brand-blue to-lilac px-8 py-12 text-white md:px-16",
        className,
      )}
    >
      <h2 className="text-h2">{title}</h2>
      {description ? <p className="mt-4 max-w-2xl text-body-20 text-white/90">{description}</p> : null}
      <div className="mt-8">
        {actionHref ? (
          <Button variant="secondary-blue" asChild>
            <a href={actionHref}>{actionLabel}</a>
          </Button>
        ) : (
          <Button variant="secondary-blue" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </div>
    </section>
  );
}
