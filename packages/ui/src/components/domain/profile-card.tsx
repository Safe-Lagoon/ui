"use client";

import * as React from "react";
import { Battery, Camera, MapPin, Smartphone } from "lucide-react";
import { cn } from "../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../brand/avatar";
import { Tag } from "../brand/tag";
import { Card, CardContent } from "../brand/card";
import { ImageCropper } from "./avatar-uploader";

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
  onAvatarUpload?: (file: File) => void;
  onAvatarCropComplete?: (dataUrl: string) => void;
  avatarUploadLabel?: string;
  avatarCropTitle?: string;
  avatarCropLabel?: string;
  avatarCropCancelLabel?: string;
  avatarCropZoomLabel?: string;
  className?: string;
}

function ProfileCardAvatar({
  name,
  avatarSrc,
  avatarFallback,
  avatarUploadLabel,
  onAvatarUpload,
  onAvatarCropComplete,
  avatarCropTitle,
  avatarCropLabel,
  avatarCropCancelLabel,
  avatarCropZoomLabel,
}: Pick<
  ProfileCardProps,
  | "name"
  | "avatarSrc"
  | "avatarFallback"
  | "avatarUploadLabel"
  | "onAvatarUpload"
  | "onAvatarCropComplete"
  | "avatarCropTitle"
  | "avatarCropLabel"
  | "avatarCropCancelLabel"
  | "avatarCropZoomLabel"
>) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [cropSrc, setCropSrc] = React.useState<string | null>(null);

  React.useEffect(() => {
    setPreview(null);
  }, [avatarSrc]);

  const uploadEnabled = Boolean(onAvatarUpload && avatarUploadLabel);
  const displaySrc = preview ?? avatarSrc;

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setCropSrc(reader.result as string);
    };
    reader.readAsDataURL(file);
    onAvatarUpload?.(file);
  };

  const handleCrop = (dataUrl: string) => {
    setPreview(dataUrl);
    setCropSrc(null);
    onAvatarCropComplete?.(dataUrl);
  };

  const avatar = (
    <Avatar className="size-16">
      {displaySrc ? <AvatarImage src={displaySrc} alt={name} /> : null}
      <AvatarFallback className="text-body-18-semibold">{avatarFallback}</AvatarFallback>
    </Avatar>
  );

  if (!uploadEnabled) {
    return avatar;
  }

  return (
    <>
      <div className="relative">
        <button
          type="button"
          className={cn(
            "group/avatar relative rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          )}
          aria-label={avatarUploadLabel}
          onClick={(event) => {
            event.stopPropagation();
            inputRef.current?.click();
          }}
        >
          {avatar}
          <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/0 transition-colors group-hover/avatar:bg-black/35">
            <Camera className="size-5 text-white opacity-0 transition-opacity group-hover/avatar:opacity-100" aria-hidden />
          </span>
          <span className="absolute end-0 bottom-0 flex size-7 items-center justify-center rounded-full border-2 border-background bg-brand-blue text-white shadow-sm">
            <Camera className="size-3.5" aria-hidden />
          </span>
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(event) => {
            const file = event.target.files?.[0];
            event.target.value = "";
            if (file) handleFile(file);
          }}
        />
      </div>

      {cropSrc && avatarCropTitle && avatarCropLabel && avatarCropCancelLabel && avatarCropZoomLabel ? (
        <ImageCropper
          src={cropSrc}
          onCrop={handleCrop}
          onCancel={() => setCropSrc(null)}
          title={avatarCropTitle}
          cropLabel={avatarCropLabel}
          cancelLabel={avatarCropCancelLabel}
          zoomLabel={avatarCropZoomLabel}
        />
      ) : null}
    </>
  );
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
  onAvatarUpload,
  onAvatarCropComplete,
  avatarUploadLabel,
  avatarCropTitle,
  avatarCropLabel,
  avatarCropCancelLabel,
  avatarCropZoomLabel,
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
          <ProfileCardAvatar
            name={name}
            avatarSrc={avatarSrc}
            avatarFallback={avatarFallback}
            avatarUploadLabel={avatarUploadLabel}
            onAvatarUpload={onAvatarUpload}
            onAvatarCropComplete={onAvatarCropComplete}
            avatarCropTitle={avatarCropTitle}
            avatarCropLabel={avatarCropLabel}
            avatarCropCancelLabel={avatarCropCancelLabel}
            avatarCropZoomLabel={avatarCropZoomLabel}
          />
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
