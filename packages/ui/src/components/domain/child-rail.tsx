"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { cn } from "../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../brand/avatar";
import type { AppSidebarChildProfile } from "./child-profile-switcher";

export interface ChildRailProps {
  profiles: AppSidebarChildProfile[];
  activeProfileId: string;
  onProfileChange: (profileId: string) => void;
  onActiveProfileClick?: (profileId: string) => void;
  onAddChild?: () => void;
  addChildLabel?: string;
  className?: string;
  density?: "full" | "rail";
}

export function ChildRail({
  profiles,
  activeProfileId,
  onProfileChange,
  onActiveProfileClick,
  onAddChild,
  addChildLabel = "Add child",
  className,
  density = "full",
}: ChildRailProps) {
  if (!profiles.length) return null;
  const rail = density === "rail";

  return (
    <div data-slot="child-rail" className={cn("flex flex-col gap-1", className)}>
      {profiles.map((profile) => {
        const active = profile.id === activeProfileId;
        return (
          <button
            key={profile.id}
            type="button"
            data-active={active || undefined}
            className={cn(
              "relative flex w-full items-center rounded-[10px] text-start transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              rail ? "justify-center p-2" : "gap-2.5 px-2.5 py-2",
              active
                ? rail
                  ? "bg-transparent"
                  : "border border-border-soft bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                : "hover:bg-white/55",
              profile.unlinked && "border border-dashed border-border",
            )}
            onClick={() => {
              if (active) onActiveProfileClick?.(profile.id);
              else onProfileChange(profile.id);
            }}
          >
            <span className="relative">
              <Avatar
                className={cn(
                  "size-8 rounded-full bg-brand-blue-soft text-[11px] font-bold text-brand-blue",
                  rail && active && "outline outline-2 outline-offset-2 outline-lilac",
                )}
              >
                {profile.avatarSrc ? <AvatarImage src={profile.avatarSrc} alt={profile.name} /> : null}
                <AvatarFallback className="bg-brand-blue-soft text-[11px] font-bold text-brand-blue">
                  {profile.avatarFallback ?? profile.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              {profile.badgeCount && profile.badgeCount > 0 ? (
                <span className="absolute -end-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-white">
                  {profile.badgeCount}
                </span>
              ) : null}
            </span>
            {rail ? (
              <span className="sr-only">{profile.name}</span>
            ) : (
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-semibold text-ink">{profile.name}</span>
                <span className="block truncate text-[11px] text-muted-foreground">
                  {profile.unlinked ? "Not linked" : profile.device}
                </span>
              </span>
            )}
          </button>
        );
      })}
      {onAddChild ? (
        <button
          type="button"
          className={cn(
            "flex items-center rounded-[10px] text-[13px] font-medium text-brand-blue hover:bg-white/55",
            rail ? "justify-center p-2" : "gap-2 px-2 py-2",
          )}
          onClick={onAddChild}
        >
          <Plus className="size-4" aria-hidden />
          {rail ? <span className="sr-only">{addChildLabel}</span> : addChildLabel}
        </button>
      ) : null}
    </div>
  );
}
