"use client";

import * as React from "react";
import { Menu } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "../components/brand/button";
import { AiChatTrigger } from "../components/domain/ai-chat-trigger";
import {
  AppSidebar,
  type AppSidebarChildProfile,
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
  childProfiles?: AppSidebarChildProfile[];
  activeChildProfileId?: string;
  defaultActiveChildProfileId?: string;
  onChildProfileChange?: (profileId: string) => void;
  childProfileSwitchLabel?: string;
  children: React.ReactNode;
  /** @deprecated Use AppShellPageHeader inside children instead */
  header?: React.ReactNode;
  aiChat?: React.ReactNode;
  aiChatOpen?: boolean;
  defaultAiChatOpen?: boolean;
  onAiChatOpenChange?: (open: boolean) => void;
  openAiChatLabel?: string;
  notifications?: React.ReactNode;
  notificationsOpen?: boolean;
  defaultNotificationsOpen?: boolean;
  onNotificationsOpenChange?: (open: boolean) => void;
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
  childProfiles,
  activeChildProfileId,
  defaultActiveChildProfileId,
  onChildProfileChange,
  childProfileSwitchLabel,
  children,
  header,
  aiChat,
  aiChatOpen: aiChatOpenProp,
  defaultAiChatOpen = false,
  onAiChatOpenChange,
  openAiChatLabel = "Open AI assistant",
  notifications,
  notificationsOpen: notificationsOpenProp,
  defaultNotificationsOpen = false,
  onNotificationsOpenChange,
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
  const [internalAiChatOpen, setInternalAiChatOpen] = React.useState(defaultAiChatOpen);
  const [internalNotificationsOpen, setInternalNotificationsOpen] = React.useState(defaultNotificationsOpen);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const collapsed = collapsedProp ?? internalCollapsed;
  const setCollapsed = onCollapsedChange ?? setInternalCollapsed;
  const aiChatOpen = aiChatOpenProp ?? internalAiChatOpen;
  const setAiChatOpen = onAiChatOpenChange ?? setInternalAiChatOpen;
  const notificationsOpen = notificationsOpenProp ?? internalNotificationsOpen;
  const setNotificationsOpen = onNotificationsOpenChange ?? setInternalNotificationsOpen;

  const openAiChat = React.useCallback(() => {
    setNotificationsOpen(false);
    setAiChatOpen(true);
  }, [setAiChatOpen, setNotificationsOpen]);

  const handleNotificationsOpenChange = React.useCallback(
    (open: boolean) => {
      if (open) setAiChatOpen(false);
      setNotificationsOpen(open);
    },
    [setAiChatOpen, setNotificationsOpen],
  );

  const renderedNotifications =
    notifications && React.isValidElement(notifications)
      ? React.cloneElement(notifications, {
          onClose: () => {
            setNotificationsOpen(false);
            (notifications.props as { onClose?: () => void }).onClose?.();
          },
          className: cn("max-h-[min(70vh,640px)]", (notifications.props as { className?: string }).className),
        } as Record<string, unknown>)
      : notifications;

  const sidebar = (
    <AppSidebar
      logo={logo}
      topItems={topItems}
      groups={groups}
      profile={profile}
      childProfiles={childProfiles}
      activeChildProfileId={activeChildProfileId}
      defaultActiveChildProfileId={defaultActiveChildProfileId}
      onChildProfileChange={onChildProfileChange}
      childProfileSwitchLabel={childProfileSwitchLabel}
      onCollapse={() => setCollapsed(true)}
      collapseLabel={collapseLabel}
      notificationsLabel={notificationsLabel}
      profileMenuLabel={profileMenuLabel}
      notifications={renderedNotifications}
      notificationsOpen={notificationsOpen}
      onNotificationsOpenChange={notifications ? handleNotificationsOpenChange : undefined}
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

  const renderedAiChat =
    aiChat && React.isValidElement(aiChat)
      ? React.cloneElement(aiChat, {
          onClose: () => {
            setAiChatOpen(false);
            (aiChat.props as { onClose?: () => void }).onClose?.();
          },
        } as Record<string, unknown>)
      : aiChat;

  const overlayOpen = aiChatOpen && aiChat;

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

      <div className="flex min-h-0 min-w-0 flex-1 flex-col p-0.5">
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

          {aiChat && !aiChatOpen ? (
            <div className="absolute end-3 top-3 z-10">
              <AiChatTrigger label={openAiChatLabel} onClick={openAiChat} />
            </div>
          ) : null}

          <main
            className={cn(
              "flex min-h-0 flex-1 flex-col",
              overlayOpen ? "overflow-hidden p-0" : "overflow-auto p-6 max-lg:pt-16",
              !overlayOpen && collapsed && "lg:pt-16",
            )}
          >
            {aiChatOpen && aiChat ? renderedAiChat : children}
          </main>
        </div>
      </div>
    </div>
  );
}
