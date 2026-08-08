import * as React from "react";
import { cn } from "../lib/utils";
import { Card, CardContent } from "../components/brand/card";

export interface AuthLayoutProps {
  title?: string;
  description?: string;
  logo?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function AuthLayout({
  title,
  description,
  logo,
  children,
  footer,
  className,
}: AuthLayoutProps) {
  return (
    <div
      className={cn(
        "flex min-h-svh flex-col items-center justify-center bg-muted/30 px-5 py-12",
        className,
      )}
    >
      <div className="w-full max-w-md space-y-6">
        {logo ? <div className="flex justify-center">{logo}</div> : null}
        <Card>
          <CardContent className="space-y-6 p-8">
            {title || description ? (
              <div className="space-y-2 text-center">
                {title ? <h1 className="text-h3 text-foreground">{title}</h1> : null}
                {description ? (
                  <p className="text-body-16 text-muted-foreground">{description}</p>
                ) : null}
              </div>
            ) : null}
            {children}
          </CardContent>
        </Card>
        {footer ? <div className="text-center">{footer}</div> : null}
      </div>
    </div>
  );
}
