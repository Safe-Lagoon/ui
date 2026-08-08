"use client";

import * as React from "react";
import { Settings, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../brand/button";
import { ScrollArea } from "../ui/scroll-area";

export interface AppNotification {
  id: string;
  title: string;
  preview?: string;
  category?: string;
  timestamp: string;
  read?: boolean;
  icon?: React.ReactNode;
}

export interface NotificationGroup {
  label: string;
  items: AppNotification[];
}

export interface NotificationsPanelProps {
  title?: string;
  groups?: NotificationGroup[];
  settingsLabel?: string;
  onSettingsClick?: () => void;
  onClose?: () => void;
  onNotificationClick?: (notification: AppNotification) => void;
  emptyLabel?: string;
  closeLabel?: string;
  className?: string;
}

function collectReadIds(groups: NotificationGroup[]) {
  return new Set(
    groups.flatMap((group) => group.items.filter((item) => item.read).map((item) => item.id)),
  );
}

export function NotificationsPanel({
  title = "Notifications",
  groups = [],
  settingsLabel = "Notification settings",
  onSettingsClick,
  onClose,
  onNotificationClick,
  emptyLabel = "No notifications yet.",
  closeLabel = "Close notifications",
  className,
}: NotificationsPanelProps) {
  const [readIds, setReadIds] = React.useState(() => collectReadIds(groups));

  React.useEffect(() => {
    setReadIds(collectReadIds(groups));
  }, [groups]);

  const hasNotifications = groups.some((group) => group.items.length > 0);

  const handleNotificationClick = (notification: AppNotification) => {
    setReadIds((current) => {
      if (current.has(notification.id)) return current;
      const next = new Set(current);
      next.add(notification.id);
      return next;
    });
    onNotificationClick?.(notification);
  };

  const isRead = (notification: AppNotification) =>
    notification.read || readIds.has(notification.id);

  return (
    <div className={cn("relative flex min-h-0 flex-col bg-background", className)}>
      <div className="flex shrink-0 items-center justify-between px-6 py-5">
        <h2 className="text-h1 text-foreground">{title}</h2>
        <div className="flex items-center gap-1">
          {onSettingsClick ? (
            <Button variant="ghost" size="icon" className="size-9" aria-label={settingsLabel} onClick={onSettingsClick}>
              <Settings className="size-4" />
            </Button>
          ) : null}
          {onClose ? (
            <Button variant="ghost" size="icon" className="size-9" aria-label={closeLabel} onClick={onClose}>
              <X className="size-4" />
            </Button>
          ) : null}
        </div>
      </div>

      <ScrollArea className="h-0 min-h-0 flex-1">
        <div className="px-6 pb-6">
          {!hasNotifications ? (
            <p className="py-12 text-center text-body-16 text-muted-foreground">{emptyLabel}</p>
          ) : (
            <div className="space-y-8">
              {groups.map((group) =>
                group.items.length > 0 ? (
                  <section key={group.label}>
                    <h3 className="mb-3 text-body-14 font-semibold text-muted-foreground">{group.label}</h3>
                    <ul className="divide-y divide-border-soft rounded-xl border border-border-soft bg-background">
                      {group.items.map((notification) => (
                        <li key={notification.id}>
                          <button
                            type="button"
                            className="flex w-full gap-3 px-4 py-4 text-start transition-colors hover:bg-muted/30"
                            onClick={() => handleNotificationClick(notification)}
                          >
                            {notification.icon ? (
                              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground [&_svg]:size-4">
                                {notification.icon}
                              </span>
                            ) : (
                              <span className="size-10 shrink-0 rounded-full bg-muted" aria-hidden />
                            )}
                            <span className="min-w-0 flex-1">
                              <span className="block text-body-16 font-semibold text-foreground">{notification.title}</span>
                              {notification.preview ? (
                                <span className="mt-1 block line-clamp-2 text-body-14 text-muted-foreground">
                                  {notification.preview}
                                </span>
                              ) : null}
                              {notification.category || notification.timestamp ? (
                                <span className="mt-2 block text-body-14 text-muted-foreground">
                                  {[notification.category, notification.timestamp].filter(Boolean).join(" · ")}
                                </span>
                              ) : null}
                            </span>
                            {!isRead(notification) ? (
                              <span className="mt-2 size-2 shrink-0 rounded-full bg-destructive" aria-hidden />
                            ) : null}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null,
              )}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
