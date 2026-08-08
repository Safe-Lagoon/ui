"use client";

import * as React from "react";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
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
import { ScrollArea } from "../ui/scroll-area";

export type AppSidebarLink = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  active?: boolean;
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

export type AppSidebarLinkComponentProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
  "aria-current"?: "page" | undefined;
};

export interface AppSidebarProps {
  logo?: React.ReactNode;
  topItems?: AppSidebarLink[];
  groups?: AppSidebarGroup[];
  profile: AppSidebarProfile;
  onCollapse?: () => void;
  collapseLabel?: string;
  notificationsLabel?: string;
  profileMenuLabel?: string;
  LinkComponent?: React.ComponentType<AppSidebarLinkComponentProps>;
  className?: string;
}

function NavLink({
  item,
  LinkComponent,
}: {
  item: AppSidebarLink;
  LinkComponent?: React.ComponentType<AppSidebarLinkComponentProps>;
}) {
  const className = cn(
    "flex w-full items-center gap-3 rounded-[10px] px-3 py-2 text-body-16 transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    item.active
      ? "bg-background font-medium text-foreground shadow-sm"
      : "text-muted-foreground hover:bg-background/70 hover:text-foreground",
  );

  const content = (
    <>
      {item.icon ? <span className="size-5 shrink-0 [&_svg]:size-5">{item.icon}</span> : null}
      <span className="truncate">{item.label}</span>
    </>
  );

  if (item.href && LinkComponent) {
    return (
      <LinkComponent href={item.href} className={className} aria-current={item.active ? "page" : undefined}>
        {content}
      </LinkComponent>
    );
  }

  const Comp = item.href ? "a" : "button";
  return (
    <Comp
      {...(item.href ? { href: item.href } : { type: "button" as const, onClick: item.onClick })}
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
}: {
  group: AppSidebarGroup;
  defaultOpen: boolean;
  LinkComponent?: React.ComponentType<AppSidebarLinkComponentProps>;
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
          <NavLink key={item.id} item={item} LinkComponent={LinkComponent} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

function ProfileFooter({
  profile,
  notificationsLabel,
  profileMenuLabel,
}: {
  profile: AppSidebarProfile;
  notificationsLabel: string;
  profileMenuLabel: string;
}) {
  return (
    <div className="border-t border-border-soft p-3">
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

        <Button
          variant="ghost"
          size="icon"
          className="relative shrink-0"
          aria-label={notificationsLabel}
        >
          <Bell className="size-5" />
          {profile.notificationCount && profile.notificationCount > 0 ? (
            <span className="absolute end-1.5 top-1.5 size-2 rounded-full bg-destructive" aria-hidden />
          ) : null}
        </Button>
      </div>
    </div>
  );
}

export function AppSidebar({
  logo,
  topItems = [],
  groups = [],
  profile,
  onCollapse,
  collapseLabel = "Collapse sidebar",
  notificationsLabel = "Notifications",
  profileMenuLabel = "Open profile menu",
  LinkComponent,
  className,
}: AppSidebarProps) {
  return (
    <aside
      className={cn(
        "flex h-full w-[280px] shrink-0 flex-col bg-muted",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-border-soft px-4 py-3">
        <div className="min-w-0 flex-1">{logo}</div>
        {onCollapse ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={onCollapse}
            aria-label={collapseLabel}
            className="shrink-0"
          >
            <PanelLeftClose className="size-5" />
          </Button>
        ) : null}
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-4 p-3">
          {topItems.length > 0 ? (
            <nav className="space-y-0.5" aria-label="Primary">
              {topItems.map((item) => (
                <NavLink key={item.id} item={item} LinkComponent={LinkComponent} />
              ))}
            </nav>
          ) : null}

          {groups.map((group) => (
            <SidebarGroupSection
              key={group.id}
              group={group}
              defaultOpen={group.defaultOpen ?? true}
              LinkComponent={LinkComponent}
            />
          ))}
        </div>
      </ScrollArea>

      <ProfileFooter
        profile={profile}
        notificationsLabel={notificationsLabel}
        profileMenuLabel={profileMenuLabel}
      />
    </aside>
  );
}
