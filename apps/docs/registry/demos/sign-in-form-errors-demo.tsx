"use client";

import { SignInForm } from "@safelagoon/ui/blocks";

export default function SignInFormErrorsDemo() {
  return (
    <div className="w-full max-w-sm">
      <SignInForm
        emailLabel="Email"
        passwordLabel="Password"
        submitLabel="Sign in"
        emailError="Enter a valid email address"
        passwordError="Password is required"
        onSubmit={() => {}}
      />
    </div>
  );
}
