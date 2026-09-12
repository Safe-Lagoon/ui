import * as React from "react";
import { cn } from "../../lib/utils";

export interface AuthPageProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/** Centered auth canvas — proto `.auth-page`. */
export function AuthPage({ className, children, ...props }: AuthPageProps) {
  return (
    <div
      data-slot="auth-page"
      className={cn(
        "flex min-h-svh flex-col items-center justify-center bg-[rgba(236,239,241,0.45)] px-5 py-12",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface AuthCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/** 420px / 20px radius sign-in card — proto `.auth-card`. */
export function AuthCard({ className, children, ...props }: AuthCardProps) {
  return (
    <div
      data-slot="auth-card"
      className={cn(
        "w-full max-w-[420px] rounded-xl border border-border-soft bg-card p-8 shadow-auth",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function AuthTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h1 data-slot="auth-title" className={cn("text-[22px] font-bold text-ink", className)} {...props} />;
}

export function AuthDesc({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      data-slot="auth-desc"
      className={cn("mb-6 mt-1.5 text-[14px] text-muted-foreground", className)}
      {...props}
    />
  );
}
