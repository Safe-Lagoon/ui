import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const tagVariants = cva(
  "inline-flex items-center rounded-full px-3 font-medium transition-colors",
  {
    variants: {
      variant: {
        price: "bg-brand-blue-100 text-brand-blue",
        success: "bg-green-100 text-green",
        default: "bg-muted text-muted-foreground",
      },
      size: {
        default: "h-[38px] text-body-16",
        sm: "h-[34px] text-body-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {}

export function Tag({ className, variant, size, ...props }: TagProps) {
  return <span className={cn(tagVariants({ variant, size, className }))} {...props} />;
}

export { tagVariants };
