"use client";

import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@safelagoon/ui";

export default function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="secondary-blue">Open right drawer</Button>
      </DrawerTrigger>
      <DrawerContent side="right">
        <DrawerHeader>
          <DrawerTitle>Filter logs</DrawerTitle>
          <DrawerDescription>
            Narrow activity by date range, profile, or app.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 px-4 text-body-16 text-muted-foreground">
          Drawer body content
        </div>
        <DrawerFooter>
          <Button variant="primary">Apply filters</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
