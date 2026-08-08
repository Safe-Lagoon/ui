import * as React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";

export interface NavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  direction: "back" | "forward";
  label?: string;
}

export function NavButton({ direction, label, className, ...props }: NavButtonProps) {
  const Icon = direction === "back" ? ArrowLeft : ArrowRight;
  const defaultLabel = direction === "back" ? "Back" : "Learn more";

  return (
    <button
      type="button"
      className={cn(
        "inline-flex w-full max-w-[580px] items-center justify-between rounded-[10px] border border-border-soft bg-background px-6 py-4 text-start transition-colors hover:border-brand-blue hover:bg-brand-blue-100/30",
        className,
      )}
      {...props}
    >
      <span className="text-body-18-semibold text-foreground">{label ?? defaultLabel}</span>
      <Icon className="size-6 text-brand-blue" />
    </button>
  );
}

export function NavPrev(props: Omit<NavButtonProps, "direction">) {
  return <NavButton direction="back" {...props} />;
}

export function NavNext(props: Omit<NavButtonProps, "direction">) {
  return <NavButton direction="forward" {...props} />;
}
