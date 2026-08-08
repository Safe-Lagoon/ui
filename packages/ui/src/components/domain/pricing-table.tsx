import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../brand/button";
import { Card } from "../brand/card";
import { Tag } from "../brand/tag";

export interface PricingFeature {
  label: string;
  included: boolean;
}

export interface PricingCardProps {
  name: string;
  price: string;
  periodLabel?: string;
  description?: string;
  features: PricingFeature[];
  highlighted?: boolean;
  badgeLabel?: string;
  actionLabel: string;
  onAction?: () => void;
  actionHref?: string;
  className?: string;
}

export function PricingCard({
  name,
  price,
  periodLabel,
  description,
  features,
  highlighted = false,
  badgeLabel,
  actionLabel,
  onAction,
  actionHref,
  className,
}: PricingCardProps) {
  return (
    <Card
      variant="pricing"
      className={cn(
        "flex h-full flex-col",
        highlighted && "border-lilac ring-2 ring-lilac/30",
        className,
      )}
    >
      {badgeLabel ? (
        <Tag variant="price" className="mx-auto mb-4">
          {badgeLabel}
        </Tag>
      ) : null}
      <h3 className="text-h4 text-foreground">{name}</h3>
      {description ? (
        <p className="mt-2 text-body-16 text-muted-foreground">{description}</p>
      ) : null}
      <div className="my-6">
        <span className="text-h2 text-foreground">{price}</span>
        {periodLabel ? (
          <span className="text-body-16 text-muted-foreground"> / {periodLabel}</span>
        ) : null}
      </div>
      <ul className="mb-8 flex-1 space-y-3 text-start">
        {features.map((feature) => (
          <li
            key={feature.label}
            className={cn(
              "flex items-start gap-2 text-body-16",
              feature.included ? "text-foreground" : "text-muted-foreground line-through",
            )}
          >
            <Check
              className={cn(
                "mt-0.5 size-4 shrink-0",
                feature.included ? "text-green" : "text-border",
              )}
            />
            {feature.label}
          </li>
        ))}
      </ul>
      {actionHref ? (
        <Button variant={highlighted ? "primary" : "secondary-lilac"} asChild className="w-full">
          <a href={actionHref}>{actionLabel}</a>
        </Button>
      ) : (
        <Button
          variant={highlighted ? "primary" : "secondary-lilac"}
          className="w-full"
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </Card>
  );
}

export interface PricingPlan extends Omit<PricingCardProps, "className"> {
  id: string;
}

export interface PricingTableProps {
  plans: PricingPlan[];
  className?: string;
}

export function PricingTable({ plans, className }: PricingTableProps) {
  return (
    <div
      className={cn(
        "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {plans.map((plan) => (
        <PricingCard key={plan.id} {...plan} />
      ))}
    </div>
  );
}
