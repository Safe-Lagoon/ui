"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "../../lib/utils";

const Sheet = DialogPrimitive.Root;

const SheetTrigger = DialogPrimitive.Trigger;

const SheetPortal = DialogPrimitive.Portal;

const SheetClose = DialogPrimitive.Close;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "sheet-overlay fixed inset-0 z-50 bg-black/50",
      className,
    )}
    {...props}
  />
));
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName;

const sheetSideVariants = {
  top: cn(
    "inset-x-2.5 top-2.5 max-h-[calc(100svh-1.25rem)] rounded-b-[10px] border-b",
    "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
  ),
  bottom: cn(
    "inset-x-2.5 bottom-2.5 max-h-[calc(100svh-1.25rem)] rounded-t-[10px] border-t",
    "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
  ),
  left: cn(
    "sheet-content-left inset-y-0 start-0 h-full w-full max-w-sm border-e rounded-none",
  ),
  "left-inset": cn(
    "start-2.5 top-2.5 bottom-2.5 h-auto w-full max-w-sm rounded-[10px] border-e",
    "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
  ),
  right: cn(
    "sheet-content-right end-2.5 top-2.5 bottom-2.5 h-auto w-full max-w-sm rounded-[10px] border-s",
  ),
};

interface SheetContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  side?: keyof typeof sheetSideVariants;
  showOverlay?: boolean;
  overlayClassName?: string;
}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(({ side = "right", showOverlay = false, overlayClassName, className, children, ...props }, ref) => (
  <SheetPortal>
    {showOverlay ? <SheetOverlay className={overlayClassName} /> : null}
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed z-50 flex flex-col border border-input bg-background shadow-lg",
        side === "left" || side === "right"
          ? ""
          : cn(
              "transition ease-in-out",
              "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
            ),
        sheetSideVariants[side],
        className,
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = DialogPrimitive.Content.displayName;

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-1.5 p-6 text-center sm:text-start", className)} {...props} />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-auto flex flex-col gap-2 p-6", className)} {...props} />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-body-18 font-semibold text-foreground", className)}
    {...props}
  />
));
SheetTitle.displayName = DialogPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-body-14 text-muted-foreground", className)}
    {...props}
  />
));
SheetDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
