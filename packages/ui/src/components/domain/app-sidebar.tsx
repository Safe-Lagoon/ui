"use client";

import * as React from "react";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  X,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../brand/avatar";
import { Button } from "../brand/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { ChildRail } from "./child-rail";
import {
  ChildProfileSwitcher,
  type AppSidebarChildProfile,
} from "./child-profile-switcher";

export type AppSidebarLink = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  badgeCount?: number;
};

export type AppSidebarGroup = {
  id: string;
  label: string;
  items: AppSidebarLink[];
  defaultOpen?: boolean;
};

export type AppSidebarProfileAction = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  description?: string;
  destructive?: boolean;
  href?: string;
  onClick?: () => void;
};

export type AppSidebarProfile = {
  name: string;
  href?: string;
  avatarSrc?: string;
  avatarFallback?: string;
  notificationCount?: number;
  actions?: AppSidebarProfileAction[];
};

export type { AppSidebarChildProfile };

export type AppSidebarLinkComponentProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
  "aria-current"?: "page" | undefined;
  onClick?: () => void;
};

export interface AppSidebarProps {
  logo?: React.ReactNode;
  topItems?: AppSidebarLink[];
  groups?: AppSidebarGroup[];
  profile: AppSidebarProfile;
  childProfiles?: AppSidebarChildProfile[];
  activeChildProfileId?: string;
  defaultActiveChildProfileId?: string;
  onChildProfileChange?: (profileId: string) => void;
  childProfileSwitchLabel?: string;
  onActiveChildClick?: (profileId: string) => void;
  onAddChild?: () => void;
  addChildLabel?: string;
  onCollapse?: () => void;
  collapseLabel?: string;
  closeVariant?: "collapse" | "close";
  notificationsLabel?: string;
  profileMenuLabel?: string;
  notifications?: React.ReactNode;
  notificationsOpen?: boolean;
  onNotificationsOpenChange?: (open: boolean) => void;
  onNavigate?: () => void;
  LinkComponent?: React.ComponentType<AppSidebarLinkComponentProps>;
  surface?: "muted" | "background";
  className?: string;
  density?: "full" | "rail";
}

function NavLink({
  item,
  LinkComponent,
  onNavigate,
  density = "full",
}: {
  item: AppSidebarLink;
  LinkComponent?: React.ComponentType<AppSidebarLinkComponentProps>;
  onNavigate?: () => void;
  surface?: "muted" | "background";
  density?: "full" | "rail";
}) {
  const rail = density === "rail";
  const className = cn(
    "flex w-full items-center rounded-[10px] transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    rail ? "justify-center px-2.5 py-2.5" : "gap-2.5 px-2.5 py-[9px] text-[13.5px] font-medium",
    item.active
      ? rail
        ? "bg-lilac-soft text-violet"
        : "bg-card text-brand-blue shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
      : "text-fg hover:bg-white/55",
  );

  const content = (
    <>
      {item.icon ? <span className="size-[18px] shrink-0 [&_svg]:size-[18px]">{item.icon}</span> : null}
      {rail ? <span className="sr-only">{item.label}</span> : <span className="truncate">{item.label}</span>}
      {!rail && item.badgeCount && item.badgeCount > 0 ? (
        <span className="ms-auto flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-destructive px-1 text-[11px] font-bold text-white">
          {item.badgeCount}
        </span>
      ) : null}
    </>
  );

  if (item.href && LinkComponent) {
    return (
      <LinkComponent
        href={item.href}
        className={className}
        aria-current={item.active ? "page" : undefined}
        onClick={() => {
          item.onClick?.();
          onNavigate?.();
        }}
      >
        {content}
      </LinkComponent>
    );
  }

  const Comp = item.href ? "a" : "button";
  return (
    <Comp
      {...(item.href
        ? {
            href: item.href,
            onClick: () => {
              item.onClick?.();
              onNavigate?.();
            },
          }
        : {
            type: "button" as const,
            onClick: () => {
              item.onClick?.();
              onNavigate?.();
            },
          })}
      className={className}
      aria-current={item.active ? "page" : undefined}
    >
      {content}
    </Comp>
  );
}

