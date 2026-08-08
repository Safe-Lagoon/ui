"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "./button";

export interface CookieConsentProps {
  message: string;
  acceptLabel?: string;
  declineLabel?: string;
  onAccept?: () => void;
  onDecline?: () => void;
  className?: string;
}

export function CookieConsent({
  message,
  acceptLabel = "Accept",
  declineLabel = "Decline",
  onAccept,
  onDecline,
  className,
}: CookieConsentProps) {
  const [visible, setVisible] = React.useState(true);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className={cn(
        "fixed inset-x-4 bottom-4 z-50 mx-auto max-w-4xl rounded-[10px] border border-border-soft bg-background p-6 shadow-lg md:inset-x-auto md:start-1/2 md:-translate-x-1/2 rtl:md:translate-x-1/2",
        className,
      )}
    >
      <p className="text-body-16 text-foreground">{message}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            onAccept?.();
            setVisible(false);
          }}
        >
          {acceptLabel}
        </Button>
        <Button
          variant="tertiary"
          size="sm"
          onClick={() => {
            onDecline?.();
            setVisible(false);
          }}
        >
          {declineLabel}
        </Button>
      </div>
    </div>
  );
}
