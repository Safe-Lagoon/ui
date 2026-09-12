"use client";

import * as React from "react";
import { Menu } from "lucide-react";
import { AndroidBadge, IOSBadge } from "../../icons";
import { cn } from "../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../brand/avatar";
import { Button } from "../brand/button";
import { childOs, type AppSidebarChildProfile } from "./child-profile-switcher";

export interface AppPhoneChromeProps {
  menuButton: React.ReactNode;
  childProfiles?: AppSidebarChildProfile[];
  activeChildProfileId?: string;
  className?: string;
}

function OsBadge({ os }: { os: NonNullable<ReturnType<typeof childOs>> }) {
  if (os === "ios") {
    return <IOSBadge className="size-[22px] shrink-0" aria-label="iOS" />;
  }
  return <AndroidBadge className="size-[22px] shrink-0" aria-label="Android" />;
}

export function AppPhoneChrome({
  menuButton,
  childProfiles,
  activeChildProfileId,
  className,
}: AppPhoneChromeProps) {
  const active = childProfiles?.find((row) => row.id === activeChildProfileId) ?? childProfiles?.[0];
  const os = childOs(active);

  return (
    <header
      data-slot="app-phone-chrome"
      className={cn(
        "flex min-h-[52px] shrink-0 items-center gap-2.5 border-b border-border-soft bg-muted px-3 py-2",
        className,
      )}
    >
      {menuButton}
      {active ? (
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <Avatar className="size-8 shrink-0">
            {active.avatarSrc ? <AvatarImage src={active.avatarSrc} alt="" /> : null}
            <AvatarFallback className="text-[11px] font-bold">
              {active.avatarFallback ?? active.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <span className="min-w-0 truncate text-[18px] font-bold leading-[1.1] tracking-[-0.02em] text-ink">
            {active.name}
          </span>
          {os ? <OsBadge os={os} /> : null}
        </div>
      ) : null}
    </header>
  );
}

export function AppPhoneMenuButton({
  label,
  expanded,
  onClick,
}: {
  label: string;
  expanded?: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      variant="ghost"
      className="size-9 shrink-0 rounded-md border border-border-soft bg-card p-0 shadow-sm hover:bg-background [&_svg]:size-4"
      aria-label={label}
      aria-expanded={expanded}
      onClick={onClick}
    >
      <Menu />
    </Button>
  );
}
