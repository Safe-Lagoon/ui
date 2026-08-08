"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { ProfileCard, type ProfileCardProps } from "./profile-card";

export interface ProfileCarouselItem extends Omit<ProfileCardProps, "className"> {
  id: string;
}

export interface ProfileCarouselProps {
  profiles: ProfileCarouselItem[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  className?: string;
}

export function ProfileCarousel({
  profiles,
  selectedId,
  onSelect,
  className,
}: ProfileCarouselProps) {
  return (
    <ScrollArea className={cn("w-full whitespace-nowrap", className)}>
      <div className="flex gap-4 pb-4">
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            {...profile}
            selected={selectedId === profile.id}
            onClick={onSelect ? () => onSelect(profile.id) : profile.onClick}
            className="shrink-0"
          />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
