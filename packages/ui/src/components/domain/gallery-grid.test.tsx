import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MediaLightbox } from "./gallery-grid";

describe("GalleryItem kind", () => {
  it("plays a video in the lightbox when kind is video", () => {
    render(
      <MediaLightbox
        items={[{ id: "clip", src: "clip.mp4", alt: "clip", kind: "video" }]}
        index={0}
        onClose={() => undefined}
        onIndexChange={() => undefined}
      />,
    );
    const video = document.querySelector("video");
    expect(video).toHaveAttribute("src", "clip.mp4");
    expect(document.querySelector("img[src='clip.mp4']")).toBeNull();
  });
});