function SidebarGroupSection({
  group,
  defaultOpen,
  LinkComponent,
  onNavigate,
  surface = "muted",
  density = "full",
}: {
  group: AppSidebarGroup;
  defaultOpen: boolean;
  LinkComponent?: React.ComponentType<AppSidebarLinkComponentProps>;
  onNavigate?: () => void;
  surface?: "muted" | "background";
  density?: "full" | "rail";
}) {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="space-y-1">
      <CollapsibleTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex w-full items-center gap-2 rounded-[10px] px-3 py-2 text-body-14 font-medium text-muted-foreground",
            "hover:bg-muted/60 hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          )}
        >
          {open ? (
            <ChevronDown className="size-4 shrink-0" aria-hidden />
          ) : (
            <ChevronRight className="size-4 shrink-0" aria-hidden />
          )}
          <span className="truncate">{group.label}</span>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-0.5 ps-2">
        {group.items.map((item) => (
          <NavLink
            key={item.id}
            item={item}
            LinkComponent={LinkComponent}
            onNavigate={onNavigate}
            surface={surface}
            density={density}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

function ProfileFooter({
  profile,
  notificationsLabel,
  profileMenuLabel,
  notifications,
  notificationsOpen,
  onNotificationsOpenChange,
  onNavigate,
  LinkComponent,
  surface = "muted",
  density = "full",
}: {
  profile: AppSidebarProfile;
  notificationsLabel: string;
  profileMenuLabel: string;
  notifications?: React.ReactNode;
  notificationsOpen?: boolean;
  onNotificationsOpenChange?: (open: boolean) => void;
  onNavigate?: () => void;
  LinkComponent?: React.ComponentType<AppSidebarLinkComponentProps>;
  surface?: "muted" | "background";
  density?: "full" | "rail";
}) {
  const rail = density === "rail";
  const profileClassName = cn(
    "flex min-w-0 items-center rounded-[10px] text-start transition-colors",
    "hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    rail ? "justify-center p-1" : "flex-1 gap-3 px-2 py-2",
  );
  const profileInner = (
    <>
      <Avatar className="size-8 bg-[#dfe6eb] text-[11px] font-bold text-muted-foreground">
        {profile.avatarSrc ? <AvatarImage src={profile.avatarSrc} alt={profile.name} /> : null}
        <AvatarFallback className="bg-[#dfe6eb] text-[11px] font-bold text-muted-foreground">
          {profile.avatarFallback ?? profile.name.slice(0, 1)}
        </AvatarFallback>
      </Avatar>
      {rail ? (
        <span className="sr-only">{profile.name}</span>
      ) : (
        <span className="truncate text-[13px] font-medium text-ink">{profile.name}</span>
      )}
    </>
  );
  const actions = profile.actions ?? [];
  const profileButton =
    profile.href && LinkComponent ? (
      <LinkComponent href={profile.href} className={profileClassName} aria-label={profileMenuLabel} onClick={onNavigate}>
        {profileInner}
      </LinkComponent>
    ) : profile.href ? (
      <a href={profile.href} className={profileClassName} aria-label={profileMenuLabel} onClick={onNavigate}>
        {profileInner}
      </a>
    ) : actions.length ? (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type="button" className={profileClassName} aria-label={profileMenuLabel}>
            {profileInner}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top" align="start" className="w-56">
          {actions.map((action, index) => (
            <React.Fragment key={action.id}>
              {action.destructive && index > 0 ? <DropdownMenuSeparator /> : null}
              <DropdownMenuItem
                className={cn(
                  "flex cursor-pointer items-start gap-2 py-2",
                  action.destructive && "text-destructive focus:text-destructive",
                )}
                onSelect={(event) => {
                  event.preventDefault();
                  action.onClick?.();
                }}
              >
                {action.icon}
                <span className="flex flex-col">
                  <span>{action.label}</span>
                  {action.description ? (
                    <span className="text-body-14 text-muted-foreground">{action.description}</span>
                  ) : null}
                </span>
              </DropdownMenuItem>
            </React.Fragment>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    ) : (
      <div className={profileClassName}>{profileInner}</div>
    );

  return (
    <div
      className={cn(
        rail ? "px-1 py-2" : "mt-auto border-t border-border-soft p-2.5",
        surface === "background" ? "bg-background" : "bg-muted",
      )}
    >
      <div className="flex items-center gap-2">
        {profileButton}

        {notifications && !rail ? (
          <Dialog open={notificationsOpen} onOpenChange={onNotificationsOpenChange}>
            <Button
              variant="ghost"
              size="icon"
              className="relative shrink-0 hover:bg-background"
              aria-label={notificationsLabel}
              onClick={() => onNotificationsOpenChange?.(true)}
            >
              <Bell className="size-5" />
              {profile.notificationCount && profile.notificationCount > 0 ? (
                <span className="absolute end-1.5 top-1.5 size-2 rounded-full bg-destructive" aria-hidden />
              ) : null}
            </Button>
            <DialogContent className="max-w-xl gap-0 overflow-hidden p-0 sm:rounded-[10px] [&>button:last-child]:hidden">
              <DialogTitle className="sr-only">{notificationsLabel}</DialogTitle>
              {notifications}
            </DialogContent>
          </Dialog>
        ) : null}
      </div>
    </div>
  );
}

export function AppSidebar({
  logo,
  topItems = [],
  groups = [],
  profile,
  childProfiles,
  activeChildProfileId: activeChildProfileIdProp,
  defaultActiveChildProfileId,
  onChildProfileChange,
  childProfileSwitchLabel,
  onActiveChildClick,
  onAddChild,
  addChildLabel = "Add child",
  onCollapse,
  collapseLabel = "Collapse sidebar",
  closeVariant = "collapse",
  notificationsLabel = "Notifications",
  profileMenuLabel = "Open profile menu",
  notifications,
  notificationsOpen,
  onNotificationsOpenChange,
  onNavigate,
  LinkComponent,
  surface = "muted",
  className,
  density = "full",
}: AppSidebarProps) {
  const [internalActiveChildProfileId, setInternalActiveChildProfileId] = React.useState(
    defaultActiveChildProfileId ?? childProfiles?.[0]?.id ?? "",
  );

  const activeChildProfileId = activeChildProfileIdProp ?? internalActiveChildProfileId;

  const handleChildProfileChange = (profileId: string) => {
    if (activeChildProfileIdProp === undefined) {
      setInternalActiveChildProfileId(profileId);
    }
    onChildProfileChange?.(profileId);
  };

  return (
    <aside
      data-slot="app-sidebar"
      data-density={density}
      className={cn(
        "flex h-full min-h-0 shrink-0 flex-col",
        density === "rail" ? "w-[var(--rail-w)]" : "w-[var(--sidebar-w)]",
        surface === "background" ? "bg-background" : "bg-muted",
        className,
      )}
    >
      <div className={cn(density === "rail" ? "px-1.5 pb-2 pt-3" : "px-3 pb-3 pt-3")}>
        <div className={cn("flex items-center gap-2", density === "rail" ? "justify-center" : "justify-between")}>
          <div className={cn("min-w-0", density === "rail" ? "flex justify-center" : "flex-1")}>{logo}</div>
          {onCollapse && density !== "rail" ? (
            <button
              type="button"
              onClick={onCollapse}
              aria-label={collapseLabel}
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-[10px] text-muted-foreground transition-colors",
                "hover:bg-background/70 hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              )}
            >
              {closeVariant === "close" ? <X className="size-5" /> : <PanelLeftClose className="size-5" />}
            </button>
          ) : null}
        </div>

        {childProfiles && childProfiles.length > 0 ? (
          <div className="mt-3">
            <ChildRail
              profiles={childProfiles}
              activeProfileId={activeChildProfileId}
              onProfileChange={handleChildProfileChange}
              onActiveProfileClick={onActiveChildClick}
              onAddChild={onAddChild}
              addChildLabel={addChildLabel}
              density={density}
            />
            <ChildProfileSwitcher
              profiles={childProfiles}
              activeProfileId={activeChildProfileId}
              onProfileChange={handleChildProfileChange}
              switchLabel={childProfileSwitchLabel}
              className="sr-only"
            />
          </div>
        ) : null}
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <div className={cn("space-y-4", density === "rail" ? "p-1.5" : "p-3")}>
          {topItems.length > 0 ? (
            <nav className="space-y-0.5" aria-label="Primary">
              {topItems.map((item) => (
                <NavLink
                  key={item.id}
                  item={item}
                  LinkComponent={LinkComponent}
                  onNavigate={onNavigate}
                  surface={surface}
                  density={density}
                />
              ))}
            </nav>
          ) : null}

          {density === "full"
            ? groups.map((group) => (
                <SidebarGroupSection
                  key={group.id}
                  group={group}
                  defaultOpen={group.defaultOpen ?? true}
                  LinkComponent={LinkComponent}
                  onNavigate={onNavigate}
                  surface={surface}
                  density={density}
                />
              ))
            : null}
        </div>
      </ScrollArea>

      <ProfileFooter
        profile={profile}
        notificationsLabel={notificationsLabel}
        profileMenuLabel={profileMenuLabel}
        notifications={notifications}
        notificationsOpen={notificationsOpen}
        onNotificationsOpenChange={onNotificationsOpenChange}
        onNavigate={onNavigate}
        LinkComponent={LinkComponent}
        surface={surface}
        density={density}
      />
    </aside>
  );
}
