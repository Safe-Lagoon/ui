import * as React from "react";
import { Battery, MapPin, Smartphone } from "lucide-react";
import { cn } from "../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../brand/avatar";
import { Tag } from "../brand/tag";
import { Card, CardContent } from "../brand/card";

export type ProfileOs = "android" | "ios";

export interface ProfileCardProps {
  avatarSrc?: string;
  avatarFallback: string;
  name: string;
  os: ProfileOs;
  osLabel: string;
  batteryPercent: number;
  batteryLabel: string;
  pin?: string;
  pinLabel?: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function ProfileCard({
  avatarSrc,
  avatarFallback,
  name,
  os,
  osLabel,
  batteryPercent,
  batteryLabel,
  pin,
  pinLabel = "PIN",
  selected = false,
  onClick,
  className,
}: ProfileCardProps) {
  const Comp = onClick ? "button" : "div";

  return (
    <Comp
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "w-full min-w-[200px] text-start",
        onClick && "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
    >
      <Card
        className={cn(
          "transition-colors",
          selected && "border-lilac ring-2 ring-lilac/30",
          onClick && "hover:border-brand-blue",
        )}
      >
        <CardContent className="flex flex-col items-center gap-3 p-4">
          <Avatar className="size-16">
            {avatarSrc ? <AvatarImage src={avatarSrc} alt={name} /> : null}
            <AvatarFallback className="text-body-18-semibold">{avatarFallback}</AvatarFallback>
          </Avatar>
          <div className="w-full text-center">
            <p className="truncate text-body-16-semibold text-foreground">{name}</p>
            <Tag variant="default" size="sm" className="mt-2 gap-1">
              <Smartphone className="size-3.5" />
              {osLabel}
            </Tag>
          </div>
          <div className="flex w-full items-center justify-between gap-2 text-body-14 text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Battery className="size-4" />
              {batteryLabel}: {batteryPercent}%
            </span>
            {pin ? (
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-4" />
                {pinLabel}: {pin}
              </span>
            ) : null}
          </div>
          <span className="sr-only">{os}</span>
        </CardContent>
      </Card>
    </Comp>
  );
}
