import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  PORTAL_SCREENS,
  PortalScreenBody,
} from "../../../../../apps/docs/registry/demos/portal-screens";

describe("constructor proto routes", () => {
  it("covers every proto.js screen key plus place/supervisor drills", () => {
    const ids = PORTAL_SCREENS.map((row) => row.id);
    expect(ids).toContain("/home");
    expect(ids).toContain("/feed/aishield");
    expect(ids).toContain("/rules/places/home");
    expect(ids).toContain("/settings/security/2fa/codes");
    expect(ids).toContain("/settings/billing/trial");
    expect(ids).toContain("/auth");
    expect(ids.length).toBeGreaterThanOrEqual(50);
  });

  it.each(PORTAL_SCREENS.map((row) => row.id))("renders %s without throwing", (id) => {
    expect(() => render(<PortalScreenBody screen={id} onGo={() => undefined} />)).not.toThrow();
  });
});
