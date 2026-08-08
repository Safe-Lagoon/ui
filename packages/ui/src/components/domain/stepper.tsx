"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "../../lib/utils";

export interface StepperStep {
  id: string;
  label: string;
  description?: string;
}

export interface StepperProps {
  steps: StepperStep[];
  currentStep: number;
  onStepClick?: (index: number) => void;
  className?: string;
}

export function Stepper({ steps, currentStep, onStepClick, className }: StepperProps) {
  return (
    <nav aria-label="Progress" className={cn("w-full", className)}>
      <ol className="flex items-center">
        {steps.map((step, index) => {
          const isComplete = index < currentStep;
          const isCurrent = index === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <li
              key={step.id}
              className={cn("relative flex flex-1 items-center", !isLast && "pe-4")}
            >
              <button
                type="button"
                disabled={!onStepClick}
                onClick={() => onStepClick?.(index)}
                className={cn(
                  "group flex flex-col items-center gap-2 text-center",
                  onStepClick && "cursor-pointer",
                  !onStepClick && "cursor-default",
                )}
              >
                <span
                  className={cn(
                    "flex size-10 items-center justify-center rounded-full border-2 text-body-14 font-semibold transition-colors",
                    isComplete && "border-green bg-green text-white",
                    isCurrent && "border-lilac bg-lilac text-white",
                    !isComplete && !isCurrent && "border-border-soft bg-background text-muted-foreground",
                  )}
                >
                  {isComplete ? <Check className="size-5" /> : index + 1}
                </span>
                <span
                  className={cn(
                    "hidden text-body-14 sm:block",
                    isCurrent ? "font-semibold text-foreground" : "text-muted-foreground",
                  )}
                >
                  {step.label}
                </span>
              </button>
              {!isLast ? (
                <div
                  className={cn(
                    "absolute start-[calc(50%+20px)] end-[calc(-50%+20px)] top-5 h-0.5 -translate-y-1/2",
                    isComplete ? "bg-green" : "bg-border-soft",
                  )}
                  aria-hidden="true"
                />
              ) : null}
              {step.description && isCurrent ? (
                <p className="absolute top-full mt-2 hidden w-full text-center text-body-14 text-muted-foreground sm:block">
                  {step.description}
                </p>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
