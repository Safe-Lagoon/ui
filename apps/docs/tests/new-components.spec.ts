import { test, expect } from "@playwright/test";

const newPages = [
  { path: "/docs/components/drawer", heading: "Drawer" },
  { path: "/docs/components/title", heading: "Title" },
  { path: "/docs/components/toast", heading: "Toast" },
  { path: "/docs/components/sidebar", heading: "Sidebar" },
  { path: "/docs/components/date-picker", heading: "Date Picker" },
  { path: "/docs/components/layouts", heading: "Layouts" },
  { path: "/docs/components/input", heading: "Input" },
];

for (const { path, heading } of newPages) {
  test(`${heading} docs page loads`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole("heading", { name: heading, level: 1 })).toBeVisible();
    await expect(page.getByText("Loading preview…")).toHaveCount(0);
    await expect(page.getByText(/Demo not found|Application error/i)).toHaveCount(0);
  });
}
