import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { AppMark } from "./app-mark";
import { AppNavIcon } from "./app-nav-icon";
import { AuthCard, AuthDesc, AuthPage, AuthTitle } from "./auth-card";
import { BrandMark } from "./brand-mark";
import { ChatDayLabel, FeedBubble } from "./feed-bubble";
import { MapStage, MapToolbar } from "./map-toolbar";
import { PanelGrid } from "./panel-grid";
import { PayCard, PayCardGroup } from "./pay-card";
import { PortalSelect } from "./portal-select";
import { TextAction } from "./text-action";
import { ToggleRow } from "./toggle-row";
import { VideoThumb } from "./video-thumb";
import { Switch } from "../ui/switch";

describe("PanelGrid", () => {
  it("is a 3-col proto grid", () => {
    const { container } = render(
      <PanelGrid>
        <span>a</span>
        <span>b</span>
      </PanelGrid>,
    );
    expect(container.firstElementChild).toHaveAttribute("data-slot", "panel-grid");
    expect(container.firstElementChild?.className).toMatch(/grid-cols-3/);
  });
});

describe("AppMark", () => {
  it("uses proto TikTok / YouTube fills", () => {
    const { getByText } = render(
      <>
        <AppMark kind="tiktok" mark="♪" />
        <AppMark kind="youtube" mark="▶" />
      </>,
    );
    expect(getByText("♪")).toHaveStyle({ background: "#111" });
    expect(getByText("▶")).toHaveStyle({ background: "#ff0000" });
  });
});

describe("VideoThumb", () => {
  it("shows duration", () => {
    const { getByText } = render(<VideoThumb src="/yt.jpg" duration="12:04" />);
    expect(getByText("12:04")).toBeInTheDocument();
  });
});

describe("PortalSelect", () => {
  it("forwards value changes", () => {
    const onChange = vi.fn();
    const { getByRole } = render(
      <PortalSelect aria-label="Time zone" defaultValue="UTC" onChange={onChange}>
        <option>UTC</option>
        <option>Europe/London</option>
      </PortalSelect>,
    );
    fireEvent.change(getByRole("combobox"), { target: { value: "Europe/London" } });
    expect(onChange).toHaveBeenCalled();
  });
});

describe("ToggleRow", () => {
  it("toggles and reports", () => {
    const onCheckedChange = vi.fn();
    const { getByRole } = render(<ToggleRow title="AI Shield" subtitle="Needs-review" defaultChecked onCheckedChange={onCheckedChange} />);
    const sw = getByRole("switch", { name: "AI Shield" });
    expect(sw).toHaveAttribute("aria-checked", "true");
    fireEvent.click(sw);
    expect(onCheckedChange).toHaveBeenCalledWith(false);
  });

  it("pins the thumb at proto 2px inset", () => {
    const { getByRole } = render(<ToggleRow title="Push" />);
    const sw = getByRole("switch", { name: "Push" });
    expect(sw.className).toMatch(/p-0/);
    expect(sw.className).toMatch(/border-0/);
    const thumb = sw.querySelector("span");
    expect(thumb?.className).toMatch(/left-\[2px\]/);
    expect(thumb?.className).toMatch(/top-\[2px\]/);
    expect(thumb?.className).not.toMatch(/translate-x-0\.5/);
  });

  it("has no a11y violations", async () => {
    const { container } = render(<ToggleRow title="Push" defaultChecked />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("Switch", () => {
  it("uses proto lilac track and 2px / 22px thumb travel", () => {
    const { getByRole } = render(<Switch aria-label="Restricted Mode" />);
    const track = getByRole("switch", { name: "Restricted Mode" });
    expect(track.className).toMatch(/bg-border/);
    expect(track.className).toMatch(/data-\[state=checked\]:bg-lilac/);
    expect(track.className).not.toMatch(/bg-violet/);
    const thumb = track.querySelector("span");
    expect(thumb?.className).toMatch(/translate-x-\[2px\]/);
    expect(thumb?.className).toMatch(/data-\[state=checked\]:translate-x-\[22px\]/);
  });
});

describe("PayCard", () => {
  it("is a radio", () => {
    const onClick = vi.fn();
    const { getByRole } = render(
      <PayCardGroup>
        <PayCard label="Visa •••• 4242" selected />
        <PayCard label="Add another card" onClick={onClick} />
      </PayCardGroup>,
    );
    expect(getByRole("radio", { name: "Visa •••• 4242" })).toHaveAttribute("aria-checked", "true");
    fireEvent.click(getByRole("radio", { name: "Add another card" }));
    expect(onClick).toHaveBeenCalled();
  });
});

describe("BrandMark + AppNavIcon", () => {
  it("renders proto brand and nav kinds", () => {
    const { getByText, container } = render(
      <>
        <BrandMark />
        <AppNavIcon kind="home" />
        <AppNavIcon kind="settings" />
      </>,
    );
    expect(getByText("Safe Lagoon")).toBeInTheDocument();
    expect(container.querySelector("[data-kind=home]")).toBeTruthy();
    expect(container.querySelector("[data-kind=settings] circle")).toBeTruthy();
  });
});

describe("AuthCard", () => {
  it("composes page + card + title", () => {
    const { getByRole, getByText } = render(
      <AuthPage className="min-h-full">
        <BrandMark size="auth" />
        <AuthCard>
          <AuthTitle>Sign in</AuthTitle>
          <AuthDesc>demo@demo / demo</AuthDesc>
        </AuthCard>
      </AuthPage>,
    );
    expect(getByRole("heading", { level: 1, name: "Sign in" })).toBeInTheDocument();
    expect(getByText("demo@demo / demo")).toBeInTheDocument();
  });
});

describe("TextAction", () => {
  it("fires click", () => {
    const onClick = vi.fn();
    const { getByRole } = render(<TextAction onClick={onClick}>+ Add place</TextAction>);
    fireEvent.click(getByRole("button", { name: "+ Add place" }));
    expect(onClick).toHaveBeenCalled();
  });
});

describe("MapToolbar", () => {
  it("selects Draw / Move", () => {
    const onValueChange = vi.fn();
    const { getByRole } = render(<MapToolbar value="draw" onValueChange={onValueChange} hint="Click the map" />);
    expect(getByRole("radio", { name: "Draw zone" })).toHaveAttribute("aria-checked", "true");
    fireEvent.click(getByRole("radio", { name: "Move map" }));
    expect(onValueChange).toHaveBeenCalledWith("pan");
  });
});

describe("MapStage", () => {
  it("is 360 tall by default", () => {
    const { container } = render(<MapStage />);
    expect(container.firstElementChild?.className).toMatch(/h-\[360px\]/);
  });
});

describe("FeedBubble", () => {
  it("marks inbound vs outbound", () => {
    const { getByText } = render(
      <>
        <ChatDayLabel>Today</ChatDayLabel>
        <FeedBubble>Where are you?</FeedBubble>
        <FeedBubble variant="out">Home</FeedBubble>
      </>,
    );
    expect(getByText("Today")).toBeInTheDocument();
    expect(getByText("Where are you?")).toHaveAttribute("data-variant", "in");
    expect(getByText("Home")).toHaveAttribute("data-variant", "out");
  });
});
