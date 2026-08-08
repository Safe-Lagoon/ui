"use client";

import * as React from "react";
import { Ban, Check } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../brand/button";
import { Card, CardContent } from "../brand/card";

export interface AppReviewCardProps {
  icon: React.ReactNode;
  name: string;
  description?: string;
  approveLabel: string;
  blockLabel: string;
  durationLabels: { minutes15: string; minutes30: string; minutes60: string };
  onApprove: (minutes?: number) => void;
  onBlock: () => void;
  className?: string;
}

export function AppReviewCard({
  icon,
  name,
  description,
  approveLabel,
  blockLabel,
  durationLabels,
  onApprove,
  onBlock,
  className,
}: AppReviewCardProps) {
  return (
    <Card className={cn(className)}>
      <CardContent className="space-y-4 p-5">
        <div className="flex items-start gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-border-soft bg-background">
            {icon}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-body-18-semibold text-foreground">{name}</h4>
            {description ? (
              <p className="mt-1 text-body-14 text-muted-foreground">{description}</p>
            ) : null}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="primary" className="gap-2" onClick={() => onApprove()}>
            <Check />
            {approveLabel}
          </Button>
          <Button variant="destructive" className="gap-2" onClick={onBlock}>
            <Ban />
            {blockLabel}
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 border-t border-border-soft pt-4">
          <Button variant="secondary-blue" size="sm" onClick={() => onApprove(15)}>
            {durationLabels.minutes15}
          </Button>
          <Button variant="secondary-blue" size="sm" onClick={() => onApprove(30)}>
            {durationLabels.minutes30}
          </Button>
          <Button variant="secondary-blue" size="sm" onClick={() => onApprove(60)}>
            {durationLabels.minutes60}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
