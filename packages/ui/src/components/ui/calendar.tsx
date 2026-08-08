"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "../../lib/utils";
import { buttonVariants } from "../brand/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        month_caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-body-14 font-medium text-foreground",
        nav: "flex items-center gap-1",
        button_previous: cn(
          buttonVariants({ variant: "outline" }),
          "absolute left-1 size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        button_next: cn(
          buttonVariants({ variant: "outline" }),
          "absolute right-1 size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        week: "flex w-full mt-2",
        day: "relative p-0 text-center text-body-14 focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-muted [&:has([aria-selected].day-outside)]:bg-muted/50 [&:has([aria-selected].day-range-end)]:rounded-r-[10px]",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "size-9 p-0 font-normal aria-selected:opacity-100",
        ),
        range_start: "day-range-start rounded-l-[10px]",
        range_end: "day-range-end rounded-r-[10px]",
        selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-[10px]",
        today: "bg-muted text-foreground rounded-[10px]",
        outside:
          "day-outside text-muted-foreground aria-selected:bg-muted/50 aria-selected:text-muted-foreground",
        disabled: "text-muted-foreground opacity-50",
        range_middle: "aria-selected:bg-muted aria-selected:text-foreground",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => {
          const Icon = orientation === "left" ? ChevronLeft : ChevronRight;
          return <Icon className="size-4" />;
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
