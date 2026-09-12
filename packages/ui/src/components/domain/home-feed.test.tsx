import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { AppShellLayout } from "../../blocks/app-shell-layout";
import { AppShellPageHeader } from "../../blocks/app-shell-page-header";
import { shellModeFromWidth } from "../../blocks/app-shell-navigation-context";
import { AppPhoneChrome } from "./app-phone-chrome";
import { childOs } from "./child-profile-switcher";
import { ActivityDaySection } from "./activity-day-section";
import { ActivityStack } from "./activity-stack";
import { AlertShot } from "./alert-shot";
import { DeviceModeControl } from "./device-mode-control";
import { FilterChips } from "./filter-chips";
import { PageBody } from "./page-body";
import { SectionCard } from "./section-card";
import { StatusBanner } from "./status-banner";

describe("shellModeFromWidth", () => {
  it("maps proto breakpoints 430 / 431 / 900 / 901", () => {
    expect(shellModeFromWidth(430)).toBe("phone");
    expect(shellModeFromWidth(431)).toBe("tablet");
    expect(shellModeFromWidth(900)).toBe("tablet");
    expect(shellModeFromWidth(901)).toBe("desktop");
    expect(shellModeFromWidth(1280)).toBe("desktop");
    expect(shellModeFromWidth(820)).toBe("tablet");
    expect(shellModeFromWidth(390)).toBe("phone");
  });
});

