"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import { Button } from "../components/brand/button";
import { Input } from "../components/brand/input";
import { Label } from "../components/ui/label";
import { PasswordInput } from "../components/ui/password-input";

export interface SignInFormProps {
  emailLabel: string;
  passwordLabel: string;
  submitLabel: string;
  forgotPasswordLabel?: string;
  onForgotPassword?: () => void;
  onSubmit: (data: { email: string; password: string }) => void;
  emailError?: string;
  passwordError?: string;
  isLoading?: boolean;
  className?: string;
}

export function SignInForm({
  emailLabel,
  passwordLabel,
  submitLabel,
  forgotPasswordLabel,
  onForgotPassword,
  onSubmit,
  emailError,
  passwordError,
  isLoading = false,
  className,
}: SignInFormProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      <div className="space-y-2">
        <Label htmlFor="sign-in-email">{emailLabel}</Label>
        <Input
          id="sign-in-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          required
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="sign-in-password">{passwordLabel}</Label>
          {forgotPasswordLabel && onForgotPassword ? (
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-body-14 text-brand-blue hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {forgotPasswordLabel}
            </button>
          ) : null}
        </div>
        <PasswordInput
          id="sign-in-password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
          required
        />
      </div>
      <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
        {submitLabel}
      </Button>
    </form>
  );
}
