import * as React from "react";
import { cn } from "../../lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "blog" | "feature" | "pricing";
}

export function Card({ className, variant = "default", ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[10px] border border-border-soft bg-card text-card-foreground shadow-sm",
        variant === "blog" && "overflow-hidden",
        variant === "feature" && "p-6",
        variant === "pricing" && "p-8 text-center",
        className,
      )}
      {...props}
    />
  );
}

export function CardImage({ className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  return <img className={cn("aspect-[4/3] w-full object-cover", className)} alt="" {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-h4 text-foreground", className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("mt-2 text-body-16 text-muted-foreground", className)} {...props} />;
}
