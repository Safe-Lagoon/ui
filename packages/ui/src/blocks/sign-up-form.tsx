"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import { Button } from "../components/brand/button";
import { Checkbox } from "../components/brand/checkbox";
import { Input } from "../components/brand/input";
import { Label } from "../components/ui/label";
import { PasswordInput } from "../components/ui/password-input";

export interface SignUpFormProps {
  emailLabel: string;
  passwordLabel: string;
  confirmPasswordLabel: string;
  termsLabel: string;
  submitLabel: string;
  onSubmit: (data: { email: string; password: string; termsAccepted: boolean }) => void;
  emailError?: string;
  passwordError?: string;
  confirmPasswordError?: string;
  termsError?: string;
  isLoading?: boolean;
  className?: string;
}

export function SignUpForm({
  emailLabel,
  passwordLabel,
  confirmPasswordLabel,
  termsLabel,
  submitLabel,
  onSubmit,
  emailError,
  passwordError,
  confirmPasswordError,
  termsError,
  isLoading = false,
  className,
}: SignUpFormProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [termsAccepted, setTermsAccepted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password, termsAccepted });
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      <div className="space-y-2">
        <Label htmlFor="sign-up-email">{emailLabel}</Label>
        <Input
          id="sign-up-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="sign-up-password">{passwordLabel}</Label>
        <PasswordInput
          id="sign-up-password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="sign-up-confirm-password">{confirmPasswordLabel}</Label>
        <PasswordInput
          id="sign-up-confirm-password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={confirmPasswordError}
          required
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-start gap-3">
          <Checkbox
            id="sign-up-terms"
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(checked === true)}
            aria-invalid={termsError ? true : undefined}
          />
          <Label htmlFor="sign-up-terms" className="cursor-pointer leading-snug">
            {termsLabel}
          </Label>
        </div>
        {termsError ? (
          <p className="text-body-14 text-destructive" role="alert">
            {termsError}
          </p>
        ) : null}
      </div>
      <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
        {submitLabel}
      </Button>
    </form>
  );
}
