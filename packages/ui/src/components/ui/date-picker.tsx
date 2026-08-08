"use client";

import * as React from "react";
import { format, startOfDay } from "date-fns";
import { CalendarDays } from "lucide-react";
import { cn } from "../../lib/utils";
import { Label } from "./label";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  fromDate?: Date;
  toDate?: Date;
  id?: string;
}

export function DatePicker({
  value,
  onChange,
  label,
  placeholder = "Select a date",
  disabled = false,
  className,
  fromDate,
  toDate,
  id: idProp,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const generatedId = React.useId();
  const id = idProp ?? generatedId;

  const displayValue = value ? format(value, "d MMM yyyy") : placeholder;

  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      {label ? (
        <Label htmlFor={id} className="text-body-14 text-muted-foreground">
          {label}
        </Label>
      ) : null}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            id={id}
            type="button"
            disabled={disabled}
            aria-haspopup="dialog"
            aria-expanded={open}
            className={cn(
              "relative flex h-14 w-full items-center rounded-[10px] border border-input bg-background px-4 text-start text-body-16 transition-colors",
              "hover:border-brand-blue-400 focus-visible:border-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
              "disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60",
              !value && "text-muted-foreground",
            )}
          >
            <CalendarDays
              className="me-3 size-5 shrink-0 text-muted-foreground"
              aria-hidden
            />
            <span className={cn(value ? "text-foreground" : "text-muted-foreground")}>
              {displayValue}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto border-border-soft p-0 shadow-lg"
          align="start"
          sideOffset={8}
        >
          <Calendar
            mode="single"
            selected={value}
            defaultMonth={value}
            captionLayout="dropdown"
            navLayout="after"
            startMonth={fromDate ?? new Date(new Date().getFullYear() - 100, 0)}
            endMonth={toDate ?? new Date(new Date().getFullYear() + 10, 11)}
            onSelect={(date) => {
              onChange?.(date);
              setOpen(false);
            }}
            disabled={(date) => {
              const day = startOfDay(date);
              if (fromDate && day < startOfDay(fromDate)) return true;
              if (toDate && day > startOfDay(toDate)) return true;
              return false;
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
