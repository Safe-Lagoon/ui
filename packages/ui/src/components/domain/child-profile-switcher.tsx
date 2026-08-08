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

export type AppSidebarChildProfile = {
  id: string;
  name: string;
  avatarSrc?: string;
  avatarFallback?: string;
  /** Optional branded icon when no photo is available */
  icon?: React.ReactNode;
};

export interface ChildProfileSwitcherProps {
  profiles: AppSidebarChildProfile[];
  activeProfileId: string;
  onProfileChange: (profileId: string) => void;
  switchLabel?: string;
  className?: string;
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
}: ChildProfileSwitcherProps) {
  const activeProfile = profiles.find((profile) => profile.id === activeProfileId) ?? profiles[0];

  if (!activeProfile || profiles.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "group flex w-full items-center gap-3 rounded-[10px] bg-background px-3 py-2 text-start shadow-sm transition-colors",
            "hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "data-[state=open]:bg-background",
            className,
          )}
          aria-label={switchLabel}
        >
          <ProfileAvatar profile={activeProfile} />
          <span className="min-w-0 flex-1 truncate text-body-16-semibold text-foreground">
            {activeProfile.name}
          </span>
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-background text-muted-foreground shadow-sm">
            <ChevronDown
              className="size-3.5 transition-transform group-data-[state=open]:rotate-180"
              aria-hidden
            />
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={4}
        className="flex w-[var(--radix-dropdown-menu-trigger-width)] flex-col gap-1.5 rounded-[10px] border-border-soft p-1.5 shadow-lg"
      >
        {profiles.map((profile) => {
          const isActive = profile.id === activeProfileId;

          return (
            <DropdownMenuItem
              key={profile.id}
              className={cn(
                "cursor-pointer rounded-[8px] px-3 py-2.5 transition-colors",
                isActive
                  ? "bg-brand-blue-100 focus:bg-brand-blue-100 hover:bg-brand-blue-100"
                  : "hover:bg-brand-blue-100/45 focus:bg-brand-blue-100/45",
              )}
              onSelect={(event) => {
                event.preventDefault();
                onProfileChange(profile.id);
              }}
            >
              <ProfileAvatar profile={profile} />
              <span className="min-w-0 flex-1 truncate text-body-16 text-foreground">{profile.name}</span>
              {isActive ? (
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-green text-white">
                  <Check className="size-3" strokeWidth={3} aria-hidden />
                </span>
              ) : (
                <span className="size-5 shrink-0" aria-hidden />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
