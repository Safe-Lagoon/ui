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
  avatarSrc?: string;
  avatarFallback?: string;
  notificationCount?: number;
  actions: AppSidebarProfileAction[];
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
}

function NavLink({
  item,
  LinkComponent,
  onNavigate,
  surface = "muted",
}: {
  item: AppSidebarLink;
  LinkComponent?: React.ComponentType<AppSidebarLinkComponentProps>;
  onNavigate?: () => void;
  surface?: "muted" | "background";
}) {
  const className = cn(
    "flex w-full items-center gap-3 rounded-[10px] px-3 py-2 text-body-16 transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    item.active
      ? cn(
          "font-medium text-foreground shadow-sm",
          surface === "background" ? "bg-muted" : "bg-background",
        )
      : cn(
          "text-muted-foreground hover:text-foreground",
          surface === "background" ? "hover:bg-muted/70" : "hover:bg-background/70",
        ),
  );

  const content = (
    <>
      {item.icon ? <span className="size-5 shrink-0 [&_svg]:size-5">{item.icon}</span> : null}
      <span className="truncate">{item.label}</span>
      {item.badgeCount && item.badgeCount > 0 ? (
        <span className="ms-auto size-2 shrink-0 rounded-full bg-destructive" aria-hidden />
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
}: {
  group: AppSidebarGroup;
  defaultOpen: boolean;
  LinkComponent?: React.ComponentType<AppSidebarLinkComponentProps>;
  onNavigate?: () => void;
  surface?: "muted" | "background";
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
  surface = "muted",
}: {
  profile: AppSidebarProfile;
  notificationsLabel: string;
  profileMenuLabel: string;
  notifications?: React.ReactNode;
  notificationsOpen?: boolean;
  onNotificationsOpenChange?: (open: boolean) => void;
  surface?: "muted" | "background";
}) {
  return (
    <div
      className={cn(
        "p-3 shadow-[0_-4px_20px_rgba(45,44,50,0.08)]",
        surface === "background" ? "bg-background" : "bg-muted",
      )}
    >
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className={cn(
                "flex min-w-0 flex-1 items-center gap-3 rounded-[10px] px-2 py-2 text-start transition-colors",
                "hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              )}
              aria-label={profileMenuLabel}
            >
              <Avatar className="size-9">
                {profile.avatarSrc ? (
                  <AvatarImage src={profile.avatarSrc} alt={profile.name} />
                ) : null}
                <AvatarFallback>{profile.avatarFallback ?? profile.name.slice(0, 1)}</AvatarFallback>
              </Avatar>
              <span className="truncate text-body-14-semibold text-foreground">{profile.name}</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="start" className="w-56">
            {profile.actions.map((action, index) => (
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

        {notifications ? (
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
      className={cn(
        "flex h-full min-h-0 w-[280px] shrink-0 flex-col",
        surface === "background" ? "bg-background" : "bg-muted",
        className,
      )}
    >
      <div className="px-3 pb-3 pt-3">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1">{logo}</div>
          {onCollapse ? (
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
              {closeVariant === "close" ? (
                <X className="size-5" />
              ) : (
                <PanelLeftClose className="size-5" />
              )}
            </button>
          ) : null}
        </div>

        {childProfiles && childProfiles.length > 0 ? (
          <div className="mt-3">
            <ChildProfileSwitcher
              profiles={childProfiles}
              activeProfileId={activeChildProfileId}
              onProfileChange={handleChildProfileChange}
              switchLabel={childProfileSwitchLabel}
            />
          </div>
        ) : null}
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <div className="space-y-4 p-3">
          {topItems.length > 0 ? (
            <nav className="space-y-0.5" aria-label="Primary">
              {topItems.map((item) => (
                <NavLink
                  key={item.id}
                  item={item}
                  LinkComponent={LinkComponent}
                  onNavigate={onNavigate}
                  surface={surface}
                />
              ))}
            </nav>
          ) : null}

          {groups.map((group) => (
            <SidebarGroupSection
              key={group.id}
              group={group}
              defaultOpen={group.defaultOpen ?? true}
              LinkComponent={LinkComponent}
              onNavigate={onNavigate}
              surface={surface}
            />
          ))}
        </div>
      </ScrollArea>

      <ProfileFooter
        profile={profile}
        notificationsLabel={notificationsLabel}
        profileMenuLabel={profileMenuLabel}
        notifications={notifications}
        notificationsOpen={notificationsOpen}
        onNotificationsOpenChange={onNotificationsOpenChange}
        surface={surface}
      />
    </aside>
  );
}
