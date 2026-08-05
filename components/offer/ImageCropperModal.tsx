"use client";

import { useEffect, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import "react-easy-crop/react-easy-crop.css";
import { MdClose } from "react-icons/md";

interface ImageCropperModalProps {
  isOpen: boolean;
  imageSrc: string | null;
  onClose: () => void;
  onConfirm: (croppedDataUrl: string) => Promise<void> | void;
}

const CROP_WIDTH = 1000;
const CROP_HEIGHT = 800;
const CROP_ASPECT = CROP_WIDTH / CROP_HEIGHT; // 5:4

const MAX_ZOOM = 3;
const DEFAULT_MIN_ZOOM = 0.2; // fallback until natural size is known

const createImage = (url: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

// react-easy-crop's zoom=1 makes the image "cover" the crop box.
// To let the whole image fit ("contain") we scale down by the ratio
// between the crop box's aspect ratio and the image's aspect ratio.
const getFitZoom = (imageWidth: number, imageHeight: number) => {
  const imageAspect = imageWidth / imageHeight;
  return Math.min(CROP_ASPECT / imageAspect, imageAspect / CROP_ASPECT);
};

const getCroppedImg = async (imageSrc: string, pixelCrop: Area) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Unable to create canvas context");
  }

  canvas.width = CROP_WIDTH;
  canvas.height = CROP_HEIGHT;

  // Fill background so any empty space left by a zoomed-out image
  ctx.fillStyle = "#FFD5C3";
  ctx.fillRect(0, 0, CROP_WIDTH, CROP_HEIGHT);

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    CROP_WIDTH,
    CROP_HEIGHT,
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
  const [minZoom, setMinZoom] = useState(DEFAULT_MIN_ZOOM);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  // Whenever a new image is loaded, figure out the zoom level that makes
  // the whole image visible inside the crop box, and start there.
  useEffect(() => {
    if (!imageSrc) return;

    let isCancelled = false;

    createImage(imageSrc)
      .then((image) => {
        if (isCancelled) return;
        const fitZoom = getFitZoom(image.naturalWidth, image.naturalHeight);
        setMinZoom(fitZoom);
        setZoom(fitZoom);
        setCrop({ x: 0, y: 0 });
      })
      .catch(() => {
        if (isCancelled) return;
        setMinZoom(DEFAULT_MIN_ZOOM);
        setZoom(DEFAULT_MIN_ZOOM);
      });

    return () => {
      isCancelled = true;
    };
  }, [imageSrc]);

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
        <div className="relative h-96 w-full overflow-hidden rounded-xl bg-gray-100">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            minZoom={minZoom}
            maxZoom={MAX_ZOOM}
            restrictPosition={false}
            aspect={CROP_ASPECT}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <input
            type="range"
            min={minZoom}
            max={MAX_ZOOM}
            step={0.01}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full accent-orange-600"
          />
          <button
            type="button"
            onClick={handleConfirm}
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};