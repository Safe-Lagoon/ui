import * as React from "react";
import { cn } from "../../lib/utils";

export interface PageBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function PageBody({ className, children, ...props }: PageBodyProps) {
  return (
    <div
      data-slot="page-body"
      className={cn(
        "mx-auto flex w-full flex-col",
        "max-w-[1180px] px-8 pb-12 pt-7",
        "group-data-[shell-mode=tablet]/shell:max-w-[920px] group-data-[shell-mode=tablet]/shell:px-7 group-data-[shell-mode=tablet]/shell:pb-10 group-data-[shell-mode=tablet]/shell:pt-6",
        "group-data-[shell-mode=phone]/shell:max-w-full group-data-[shell-mode=phone]/shell:px-3.5 group-data-[shell-mode=phone]/shell:pb-8 group-data-[shell-mode=phone]/shell:pt-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
