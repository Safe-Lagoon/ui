import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-100 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-lilac text-white hover:bg-lilac-hover active:bg-lilac-active disabled:bg-border-soft disabled:text-border",
        "primary-long":
          "bg-lilac text-white hover:bg-lilac-hover active:bg-lilac-active disabled:bg-border-soft disabled:text-border min-w-[293px]",
        "secondary-lilac":
          "border-2 border-lilac bg-transparent text-violet hover:border-lilac-hover hover:text-violet-active active:border-lilac-active disabled:border-border disabled:text-border",
        "secondary-blue":
          "border-2 border-brand-blue bg-transparent text-brand-blue hover:border-brand-blue-400 active:border-brand-blue disabled:border-border disabled:text-border",
        tertiary:
          "bg-transparent text-brand-blue underline-offset-4 hover:underline active:text-violet disabled:text-border",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-muted hover:text-foreground",
        ghost: "hover:bg-muted hover:text-foreground",
        link: "text-brand-blue underline-offset-4 hover:underline",
      },
      size: {
        default: "h-[52px] px-5 py-[15px] text-body-18",
        sm: "h-[48px] px-5 py-[14px] text-body-16 md:h-[48px]",
        lg: "h-[52px] px-6 py-[15px] text-body-18",
        icon: "size-[52px] p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
