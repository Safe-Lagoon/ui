import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ChildRail } from "./child-rail";

const profiles = [
  { id: "alex", name: "Alex", avatarFallback: "AL", device: "Android" },
  { id: "sam", name: "Sam", avatarFallback: "SA", unlinked: true },
];

describe("ChildRail", () => {
  it("renders profile rows and reports a switch", () => {
    const onProfileChange = vi.fn();
    const { getByRole } = render(
      <ChildRail profiles={profiles} activeProfileId="alex" onProfileChange={onProfileChange} />,
    );
    fireEvent.click(getByRole("button", { name: /Sam/ }));
    expect(onProfileChange).toHaveBeenCalledWith("sam");
  });

  it("shows skeleton slots while loading", () => {
    const { getByRole, container } = render(
      <ChildRail
        profiles={[]}
        activeProfileId=""
        onProfileChange={() => undefined}
        loading
        skeletonCount={3}
      />,
    );
    expect(getByRole("status")).toHaveAttribute("aria-busy", "true");
    expect(container.querySelectorAll(".sl-skel").length).toBe(9);
  });
});
