import * as React from "react";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../components/theme-provider";
import { GeofenceMap } from "./geofence-map";

vi.mock("@vis.gl/react-google-maps", () => ({
  APIProvider: ({
    children,
    language,
  }: {
    children: React.ReactNode;
    language?: string;
  }) => (
    <div data-testid="api-provider" data-language={language}>
      {children}
    </div>
  ),
  Map: ({
    children,
    colorScheme,
  }: {
    children?: React.ReactNode;
    colorScheme?: string;
  }) => (
    <div data-testid="map" data-color-scheme={colorScheme}>
      {children}
    </div>
  ),
  Circle: React.forwardRef(() => <div data-testid="circle" />),
  AdvancedMarker: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
  useMap: () => null,
}));

describe("GeofenceMap", () => {
  it("accepts a null center, shows the click hint, and passes language plus colorScheme", () => {
    const { getByText, getByTestId, getByLabelText, queryByTestId } = render(
      <ThemeProvider defaultTheme="dark">
        <GeofenceMap
          apiKey="test-key"
          center={null}
          fallbackCenter={{ lat: 32.08, lng: 34.78 }}
          radius={200}
          clickHint="Tap the map to place"
          language="he"
          zoomInLabel="In"
          zoomOutLabel="Out"
        />
      </ThemeProvider>,
    );
    expect(getByText("Tap the map to place")).toBeInTheDocument();
    expect(getByTestId("api-provider")).toHaveAttribute("data-language", "he");
    expect(getByTestId("map")).toHaveAttribute("data-color-scheme", "DARK");
    expect(queryByTestId("circle")).toBeNull();
    expect(getByLabelText("In")).toBeInTheDocument();
    expect(getByLabelText("Out")).toBeInTheDocument();
  });

  it("hides the click hint once a center is placed", () => {
    const { queryByText, getByTestId } = render(
      <ThemeProvider defaultTheme="light">
        <GeofenceMap
          apiKey="test-key"
          center={{ lat: 47.62, lng: -122.35 }}
          radius={120}
          clickHint="Tap the map to place"
        />
      </ThemeProvider>,
    );
    expect(queryByText("Tap the map to place")).not.toBeInTheDocument();
    expect(getByTestId("circle")).toBeInTheDocument();
    expect(getByTestId("map")).toHaveAttribute("data-color-scheme", "LIGHT");
  });
});
