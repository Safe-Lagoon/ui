import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

class FakeResizeObserver {
  observe() {}
  disconnect() {}
  unobserve() {}
}
vi.stubGlobal("ResizeObserver", FakeResizeObserver);
import { AppShellPageHeader } from "../../blocks/app-shell-page-header";
import { ChildProfileForm } from "./child-profile-form";
import { ChoiceRow } from "./choice-row";
import { DotCrumbs } from "./dot-crumbs";
import { PlaceEditor } from "./place-editor";
import { PlanCard } from "./plan-card";
import { TimeRequestCard } from "./time-request-card";

describe("ChoiceRow", () => {
  it("is a mutually exclusive radiogroup", () => {
    const onValueChange = vi.fn();
    const { getByRole } = render(
      <ChoiceRow
        label="Type"
        items={[
          { id: "HOME", label: "Home" },
          { id: "SCHOOL", label: "School" },
        ]}
        value="HOME"
        onValueChange={onValueChange}
      />,
    );
    expect(getByRole("radio", { name: "Home" })).toHaveAttribute("aria-checked", "true");
    fireEvent.click(getByRole("radio", { name: "School" }));
    expect(onValueChange).toHaveBeenCalledWith("SCHOOL");
  });
});

describe("DotCrumbs", () => {
  it("marks the last item current and navigates ancestors", () => {
    const onNavigate = vi.fn();
    const { getByRole, getByText } = render(
      <DotCrumbs
        items={[{ label: "Rules", href: "rules" }, { label: "Places", href: "places" }, "Home"]}
        onNavigate={onNavigate}
      />,
    );
    expect(getByText("Home")).toHaveAttribute("aria-current", "page");
    fireEvent.click(getByRole("button", { name: "Rules" }));
    expect(onNavigate).toHaveBeenCalledWith("rules");
  });
});

describe("AppShellPageHeader crumbs plus title", () => {
  it("keeps crumbs at 13px and still renders the page title", () => {
    const { getByRole, getByText } = render(
      <AppShellPageHeader
        title="Places"
        breadcrumbs={<DotCrumbs items={["Rules", "Places"]} />}
      />,
    );
    expect(getByRole("heading", { level: 1, name: "Places" })).toBeInTheDocument();
    expect(document.querySelector("[aria-current=page]")).toHaveTextContent("Places");
  });
});

describe("PlaceEditor", () => {
  it("exposes name, type chips, radius, save, and delete", () => {
    const onTypeChange = vi.fn();
    const onDelete = vi.fn();
    const { getByLabelText, getByRole, getByText } = render(
      <PlaceEditor
        name="Home"
        type="HOME"
        radius={120}
        center={{ lat: 47.62, lng: -122.35 }}
        onTypeChange={onTypeChange}
        onSave={() => undefined}
        onDelete={onDelete}
      />,
    );
    expect(getByLabelText("Name")).toHaveValue("Home");
    expect(getByRole("slider")).toHaveAttribute("aria-valuenow", "120");
    expect(getByRole("slider")).toHaveAttribute("aria-valuemin", "50");
    expect(getByRole("slider")).toHaveAttribute("aria-valuemax", "3000");
    fireEvent.click(getByRole("radio", { name: "School" }));
    expect(onTypeChange).toHaveBeenCalledWith("SCHOOL");
    fireEvent.click(getByRole("button", { name: "Delete place" }));
    expect(onDelete).toHaveBeenCalled();
    expect(getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("hides delete on a new place", () => {
    const { queryByRole } = render(
      <PlaceEditor
        isNew
        name=""
        type="HOME"
        radius={150}
        center={{ lat: 47.62, lng: -122.35 }}
        onDelete={() => undefined}
      />,
    );
    expect(queryByRole("button", { name: "Delete place" })).not.toBeInTheDocument();
  });
});

describe("ChildProfileForm", () => {
  it("patches gender, age, and OS", () => {
    const onChange = vi.fn();
    const { getByRole } = render(
      <ChildProfileForm
        value={{ name: "Alex", avatarId: "1", gender: "M", age: "2", os: "android" }}
        onChange={onChange}
      />,
    );
    fireEvent.click(getByRole("radio", { name: "Girl" }));
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ gender: "F" }));
    fireEvent.click(getByRole("radio", { name: "iOS" }));
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ os: "ios" }));
  });
});

describe("TimeRequestCard", () => {
  it("approves to allow", () => {
    const onAllow = vi.fn();
    const { getByRole } = render(
      <TimeRequestCard title="Alex is asking for 30 more minutes" onAllow={onAllow} />,
    );
    fireEvent.click(getByRole("button", { name: "Allow 30 min" }));
    expect(onAllow).toHaveBeenCalled();
  });
});

describe("PlanCard", () => {
  it("marks the selected plan", () => {
    const { getByText } = render(
      <PlanCard name="Family" price="$7.99" selected actionLabel="Current plan" features={["Up to 5 children"]} />,
    );
    expect(getByText("Family").closest("[data-slot=plan-card]")).toHaveAttribute("data-selected");
    expect(getByText("Up to 5 children")).toBeInTheDocument();
  });
});
