"use client";

import { Pencil } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaRegImage } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { ImageCropperModal } from "./ImageCropperModal";

interface ImageUploaderProps {
  uploadPhoto: (file: File) => Promise<string>;
  isUploading: boolean;
  value?: string; 
  onChange: (url: string) => void; 
  error?: string;
}
 
export const ImageUploader = ({ value, uploadPhoto,  isUploading, onChange, error }: ImageUploaderProps) => {
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(value || null);

  useEffect(() => {
    if (value) {
      setImagePreview(value);
    }
  }, [value]);
  
  const [imageError, setImageError] = useState<string>("");
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [originalImageSrc, setOriginalImageSrc] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setImageError("Please select a valid image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setImageError("Image must be smaller than 5 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const imageDataUrl = reader.result as string;
      setCropSrc(imageDataUrl);
      setOriginalImageSrc(imageDataUrl);
      setSelectedImageFile(file);
      setImageError("");
      setCropModalOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCropConfirm = async (croppedDataUrl: string) => {
    if (!selectedImageFile) return;

    try {
      const croppedBlob = await (await fetch(croppedDataUrl)).blob();
      const croppedFile = new File([croppedBlob], selectedImageFile.name, {
        type: selectedImageFile.type || "image/jpeg",
      });

      setImagePreview(croppedDataUrl);
      setCropModalOpen(false);
      const res = await uploadPhoto(croppedFile);
      onChange(res); // Update react-hook-form value
    } catch {
      setImageError("Image upload failed. Please try again.");
      setImagePreview(null);
      onChange("");
      setCropModalOpen(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageError("");
    setCropSrc(null);
    setOriginalImageSrc(null);
    setSelectedImageFile(null);
    onChange(""); // Clear react-hook-form value
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const editImage = () => {
    setCropSrc(originalImageSrc || imagePreview);
    setCropModalOpen(true);
  };

  const displayError = error || imageError;

  return (
    <div>
      <input
        ref={fileInputRef}
        id="offer-image-input"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
      {imagePreview ? (
        <div className="relative w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50">
          <div className={`relative aspect-[4/3] w-full transition-opacity ${isUploading ? "opacity-50" : "opacity-100"}`}>
            <Image
              src={imagePreview}
              alt="Offer preview"
              fill
              unoptimized
              className="object-cover"
            />
          </div>
          {isUploading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/60">
              <svg
                className="animate-spin h-7 w-7 text-orange-500"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              <span className="text-sm font-baloo text-orange-600 font-semibold">
                Uploading…
              </span>
            </div>
          )}
          {!isUploading && (
            <div className="absolute top-2 right-2 flex items-center gap-2">
              <button
                type="button"
                onClick={editImage}
                className="bg-white border border-gray-200 rounded-full p-1.5 shadow hover:bg-orange-50"
                aria-label="Edit image"
              >
                <Pencil size={16} className="text-orange-500" />
              </button>
              <button
                type="button"
                onClick={removeImage}
                className="bg-white border border-gray-200 rounded-full p-1 shadow hover:bg-red-50"
                aria-label="Remove image"
              >
                <MdClose size={18} className="text-red-500" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`w-full h-32 flex flex-col items-center justify-center gap-2 rounded-xl transition-colors cursor-pointer bg-[#F6F7F8] ${
            displayError
              ? "border-red-400 bg-red-50 border"
              : "border-gray-300 hover:border-orange-400 hover:bg-orange-50 border"
          }`}
        >
          <FaRegImage
            size={30}
            className={displayError ? "text-red-400" : "text-primary"}
          />
          <span className="text-xs text-muted">Upload photo here</span>
        </button>
      )}

      <ImageCropperModal
        isOpen={cropModalOpen}
        imageSrc={cropSrc}
        onClose={() => {
          setCropModalOpen(false);
          if (!imagePreview) {
            setCropSrc(null);
            setOriginalImageSrc(null);
            setSelectedImageFile(null);
          }
        }}
        onConfirm={handleCropConfirm}
      />

      {displayError && (
        <p className="text-red-500 text-xs mt-1">{displayError}</p>
      )}
    </div>
  );
};