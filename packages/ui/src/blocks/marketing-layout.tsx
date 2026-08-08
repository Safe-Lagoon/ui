import * as React from "react";
import { cn } from "../lib/utils";
import { Footer } from "../components/brand/footer";
import { Header } from "../components/brand/header";

export interface MarketingLayoutProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function MarketingLayout({
  header,
  footer,
  children,
  className,
}: MarketingLayoutProps) {
  return (
    <div className={cn("flex min-h-svh flex-col bg-background", className)}>
      {header ?? <Header />}
      <main className="flex-1">{children}</main>
      {footer ?? <Footer />}
    </div>
  );
}

export { Header, Footer };
