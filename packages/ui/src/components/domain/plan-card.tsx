"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "../brand/button";

export interface PlanCardProps extends React.HTMLAttributes<HTMLElement> {
  name: string;
  price: React.ReactNode;
  periodLabel?: string;
  features?: string[];
  selected?: boolean;
  actionLabel: string;
  onAction?: () => void;
  actionVariant?: "primary" | "outline" | "ghost";
}

export function PlanCard({
  name,
  price,
  periodLabel = "/mo",
  features,
  selected,
  actionLabel,
  onAction,
  actionVariant = "primary",
  className,
  ...props
}: PlanCardProps) {
  return (
    <article
      data-slot="plan-card"
      data-selected={selected ? "" : undefined}
      className={cn(
        "flex flex-col rounded-lg border bg-card p-4 shadow-card",
        selected ? "border-lilac shadow-[0_0_0_2px_var(--color-lilac-soft)]" : "border-border-soft",
        className,
      )}
      {...props}
    >
      <p className="text-[13px] font-semibold text-muted-foreground">{name}</p>
      <p className="mt-1 text-[28px] font-bold tracking-[-0.03em] text-foreground">
        {price}
        {periodLabel ? <span className="text-[14px] font-medium text-muted-foreground">{periodLabel}</span> : null}
      </p>
      {features?.length ? (
        <ul className="mb-3.5 mt-2.5 list-disc space-y-1 ps-4 text-[13px] text-muted-foreground">
          {features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      ) : null}
        <Button
        variant={actionVariant === "outline" ? "outline" : actionVariant === "ghost" ? "outline" : "primary"}
        size={actionVariant === "primary" ? "portal" : "portal-sm"}
        className="mt-auto w-full"
        onClick={onAction}
      >
        {actionLabel}
      </Button>
    </article>
  );
}

export interface AddonRowProps {
  title: string;
  subtitle?: string;
  price: string;
  included?: boolean;
  includedLabel?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function AddonRow({
  title,
  subtitle,
  price,
  included,
  includedLabel = "Included",
  actionLabel = "Add",
  onAction,
}: AddonRowProps) {
  return (
    <div data-slot="addon-row" className="flex items-center gap-3 py-3">
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-semibold text-ink">{title}</p>
        {subtitle ? <p className="mt-0.5 text-[13px] text-muted-foreground">{subtitle}</p> : null}
      </div>
      <span className="shrink-0 text-body-14 text-muted-foreground">{price}</span>
      {included ? (
        <span className="shrink-0 text-[12px] font-bold text-success-strong">{includedLabel}</span>
      ) : (
        <Button variant="outline" size="portal-sm" className="h-8 px-3 text-[12px]" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
