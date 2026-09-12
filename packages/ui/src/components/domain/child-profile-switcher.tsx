"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../brand/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export type ChildOs = "android" | "ios";

export type AppSidebarChildProfile = {
  id: string;
  name: string;
  avatarSrc?: string;
  avatarFallback?: string;
  icon?: React.ReactNode;
  /** Preferred over parsing `device`. */
  os?: ChildOs;
  device?: string;
  badgeCount?: number;
  unlinked?: boolean;
};

export function childOs(profile?: Pick<AppSidebarChildProfile, "os" | "device"> | null): ChildOs | undefined {
  if (!profile) return undefined;
  if (profile.os === "android" || profile.os === "ios") return profile.os;
  const device = (profile.device ?? "").toLowerCase();
  if (device.includes("ios") || device.includes("iphone")) return "ios";
  if (device.includes("android")) return "android";
  return undefined;
}

export interface ChildProfileSwitcherProps {
  profiles: AppSidebarChildProfile[];
  activeProfileId: string;
  onProfileChange: (profileId: string) => void;
  switchLabel?: string;
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  variant?: "default" | "chip";
}

function ProfileAvatar({
  profile,
  className,
}: {
  profile: AppSidebarChildProfile;
  className?: string;
}) {
  if (profile.icon) {
    return (
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-background [&_svg]:size-5",
          className,
        )}
      >
        {profile.icon}
      </span>
    );
  }

  return (
    <Avatar className={cn("size-8 rounded-md", className)}>
      {profile.avatarSrc ? <AvatarImage src={profile.avatarSrc} alt={profile.name} /> : null}
      <AvatarFallback className="rounded-md text-body-14-semibold">
        {profile.avatarFallback ?? profile.name.slice(0, 1)}
      </AvatarFallback>
    </Avatar>
  );
}

export function ChildProfileSwitcher({
  profiles,
  activeProfileId,
  onProfileChange,
  switchLabel = "Switch child profile",
  className,
  open,
  onOpenChange,
  variant = "default",
}: ChildProfileSwitcherProps) {
  const activeProfile = profiles.find((profile) => profile.id === activeProfileId) ?? profiles[0];

  if (!activeProfile || profiles.length === 0) return null;

  const chip = variant === "chip";

  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "group flex items-center text-start transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            chip
              ? "gap-2 rounded-full border border-border-soft bg-card px-2 py-1"
              : "w-full gap-3 rounded-[10px] bg-background px-3 py-2 shadow-sm hover:bg-background data-[state=open]:bg-background",
            className,
          )}
          aria-label={switchLabel}
        >
          <span className="relative">
            <ProfileAvatar profile={activeProfile} className={chip ? "size-7" : undefined} />
            {activeProfile.badgeCount && activeProfile.badgeCount > 0 ? (
              <span className="absolute -end-1 -top-1 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-destructive px-1 text-[9px] font-bold text-white">
                {activeProfile.badgeCount}
              </span>
            ) : null}
          </span>
          <span className="min-w-0 flex-1">
            <span className={cn("block truncate", chip ? "text-[13px] font-semibold" : "text-body-14-semibold")}>
              {activeProfile.name}
            </span>
            {!chip && activeProfile.device ? (
              <span className="block truncate text-[12px] text-muted-foreground">{activeProfile.device}</span>
            ) : null}
          </span>
          <ChevronDown className="size-4 shrink-0 text-muted-foreground" aria-hidden />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {profiles.map((profile) => (
          <DropdownMenuItem
            key={profile.id}
            className="flex cursor-pointer items-center gap-2"
            onSelect={() => onProfileChange(profile.id)}
          >
            <ProfileAvatar profile={profile} className="size-7" />
            <span className="min-w-0 flex-1 truncate">{profile.name}</span>
            {profile.id === activeProfile.id ? <Check className="size-4" aria-hidden /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
