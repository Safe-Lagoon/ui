"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { Card, CardContent } from "../brand/card";

export interface AlarmCardProps {
  title: string;
  count: number;
  countLabel?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function AlarmCard({
  title,
  count,
  countLabel,
  children,
  defaultOpen = false,
  className,
}: AlarmCardProps) {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Card className={cn(className)}>
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="flex w-full items-center justify-between gap-3 p-5 text-start transition-colors hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
          >
            <span className="text-body-18-semibold text-foreground">{title}</span>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{countLabel ? `${count} ${countLabel}` : count}</Badge>
              <ChevronDown
                className={cn("size-5 text-muted-foreground transition-transform", open && "rotate-180")}
              />
            </div>
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-3 border-t border-border-soft pt-0">{children}</CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
