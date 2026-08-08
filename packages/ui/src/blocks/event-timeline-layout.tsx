"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import { Button } from "../components/brand/button";
import { EmptyState } from "../components/domain/empty-state";
import { LogCard } from "../components/domain/log-card";
import { Timeline, TimelineItem } from "../components/domain/timeline";

export type EventTimelineType = {
  id: string;
  label: string;
  icon?: React.ReactNode;
};

export type EventTimelineEntry = {
  id: string;
  type: string;
  timestamp: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  blocked?: boolean;
  blockedLabel?: string;
  screenshot?: string;
  screenshotAlt?: string;
  content?: React.ReactNode;
};

export interface EventTimelineLayoutProps {
  events: EventTimelineEntry[];
  types: EventTimelineType[];
  activeTypes?: string[];
  onActiveTypesChange?: (typeIds: string[]) => void;
  filterLabel?: string;
  clearFiltersLabel?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  blockedLabel?: string;
  renderEvent?: (event: EventTimelineEntry) => React.ReactNode;
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  className?: string;
}

function groupEventsByDate(events: EventTimelineEntry[]) {
  const groups = new Map<string, EventTimelineEntry[]>();
  for (const event of events) {
    const dateKey = event.timestamp.split(",")[0]?.trim() || event.timestamp;
    const bucket = groups.get(dateKey) ?? [];
    bucket.push(event);
    groups.set(dateKey, bucket);
  }
  return Array.from(groups.entries());
}

export function EventTimelineLayout({
  events,
  types,
  activeTypes,
  onActiveTypesChange,
  filterLabel,
  clearFiltersLabel = "Clear",
  emptyTitle,
  emptyDescription,
  blockedLabel = "Blocked",
  renderEvent,
  header,
  sidebar,
  className,
}: EventTimelineLayoutProps) {
  const [internalTypes, setInternalTypes] = React.useState<string[]>([]);
  const selectedTypes = activeTypes ?? internalTypes;
  const setSelectedTypes = onActiveTypesChange ?? setInternalTypes;

  const filteredEvents =
    selectedTypes.length === 0
      ? events
      : events.filter((event) => selectedTypes.includes(event.type));

  const groupedEvents = groupEventsByDate(filteredEvents);

  const toggleType = (typeId: string) => {
    if (selectedTypes.includes(typeId)) {
      setSelectedTypes(selectedTypes.filter((id) => id !== typeId));
    } else {
      setSelectedTypes([...selectedTypes, typeId]);
    }
  };

  const defaultRender = (event: EventTimelineEntry) => {
    if (event.content) return event.content;
    return (
      <LogCard
        icon={event.icon}
        title={event.title}
        description={event.description ?? ""}
        timestamp={event.timestamp}
        screenshot={event.screenshot}
        screenshotAlt={event.screenshotAlt}
        blocked={event.blocked}
        blockedLabel={blockedLabel}
      />
    );
  };

  const render = renderEvent ?? defaultRender;

  return (
    <div className={cn("flex min-h-96 gap-6", className)}>
      {sidebar ? <aside className="hidden w-56 shrink-0 lg:block">{sidebar}</aside> : null}

      <div className="min-w-0 flex-1 space-y-6">
        {header}

        <div className="space-y-3">
          {filterLabel ? (
            <p className="text-body-14-semibold text-foreground">{filterLabel}</p>
          ) : null}
          <div className="flex flex-wrap gap-2">
            {types.map((type) => {
              const active = selectedTypes.includes(type.id);
              return (
                <Button
                  key={type.id}
                  type="button"
                  variant={active ? "primary" : "outline"}
                  size="sm"
                  onClick={() => toggleType(type.id)}
                >
                  {type.icon}
                  {type.label}
                </Button>
              );
            })}
            {selectedTypes.length > 0 ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setSelectedTypes([])}
              >
                {clearFiltersLabel}
              </Button>
            ) : null}
          </div>
        </div>

        {!filteredEvents.length && emptyTitle ? (
          <EmptyState title={emptyTitle} description={emptyDescription} />
        ) : (
          <div className="space-y-8">
            {groupedEvents.map(([dateLabel, dateEvents]) => (
              <section key={dateLabel} aria-label={dateLabel}>
                <h3 className="mb-4 text-body-16-semibold text-foreground">{dateLabel}</h3>
                <Timeline>
                  {dateEvents.map((event, index) => {
                    const typeDef = types.find((type) => type.id === event.type);
                    return (
                      <TimelineItem
                        key={event.id}
                        icon={typeDef?.icon ?? event.icon}
                        isLast={index === dateEvents.length - 1}
                      >
                        <div>{render(event)}</div>
                      </TimelineItem>
                    );
                  })}
                </Timeline>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
