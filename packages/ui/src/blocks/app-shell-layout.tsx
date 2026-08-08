"use client";

import * as React from "react";
import { Menu } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "../components/brand/button";
import {
  AppSidebar,
  type AppSidebarGroup,
  type AppSidebarLink,
  type AppSidebarLinkComponentProps,
  type AppSidebarProfile,
} from "../components/domain/app-sidebar";

export interface AppShellLayoutProps {
  logo?: React.ReactNode;
  topItems?: AppSidebarLink[];
  groups?: AppSidebarGroup[];
  profile: AppSidebarProfile;
  children: React.ReactNode;
  /** @deprecated Use AppShellPageHeader inside children instead */
  header?: React.ReactNode;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  collapseLabel?: string;
  expandLabel?: string;
  notificationsLabel?: string;
  profileMenuLabel?: string;
  LinkComponent?: React.ComponentType<AppSidebarLinkComponentProps>;
  className?: string;
}

export function AppShellLayout({
  logo,
  topItems,
  groups,
  profile,
  children,
  header,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
  collapseLabel = "Collapse sidebar",
  expandLabel = "Expand sidebar",
  notificationsLabel = "Notifications",
  profileMenuLabel = "Open profile menu",
  LinkComponent,
  className,
}: AppShellLayoutProps) {
  const [internalCollapsed, setInternalCollapsed] = React.useState(defaultCollapsed);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const collapsed = collapsedProp ?? internalCollapsed;
  const setCollapsed = onCollapsedChange ?? setInternalCollapsed;

  const sidebar = (
    <AppSidebar
      logo={logo}
      topItems={topItems}
      groups={groups}
      profile={profile}
      onCollapse={() => setCollapsed(true)}
      collapseLabel={collapseLabel}
      notificationsLabel={notificationsLabel}
      profileMenuLabel={profileMenuLabel}
      LinkComponent={LinkComponent}
      className="h-full border-0"
    />
  );

  const openNavigation = () => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setMobileOpen(true);
    } else {
      setCollapsed(false);
    }
  };

  return (
    <div className={cn("flex min-h-svh bg-muted", className)}>
      {!collapsed ? <div className="hidden shrink-0 lg:flex">{sidebar}</div> : null}

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative flex h-full w-[280px] flex-col bg-muted shadow-lg">{sidebar}</div>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col p-0.5">
        <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-[10px] border border-border-soft bg-background">
          <div className="absolute start-3 top-3 z-10 flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={cn(!collapsed && "lg:hidden")}
              aria-label={expandLabel}
              onClick={openNavigation}
            >
              <Menu />
            </Button>
            {header}
          </div>

          <main
            className={cn(
              "flex-1 overflow-auto p-6",
              "max-lg:pt-16",
              collapsed && "lg:pt-16",
            )}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
