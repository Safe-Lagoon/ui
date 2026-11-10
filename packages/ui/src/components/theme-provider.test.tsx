import { fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider, useTheme } from "./theme-provider";

function ThemeProbe() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
      <button type="button" onClick={() => setTheme("dark")}>
        set-dark
      </button>
    </div>
  );
}

function clearThemeCookie() {
  document.cookie = "safelagoon-ui-theme=; Path=/; Max-Age=0";
}

describe("ThemeProvider", () => {
  afterEach(() => {
    clearThemeCookie();
    localStorage.clear();
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.style.colorScheme = "";
  });

  it("defaults to system and persists the choice in a cookie, not localStorage", () => {
    const { getByTestId, getByRole } = render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>,
    );
    expect(getByTestId("theme")).toHaveTextContent("system");
    fireEvent.click(getByRole("button", { name: "set-dark" }));
    expect(getByTestId("theme")).toHaveTextContent("dark");
    expect(document.cookie).toContain("safelagoon-ui-theme=dark");
    expect(localStorage.getItem("safelagoon-ui-theme")).toBeNull();
    expect(document.documentElement.style.colorScheme).toBe("dark");
  });

  it("restores the cookie value on mount", () => {
    document.cookie = "safelagoon-ui-theme=dark; Path=/";
    const { getByTestId } = render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>,
    );
    expect(getByTestId("theme")).toHaveTextContent("dark");
  });
});
