import type { Metadata } from "next";
import { ThemeProvider } from "@safelagoon/ui";
import { DocsControls } from "@/components/docs-controls";
import "./globals.css";

export const metadata: Metadata = {
  title: "Safe Lagoon UI",
  description: "Safe Lagoon React component library",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="light">
          <DocsControls />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
