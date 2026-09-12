"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { StrokeRow } from "./stroke-row";

export interface HubCardProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "title"> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
}

export function HubCard({ title, subtitle, className, ...props }: HubCardProps) {
  return (
    <StrokeRow
      title={title}
      subtitle={subtitle}
      chevron
      className={cn("rounded-[10px] border border-border-soft shadow-card hover:border-lilac", className)}
      {...props}
    />
  );
}

export function HubGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div data-slot="hub-grid" className={cn("grid gap-2.5", className)}>
      {children}
    </div>
  );
}
