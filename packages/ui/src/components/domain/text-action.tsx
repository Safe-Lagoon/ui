import * as React from "react";
import { cn } from "../../lib/utils";

export interface TextActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
}

/** “+ Add place” / “+ Add child” — proto `.sc-link` under a list. */
export function TextAction({ href, className, type = "button", children, ...props }: TextActionProps) {
  const classes = cn("mt-3.5 text-[13px] font-semibold text-brand-blue hover:underline", className);

  if (href && !props.onClick) {
    return (
      <a data-slot="text-action" href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} data-slot="text-action" className={classes} {...props}>
      {children}
    </button>
  );
}
