"use client";

import * as React from "react";

type DocsPreviewContextValue = {
  previewWidth: number | null;
  setPreviewWidth: (width: number | null) => void;
};

const DocsPreviewContext = React.createContext<DocsPreviewContextValue | null>(null);

export function DocsPreviewProvider({ children }: { children: React.ReactNode }) {
  const [previewWidth, setPreviewWidth] = React.useState<number | null>(null);

  const value = React.useMemo(
    () => ({
      previewWidth,
      setPreviewWidth,
    }),
    [previewWidth],
  );

  return <DocsPreviewContext.Provider value={value}>{children}</DocsPreviewContext.Provider>;
}

export function useDocsPreview() {
  return React.useContext(DocsPreviewContext);
}
