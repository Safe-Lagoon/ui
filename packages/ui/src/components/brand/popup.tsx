"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { CloseButton } from "./close-button";

export interface PopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  showClose?: boolean;
}

export function Popup({ open, onOpenChange, title, description, children, showClose = true }: PopupProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-[10px] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-h3">{title}</DialogTitle>
          {description ? <DialogDescription>{description}</DialogDescription> : null}
        </DialogHeader>
        {children}
        {showClose ? (
          <div className="mt-4 flex justify-end">
            <CloseButton onClick={() => onOpenChange(false)} />
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
