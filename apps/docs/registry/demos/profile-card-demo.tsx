"use client";

import * as React from "react";
import { ProfileCard } from "@safelagoon/ui";

export default function ProfileCardDemo() {
  const [avatarSrc, setAvatarSrc] = React.useState<string>();

  return (
    <ProfileCard
      name="Alex"
      os="android"
      osLabel="Android"
      batteryPercent={78}
      batteryLabel="Battery"
      pin="1234"
      pinLabel="PIN"
      avatarFallback="A"
      avatarSrc={avatarSrc}
      avatarUploadLabel="Upload profile photo"
      avatarCropTitle="Crop profile photo"
      avatarCropLabel="Save photo"
      avatarCropCancelLabel="Cancel"
      avatarCropZoomLabel="Zoom"
      onAvatarUpload={() => undefined}
      onAvatarCropComplete={setAvatarSrc}
    />
  );
}
