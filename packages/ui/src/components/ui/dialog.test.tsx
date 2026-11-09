import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Dialog, DialogContent, DialogTitle } from "./dialog";

describe("Dialog close label", () => {
  afterEach(() => {
    document.documentElement.lang = "en";
    delete (globalThis as { i18n?: { t: (key: string) => string } }).i18n;
  });

  it("uses Close in English", () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogTitle>Hello</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    expect(screen.getByText("Close")).toBeInTheDocument();
  });

  it("uses סגור when the document language is Hebrew", () => {
    document.documentElement.lang = "he";
    render(
      <Dialog open>
        <DialogContent>
          <DialogTitle>שלום</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    expect(screen.getByText("סגור")).toBeInTheDocument();
  });

  it("prefers globalThis.i18n.t('close') when it returns a real label", () => {
    (globalThis as { i18n?: { t: (key: string) => string } }).i18n = {
      t: (key) => (key === "close" ? "Fermer" : key),
    };
    render(
      <Dialog open>
        <DialogContent>
          <DialogTitle>Hello</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    expect(screen.getByText("Fermer")).toBeInTheDocument();
  });
});
