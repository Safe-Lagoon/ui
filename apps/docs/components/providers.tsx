"use client";

import { usePathname } from "next/navigation";
import { ThemeProvider, Toaster } from "@safelagoon/ui";
import { DocsControls } from "@/components/docs-controls";
import { DocsPreviewProvider } from "@/components/docs-preview-context";

function DocsControlsGate() {
  const pathname = usePathname();
  if (!pathname.startsWith("/docs")) return null;
  return <DocsControls />;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light">
      <DocsPreviewProvider>
        {children}
        <Toaster position="bottom-right" />
        <DocsControlsGate />
      </DocsPreviewProvider>
    </ThemeProvider>
  );
}
