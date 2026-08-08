"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "../../lib/utils";

const Sheet = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
);
Sheet.displayName = "Sheet";

const SheetTrigger = DrawerPrimitive.Trigger;

const SheetPortal = DrawerPrimitive.Portal;

const SheetClose = DrawerPrimitive.Close;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/50", className)}
    {...props}
  />
));
SheetOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const sheetVariants = {
  side: {
    top: "inset-x-0 top-0 border-b rounded-b-[10px]",
    bottom: "inset-x-0 bottom-0 border-t rounded-t-[10px]",
    left: "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
    right: "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
  },
};

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> {
  side?: keyof typeof sheetVariants.side;
}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed z-50 flex flex-col border border-input bg-background",
        sheetVariants.side[side],
        className,
      )}
      {...props}
    >
      <div className="mx-auto mt-4 h-1.5 w-12 shrink-0 rounded-full bg-muted md:hidden" />
      {children}
    </DrawerPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = DrawerPrimitive.Content.displayName;

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-1.5 p-6 text-center sm:text-left", className)} {...props} />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-auto flex flex-col gap-2 p-6", className)} {...props} />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn("text-body-18 font-semibold text-foreground", className)}
    {...props}
  />
));
SheetTitle.displayName = DrawerPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-body-14 text-muted-foreground", className)}
    {...props}
  />
));
SheetDescription.displayName = DrawerPrimitive.Description.displayName;

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
