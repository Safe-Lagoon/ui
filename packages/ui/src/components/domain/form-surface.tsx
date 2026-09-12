import * as React from "react";
import { cn } from "../../lib/utils";
import { Label } from "../ui/label";

export interface FormCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function FormCard({ className, children, ...props }: FormCardProps) {
  return (
    <div
      data-slot="form-card"
      className={cn(
        "max-w-[480px] rounded-lg border border-border-soft bg-card p-5",
        "shadow-card",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface LabeledFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  htmlFor?: string;
  hint?: React.ReactNode;
}

export function LabeledField({ label, htmlFor, hint, className, children, ...props }: LabeledFieldProps) {
  return (
    <div data-slot="labeled-field" className={cn("mb-4 flex flex-col gap-1.5 last:mb-0", className)} {...props}>
      <Label htmlFor={htmlFor} className="text-[13px] font-medium">
        {label}
      </Label>
      {children}
      {hint ? <FieldHint>{hint}</FieldHint> : null}
    </div>
  );
}

export function FieldHint({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p data-slot="field-hint" className={cn("text-[12.5px] text-muted-foreground", className)} {...props} />;
}

export function SectionTitle({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      data-slot="section-title"
      className={cn(
        "mb-2.5 mt-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground",
        "[&:not(:first-child)]:mt-6",
        className,
      )}
      {...props}
    />
  );
}

export function DangerAction({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      data-slot="danger-action"
      className={cn(
        "mt-1 text-start text-[13px] font-semibold text-destructive hover:underline",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      {...props}
    />
  );
}
