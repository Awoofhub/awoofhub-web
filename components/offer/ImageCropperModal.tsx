"use client";

import { useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import "react-easy-crop/react-easy-crop.css";
import { MdClose } from "react-icons/md";

interface ImageCropperModalProps {
  isOpen: boolean;
  imageSrc: string | null;
  onClose: () => void;
  onConfirm: (croppedDataUrl: string) => Promise<void> | void;
}

const CROP_WIDTH = 500;
const CROP_HEIGHT = 800;

const CROP_RATIOS = [
  { label: "Free", value: null },
  { label: "1:1", value: 1 / 1 },
  { label: "4:3", value: 4 / 3 },
  { label: "16:9", value: 16 / 9 },
];

const createImage = (url: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

const getCroppedImg = async (imageSrc: string, pixelCrop: Area) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Unable to create canvas context");
  }

  canvas.width = CROP_WIDTH;
  canvas.height = CROP_HEIGHT;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    CROP_WIDTH,
    CROP_HEIGHT
  );

  return canvas.toDataURL("image/jpeg");
};

export const ImageCropperModal = ({
  isOpen,
  imageSrc,
  onClose,
  onConfirm,
}: ImageCropperModalProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [selectedRatio, setSelectedRatio] = useState<number | null>(null);

  const handleCropComplete = (_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleConfirm = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    const croppedDataUrl = await getCroppedImg(imageSrc, croppedAreaPixels);
    await onConfirm(croppedDataUrl);
  };

  if (!isOpen || !imageSrc) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-1 py-2">
      <div className="w-full max-w-xl rounded-2xl bg-white p-4 shadow-xl">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-baloo text-lg text-gray-900">Crop your image</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100"
            aria-label="Close cropper"
          >
            <MdClose size={18} className="text-gray-600" />
          </button>
        </div>
        <div className="mb-3 flex flex-wrap gap-2">
          {CROP_RATIOS.map((ratio) => (
            <button
              key={ratio.label}
              type="button"
              onClick={() => setSelectedRatio(ratio.value)}
              className={`rounded-full border px-3 py-1 text-sm font-medium ${
                selectedRatio === ratio.value
                  ? "border-primary bg-primary text-white"
                  : "border-gray-300 bg-white text-gray-700"
              }`}
            >
              {ratio.label}
            </button>
          ))}
        </div>
        <div className="relative h-96 w-full overflow-hidden rounded-xl bg-gray-100">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={selectedRatio ?? CROP_WIDTH / CROP_HEIGHT}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full accent-orange-500"
          />
          <button
            type="button"
            onClick={handleConfirm}
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
          >
            Crop & upload
          </button>
        </div>
      </div>
    </div>
  );
};
