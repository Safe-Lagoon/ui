"use client";

import { SignInForm } from "@safelagoon/ui/blocks";

export default function SignInFormDemo() {
  return (
    <div className="w-full max-w-sm">
      <SignInForm
        emailLabel="Email"
        passwordLabel="Password"
        submitLabel="Sign in"
        forgotPasswordLabel="Forgot password?"
        onForgotPassword={() => {}}
        onSubmit={() => {}}
      />
    </div>
  );
}
