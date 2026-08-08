import * as React from "react";
import { Apple, Smartphone } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "../components/brand/button";
import { Card, CardContent } from "../components/brand/card";

export type BeforeWeStartVariant = "android" | "ios";

export interface BeforeWeStartStep {
  title: string;
  description: string;
}

export interface BeforeWeStartProps {
  variant: BeforeWeStartVariant;
  title: string;
  description: string;
  steps: BeforeWeStartStep[];
  continueLabel: string;
  onContinue?: () => void;
  continueHref?: string;
  className?: string;
}

const variantIcons: Record<BeforeWeStartVariant, React.ReactNode> = {
  android: <Smartphone className="size-8" />,
  ios: <Apple className="size-8" />,
};

export function BeforeWeStart({
  variant,
  title,
  description,
  steps,
  continueLabel,
  onContinue,
  continueHref,
  className,
}: BeforeWeStartProps) {
  return (
    <Card className={cn("mx-auto max-w-lg", className)}>
      <CardContent className="space-y-6 p-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-brand-blue-100 text-brand-blue">
            {variantIcons[variant]}
          </div>
          <div>
            <h2 className="text-h3 text-foreground">{title}</h2>
            <p className="mt-2 text-body-16 text-muted-foreground">{description}</p>
          </div>
        </div>

        <ol className="space-y-4">
          {steps.map((step, index) => (
            <li key={step.title} className="flex gap-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-lilac text-body-14 font-semibold text-white">
                {index + 1}
              </span>
              <div>
                <h3 className="text-body-16-semibold text-foreground">{step.title}</h3>
                <p className="mt-1 text-body-14 text-muted-foreground">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>

        {continueHref ? (
          <Button variant="primary" className="w-full" asChild>
            <a href={continueHref}>{continueLabel}</a>
          </Button>
        ) : (
          <Button variant="primary" className="w-full" onClick={onContinue}>
            {continueLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
