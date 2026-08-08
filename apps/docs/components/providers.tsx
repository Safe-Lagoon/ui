"use client";

import { usePathname } from "next/navigation";
import { ThemeProvider } from "@safelagoon/ui";
import { DocsControls } from "@/components/docs-controls";

function DocsControlsGate() {
  const pathname = usePathname();
  if (pathname.startsWith("/docs")) return null;
  return <DocsControls />;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light">
      {children}
      <DocsControlsGate />
    </ThemeProvider>
  );
}
