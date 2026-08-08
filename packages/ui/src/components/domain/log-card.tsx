import * as React from "react";
import { ShieldBan } from "lucide-react";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../brand/card";

export interface LogCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  timestamp: string;
  screenshot?: string;
  screenshotAlt?: string;
  blocked?: boolean;
  blockedLabel?: string;
  className?: string;
}

export function LogCard({
  icon,
  title,
  description,
  timestamp,
  screenshot,
  screenshotAlt = "",
  blocked = false,
  blockedLabel = "Blocked",
  className,
}: LogCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="flex gap-4 p-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-brand-blue-100 text-brand-blue">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h4 className="text-body-16-semibold text-foreground">{title}</h4>
            <time className="shrink-0 text-body-14 text-muted-foreground">{timestamp}</time>
          </div>
          <p className="mt-1 text-body-14 text-muted-foreground">{description}</p>
          {blocked ? (
            <Badge variant="destructive" className="mt-2 gap-1">
              <ShieldBan className="size-3" />
              {blockedLabel}
            </Badge>
          ) : null}
          {screenshot ? (
            <img
              src={screenshot}
              alt={screenshotAlt}
              className="mt-3 max-h-40 w-full rounded-[10px] border border-border-soft object-cover"
            />
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
