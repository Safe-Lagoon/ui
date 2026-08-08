"use client";

import * as React from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "../../lib/utils";
import { buttonVariants } from "../brand/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  formatters,
  ...props
}: CalendarProps) {
  const useDropdownNav = captionLayout.includes("dropdown");

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      captionLayout={captionLayout}
      weekStartsOn={props.weekStartsOn ?? 1}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "long" }),
        ...formatters,
      }}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2",
        month: cn(
          "flex flex-col gap-3",
          useDropdownNav && "grid grid-cols-[1fr_auto] items-center gap-x-2 gap-y-3",
        ),
        month_caption: cn(
          "relative flex items-center pt-1",
          useDropdownNav ? "col-start-1 justify-center px-1" : "w-full justify-center",
        ),
        caption_label: cn(
          "text-body-14 font-medium text-foreground",
          useDropdownNav &&
            "flex h-9 select-none items-center gap-1 rounded-[8px] px-3 text-body-14 [&>svg]:size-4 [&>svg]:text-muted-foreground",
        ),
        dropdowns: "flex items-center justify-center gap-2",
        dropdown_root: cn(
          "relative inline-flex items-center rounded-[8px] border border-input bg-background",
          "has-[:focus-visible]:border-brand-blue has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/30",
        ),
        dropdown:
          "absolute inset-0 z-10 w-full cursor-pointer appearance-none opacity-0",
        months_dropdown: "",
        years_dropdown: "",
        chevron: "text-muted-foreground",
        nav: cn(
          "flex items-center gap-1",
          useDropdownNav ? "col-start-2 shrink-0" : "",
          !useDropdownNav && props.navLayout !== "after" && "absolute inset-x-1 top-1 justify-between",
        ),
        button_previous: cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "size-8 bg-background p-0 opacity-80 hover:opacity-100",
          !useDropdownNav && props.navLayout !== "after" && "absolute start-1",
        ),
        button_next: cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "size-8 bg-background p-0 opacity-80 hover:opacity-100",
          !useDropdownNav && props.navLayout !== "after" && "absolute end-1",
        ),
        month_grid: cn("w-full border-collapse", useDropdownNav && "col-span-2"),
        weekdays: "flex",
        weekday: "w-9 text-center text-[0.8rem] font-normal text-muted-foreground",
        week: "mt-2 flex w-full",
        day: "relative p-0 text-center text-body-14 focus-within:relative focus-within:z-20",
        day_button: cn(
          "inline-flex size-9 items-center justify-center rounded-[10px] p-0 font-normal transition-colors",
          "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
          "aria-selected:opacity-100",
        ),
        range_start: "day-range-start rounded-s-[10px]",
        range_end: "day-range-end rounded-e-[10px]",
        selected:
          "rounded-[10px] bg-violet font-semibold text-white hover:bg-violet hover:text-white focus:bg-violet focus:text-white",
        today: "rounded-[10px] font-semibold text-brand-blue ring-1 ring-brand-blue/30",
        outside: "day-outside text-muted-foreground/60 aria-selected:bg-violet/70 aria-selected:text-white",
        disabled: "text-muted-foreground opacity-40",
        range_middle: "aria-selected:bg-muted aria-selected:text-foreground",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className: chevronClassName }) => {
          if (orientation === "down") {
            return <ChevronDown className={cn("size-4", chevronClassName)} />;
          }
          const Icon = orientation === "left" ? ChevronLeft : ChevronRight;
          return <Icon className={cn("size-4", chevronClassName)} />;
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