describe("DeviceModeControl", () => {
  it("is a mutually exclusive 3-state radiogroup", () => {
    const onValueChange = vi.fn();
    const { getByRole } = render(<DeviceModeControl value="rules" onValueChange={onValueChange} />);

    expect(getByRole("radio", { name: "By rules" })).toHaveAttribute("aria-checked", "true");
    expect(getByRole("radio", { name: "Allow" })).toHaveAttribute("aria-checked", "false");
    fireEvent.click(getByRole("radio", { name: "Block" }));
    expect(onValueChange).toHaveBeenCalledWith("block");
  });

  it("swaps captions for allow and block", () => {
    const { getByText, rerender } = render(<DeviceModeControl value="allow" />);
    expect(getByText("Rules are paused")).toBeInTheDocument();
    rerender(<DeviceModeControl value="block" />);
    expect(getByText("Device is blocked")).toBeInTheDocument();
  });

  it("stays disabled when unlinked", () => {
    const onValueChange = vi.fn();
    const { getByRole } = render(<DeviceModeControl value="rules" disabled onValueChange={onValueChange} />);
    fireEvent.click(getByRole("radio", { name: "Allow" }));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<DeviceModeControl value="rules" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("ActivityStack", () => {
  it("renders kind stacks and alert copy", () => {
    const { getByRole, getByText } = render(
      <ActivityStack kind="apps" title="Played on phone" meta="14:02–15:40" count={6} />,
    );
    expect(getByRole("button", { name: /Played on phone/ })).toHaveAttribute("data-kind", "apps");
    expect(getByText("6")).toBeInTheDocument();
  });

  it("marks AI Shield rows as needs review", () => {
    const { getByText } = render(
      <ActivityStack kind="aishield" alert title="example-risk.site" meta="blocked by filter" />,
    );
    expect(getByText("Needs review")).toBeInTheDocument();
  });

  it("uses proto internet layer colors", () => {
    const { container } = render(<ActivityStack kind="internet" title="wikipedia.org" />);
    const layers = container.querySelectorAll("[data-kind=internet] [aria-hidden] > span");
    expect(layers[0]).toHaveStyle({ background: "#2F77EE99" });
    expect(layers[1]).toHaveStyle({ background: "#2F77EE" });
    expect(layers[2]).toHaveStyle({ background: "#1d4ed8" });
  });

  it("paints proto white rings on stacked layers", () => {
    const { container } = render(<ActivityStack kind="apps" title="Played on phone" />);
    const layers = container.querySelectorAll("[data-stack-layer]");
    expect(layers).toHaveLength(3);
    for (const layer of layers) {
      expect(layer).toHaveStyle({ border: "2px solid #fff" });
    }
  });

  it("leaves gallery tiles without a ring", () => {
    const { container } = render(<ActivityStack kind="gallery" title="Gallery" />);
    expect(container.querySelector("[data-stack-layer]")).toBeNull();
  });
});

describe("ActivityDaySection", () => {
  it("keeps Today open by default when asked", () => {
    const { getByText, container } = render(
      <ActivityDaySection title="Today · 6 Sep 2026" defaultExpanded>
        <p>today stack</p>
      </ActivityDaySection>,
    );
    expect(getByText("today stack")).toBeInTheDocument();
    expect(container.querySelector("[data-slot=feed-list]")).toBeTruthy();
  });

  it("collapses older days until tapped", () => {
    const { getByText, queryByText } = render(
      <ActivityDaySection title="Sep 4 · 12 events" count={12} collapsedLabel="Collapsed">
        <p>older stack</p>
      </ActivityDaySection>,
    );
    expect(queryByText("older stack")).not.toBeInTheDocument();
    fireEvent.click(getByText("Sep 4 · 12 events"));
    expect(getByText("older stack")).toBeInTheDocument();
  });
});

describe("FilterChips", () => {
  it("selects one kind chip", () => {
    const onValueChange = vi.fn();
    const { getByRole } = render(
      <FilterChips
        items={[
          { id: "all", label: "All" },
          { id: "apps", label: "Apps" },
        ]}
        value="all"
        onValueChange={onValueChange}
      />,
    );
    fireEvent.click(getByRole("button", { name: "Apps" }));
    expect(onValueChange).toHaveBeenCalledWith("apps");
  });
});

describe("AlertShot", () => {
  it("lists categories and terms", () => {
    const { getByText } = render(
      <AlertShot title="AI Shield" categories={["Adult"]} terms={["keyword"]} />,
    );
    expect(getByText("Adult")).toBeInTheDocument();
    expect(getByText("keyword")).toBeInTheDocument();
  });
});

describe("Home primitives", () => {
  it("renders StatusBanner, SectionCard, PageBody", () => {
    const { getByRole, getByText } = render(
      <PageBody>
        <StatusBanner title="1 alert" actionLabel="Review" onAction={() => undefined} />
        <SectionCard label="Internet" metric="Filter on" />
      </PageBody>,
    );
    expect(getByRole("status")).toHaveTextContent("1 alert");
    expect(getByText("Filter on")).toBeInTheDocument();
  });
});

describe("childOs", () => {
  it("prefers os and falls back to device labels", () => {
    expect(childOs({ os: "ios", device: "Android" })).toBe("ios");
    expect(childOs({ device: "iPhone" })).toBe("ios");
    expect(childOs({ device: "Android" })).toBe("android");
    expect(childOs({ device: "" })).toBeUndefined();
  });
});

describe("AppPhoneChrome", () => {
  it("shows child avatar, large name, and OS badge — not the account", () => {
    const { getByText, getByLabelText, queryByText } = render(
      <AppPhoneChrome
        menuButton={<button type="button" aria-label="Open menu">☰</button>}
        childProfiles={[
          { id: "alex", name: "Alex", avatarFallback: "AL", os: "android" },
          { id: "sam", name: "Sam", avatarFallback: "SA", os: "ios" },
        ]}
        activeChildProfileId="alex"
      />,
    );
    expect(getByText("Alex")).toBeInTheDocument();
    expect(getByLabelText("Android")).toBeInTheDocument();
    expect(queryByText("AD")).not.toBeInTheDocument();
    expect(queryByText("Home")).not.toBeInTheDocument();
  });

  it("swaps the OS badge for iOS", () => {
    const { getByText, getByLabelText } = render(
      <AppPhoneChrome
        menuButton={<button type="button" aria-label="Open menu">☰</button>}
        childProfiles={[{ id: "sam", name: "Sam", avatarFallback: "SA", device: "iPhone" }]}
        activeChildProfileId="sam"
      />,
    );
    expect(getByText("Sam")).toBeInTheDocument();
    expect(getByLabelText("iOS")).toBeInTheDocument();
  });
});

describe("AppShellLayout phone", () => {
  it("does not mount a bottom tab bar", () => {
    const prev = window.innerWidth;
    Object.defineProperty(window, "innerWidth", { configurable: true, writable: true, value: 390 });
    class FakeResizeObserver {
      observe() {}
      disconnect() {}
      unobserve() {}
    }
    const prevRO = globalThis.ResizeObserver;
    vi.stubGlobal("ResizeObserver", FakeResizeObserver);
    try {
      const { queryByRole, getByRole, getByLabelText, getByText } = render(
        <AppShellLayout
          className="h-[640px]"
          profile={{ name: "Alexander Demo", avatarFallback: "AD" }}
          childProfiles={[{ id: "alex", name: "Alex", avatarFallback: "AL", os: "android" }]}
          activeChildProfileId="alex"
          topItems={[
            { id: "home", label: "Home", active: true },
            { id: "feed", label: "Activity" },
          ]}
        >
          <p>page</p>
        </AppShellLayout>,
      );
      expect(getByLabelText("Open menu")).toBeInTheDocument();
      expect(getByText("Alex")).toBeInTheDocument();
      expect(queryByRole("navigation", { name: "Primary" })).not.toBeInTheDocument();
      fireEvent.click(getByLabelText("Open menu"));
      const drawer = getByRole("dialog", { name: "Open menu" });
      expect(drawer).toBeInTheDocument();
      expect(drawer.className).toMatch(/bg-muted/);
      expect(drawer.className).toMatch(/w-\[var\(--sidebar-w\)\]|240px/);
      expect(getByText("Home")).toBeInTheDocument();
      expect(getByText("Activity")).toBeInTheDocument();
    } finally {
      Object.defineProperty(window, "innerWidth", { configurable: true, writable: true, value: prev });
      if (prevRO) vi.stubGlobal("ResizeObserver", prevRO);
      else vi.unstubAllGlobals();
    }
  });
});

describe("AppShellLayout proto chrome", () => {
  it("hides collapse, parent foot, and child badges", () => {
    const prev = window.innerWidth;
    Object.defineProperty(window, "innerWidth", { configurable: true, writable: true, value: 1280 });
    class FakeResizeObserver {
      observe() {}
      disconnect() {}
      unobserve() {}
    }
    const prevRO = globalThis.ResizeObserver;
    vi.stubGlobal("ResizeObserver", FakeResizeObserver);
    try {
      const { queryByLabelText, queryByText, getByText, getAllByText } = render(
        <AppShellLayout
          className="h-[640px]"
          collapsible={false}
          showProfile={false}
          logo={<span>Safe Lagoon</span>}
          profile={{ name: "Alexander Demo", avatarFallback: "AD" }}
          childProfiles={[
            { id: "alex", name: "Alex", avatarFallback: "AL", os: "android", device: "Android" },
            { id: "sam", name: "Sam", avatarFallback: "SA", os: "ios", device: "iOS" },
          ]}
          activeChildProfileId="alex"
          topItems={[
            { id: "home", label: "Home", active: true },
            { id: "feed", label: "Activity", badgeCount: 1 },
          ]}
        >
          <p>page</p>
        </AppShellLayout>,
      );
      expect(queryByLabelText("Collapse sidebar")).not.toBeInTheDocument();
      expect(queryByText("Alexander Demo")).not.toBeInTheDocument();
      expect(getAllByText("Alex").length).toBeGreaterThan(0);
      expect(getByText("1")).toBeInTheDocument();
    } finally {
      Object.defineProperty(window, "innerWidth", { configurable: true, writable: true, value: prev });
      if (prevRO) vi.stubGlobal("ResizeObserver", prevRO);
      else vi.unstubAllGlobals();
    }
  });
});

describe("AppShellPageHeader", () => {
  it("renders crumbs and the 28px page title together", () => {
    const { getByRole, getByText } = render(
      <AppShellPageHeader title="Places" breadcrumbs={<nav>Rules · Places</nav>} />,
    );
    expect(getByText("Rules · Places")).toBeInTheDocument();
    expect(getByRole("heading", { level: 1, name: "Places" })).toBeInTheDocument();
  });

  it("renders nothing on Home when title and crumbs are omitted", () => {
    const { container } = render(<AppShellPageHeader />);
    expect(container).toBeEmptyDOMElement();
  });
});
