"use client";

import { Button, toast } from "@safelagoon/ui";

export default function ToastDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="primary"
        onClick={() =>
          toast.success("Settings saved", {
            description: "Screen time limits were updated for all profiles.",
          })
        }
      >
        Success
      </Button>
      <Button
        variant="secondary-blue"
        onClick={() =>
          toast.info("Sync in progress", {
            description: "Device rules will refresh in a few seconds.",
          })
        }
      >
        Info
      </Button>
      <Button
        variant="secondary-lilac"
        onClick={() =>
          toast.warning("Approaching daily limit", {
            description: "Emma has 15 minutes of screen time left today.",
          })
        }
      >
        Warning
      </Button>
      <Button
        variant="destructive"
        onClick={() =>
          toast.error("Could not save rule", {
            description: "Check your connection and try again.",
          })
        }
      >
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast("New login detected", {
            description: "Your account was accessed from Chrome on macOS.",
            action: {
              label: "Review",
              onClick: () => toast.dismiss(),
            },
          })
        }
      >
        With action
      </Button>
    </div>
  );
}
