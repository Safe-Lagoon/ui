"use client";

import * as React from "react";
import { Camera, Crop, Upload } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../brand/button";
import { Avatar, AvatarFallback, AvatarImage } from "../brand/avatar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";

export interface ImageCropperProps {
  src: string;
  onCrop: (croppedDataUrl: string) => void;
  onCancel: () => void;
  title: string;
  cropLabel: string;
  cancelLabel: string;
  zoomLabel: string;
}

export function ImageCropper({
  src,
  onCrop,
  onCancel,
  title,
  cropLabel,
  cancelLabel,
  zoomLabel,
}: ImageCropperProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = React.useState(1);

  const handleCrop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      const size = Math.min(img.width, img.height);
      const sx = (img.width - size / zoom) / 2;
      const sy = (img.height - size / zoom) / 2;
      const sSize = size / zoom;

      canvas.width = 256;
      canvas.height = 256;
      ctx.drawImage(img, sx, sy, sSize, sSize, 0, 0, 256, 256);
      onCrop(canvas.toDataURL("image/jpeg", 0.9));
    };
    img.src = src;
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden rounded-full border-4 border-lilac">
          <img
            src={src}
            alt=""
            className="size-full object-cover transition-transform"
            style={{ transform: `scale(${zoom})` }}
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <Crop className="size-8 text-white/80 drop-shadow" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="crop-zoom">{zoomLabel}</Label>
          <input
            id="crop-zoom"
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full accent-lilac"
          />
        </div>
        <canvas ref={canvasRef} className="hidden" />
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="secondary-lilac" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variant="primary" onClick={handleCrop}>
            {cropLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export interface AvatarUploaderProps {
  src?: string;
  fallback: string;
  uploadLabel: string;
  changeLabel: string;
  cropTitle: string;
  cropLabel: string;
  cancelLabel: string;
  zoomLabel: string;
  onUpload: (file: File) => void;
  onCropComplete?: (dataUrl: string) => void;
  className?: string;
}

export function AvatarUploader({
  src,
  fallback,
  uploadLabel,
  changeLabel,
  cropTitle,
  cropLabel,
  cancelLabel,
  zoomLabel,
  onUpload,
  onCropComplete,
  className,
}: AvatarUploaderProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [cropSrc, setCropSrc] = React.useState<string | null>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setCropSrc(result);
    };
    reader.readAsDataURL(file);
    onUpload(file);
  };

  const handleCrop = (dataUrl: string) => {
    setPreview(dataUrl);
    setCropSrc(null);
    onCropComplete?.(dataUrl);
  };

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <Avatar className="size-24">
        <AvatarImage src={preview ?? src} alt="" />
        <AvatarFallback className="text-body-24-medium">{fallback}</AvatarFallback>
      </Avatar>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      <Button
        variant="secondary-lilac"
        className="gap-2"
        onClick={() => inputRef.current?.click()}
      >
        {src || preview ? <Camera /> : <Upload />}
        {src || preview ? changeLabel : uploadLabel}
      </Button>

      {cropSrc ? (
        <ImageCropper
          src={cropSrc}
          onCrop={handleCrop}
          onCancel={() => setCropSrc(null)}
          title={cropTitle}
          cropLabel={cropLabel}
          cancelLabel={cancelLabel}
          zoomLabel={zoomLabel}
        />
      ) : null}
    </div>
  );
}
