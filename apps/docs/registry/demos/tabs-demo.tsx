"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@safelagoon/ui";

export default function TabsDemo() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-md">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="apps">Apps</TabsTrigger>
        <TabsTrigger value="rules">Rules</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="mt-4 text-body-14 text-muted-foreground">
        Screen time summary and recent activity.
      </TabsContent>
      <TabsContent value="apps" className="mt-4 text-body-14 text-muted-foreground">
        Installed apps and usage limits.
      </TabsContent>
      <TabsContent value="rules" className="mt-4 text-body-14 text-muted-foreground">
        Schedule and blocking rules.
      </TabsContent>
    </Tabs>
  );
}
