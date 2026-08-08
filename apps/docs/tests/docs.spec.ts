import { test, expect } from "@playwright/test";

test("homepage loads", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Safe Lagoon UI" })).toBeVisible();
});

test("docs page loads", async ({ page }) => {
  await page.goto("/docs");
  await expect(page.getByRole("heading", { name: "Introduction" })).toBeVisible();
});

test("button docs page", async ({ page }) => {
  await page.goto("/docs/components/button");
  await expect(page.getByRole("heading", { name: "Button", level: 1 })).toBeVisible();
  await expect(page.getByRole("button", { name: "Primary", exact: true })).toBeVisible();
});

test("checkbox docs page", async ({ page }) => {
  await page.goto("/docs/components/checkbox");
  await expect(page.getByRole("heading", { name: "Checkbox", level: 1 })).toBeVisible();
  await expect(page.getByRole("checkbox", { name: "Accept terms and conditions" })).toBeVisible();
});

test("sign-in form docs page", async ({ page }) => {
  await page.goto("/docs/components/sign-in-form");
  await expect(page.getByRole("heading", { name: "Sign In Form", level: 1 })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign in" }).first()).toBeVisible();
});
