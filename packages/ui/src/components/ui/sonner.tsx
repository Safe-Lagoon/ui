"use client";

import * as React from "react";
import { Toaster as Sonner, toast } from "sonner";
import { useTheme } from "../theme-provider";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <Sonner
      theme={resolvedTheme}
      className="toaster group"
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border-soft group-[.toaster]:shadow-lg group-[.toaster]:rounded-[10px] group-[.toaster]:border",
          title: "group-[.toast]:text-body-16-semibold group-[.toast]:text-foreground",
          description: "group-[.toast]:text-body-14 group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-lilac group-[.toast]:text-white group-[.toast]:rounded-[10px]",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:rounded-[10px]",
          closeButton:
            "group-[.toast]:border-border-soft group-[.toast]:bg-background group-[.toast]:text-muted-foreground",
          success: "group-[.toast]:border-green/30 [&>svg]:text-green",
          error: "group-[.toast]:border-destructive/30 [&>svg]:text-destructive",
          info: "group-[.toast]:border-brand-blue/30 [&>svg]:text-brand-blue",
          warning: "group-[.toast]:border-yellow-500/30 [&>svg]:text-yellow-600",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
