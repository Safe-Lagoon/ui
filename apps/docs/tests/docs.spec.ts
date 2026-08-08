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
  await expect(page.getByRole("heading", { name: "Button" })).toBeVisible();
});
