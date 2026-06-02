"use client";

import { useReport } from "@/features/report/useReport";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { BsImage } from "react-icons/bs";
import Image from "next/image";

const reportReasons = [
  { label: "Scam or fraudulent activities", value: "scam" },
  { label: "Misleading information", value: "misleading_information" },
  { label: "Spam or repetitive posting", value: "spam" },
  { label: "Expired or invalid offer", value: "expired_offer" },
  { label: "Inappropriate or Offensive Content", value: "inappropriate_content" },
  { label: "Wrong Category", value: "wrong_category" },
  { label: "Suspicious Payment Request", value: "suspicious_payment" },
  { label: "Broken or Malicious Link", value: "malicious_link" },
  { label: "Others", value: "others" },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  targetType: "offer" | "user";
  targetId: string;
  targetName: string;
  targetEmail?: string | null;
  targetImage?: string | null;
  targetBadge?: string;
}

export default function ReportModal({
  isOpen,
  onClose,
  targetType,
  targetId,
  targetName,
  targetEmail,
  targetImage,
  targetBadge,
}: Props) {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState("");

  const { submit, isPending, isSuccess } = useReport();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (!type) {
      setError("Please select a reason for this report.");
      return;
    }
    setError("");
    submit({ type, targetType, targetId, description });
  };

  const handleClose = () => {
    setType("");
    setDescription("");
    setImagePreview(null);
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-[199]"
        role="button"
        tabIndex={-1}
        onClick={handleClose}
        onKeyDown={handleClose}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[200] w-[90%] max-w-2xl bg-[#F6F7F8] rounded-2xl p-6 shadow-xl font-baloo">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <IoClose size={24} />
        </button>

        <div className="md:flex items-center justify-between mt-4 md:mt-8 md:px-4">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <Image src="/reportFlag.png" width={20} height={20} alt="report" />
            <div>
              <h2 className="text-lg font-semibold text-black">
                {targetType === "offer" ? "Report this Ad" : "Report this Account"}
              </h2>
              <p className="text-muted font-montserrat font-normal text-xs">
                Your reports remain anonymous.
              </p>
            </div>
          </div>

          {/* Target Info Card */}
          <div className="flex items-center gap-3 bg-white shadow-sm rounded-xl p-3 mb-6">
            {targetImage ? (
              <Image
                src={targetImage}
                alt={targetName}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold text-lg">
                  {targetName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <p className="font-semibold font-baloo text-black text-xs mb-1">{targetName}</p>
              {targetEmail && (
                <p className="text-muted font-montserrat text-xs mb-1">{targetEmail}</p>
              )}
              {targetBadge && (
                <p className="text-primary font-montserrat text-xs">{targetBadge}</p>
              )}
            </div>
          </div>
        </div>

        <hr className="text-muted/20" />

        {/* Success Message */}
        {isSuccess ? (
          <div className="text-center py-8">
            <p className="text-green-500 font-bold text-lg mb-2">Report Submitted!</p>
            <p className="text-gray-400 text-sm mb-6">
              Thank you for helping keep AwoofHub safe.
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-primary text-white font-bold rounded-md hover:bg-orange-600 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {/* Reason Dropdown */}
            <div className="mb-4 mt-4 md:px-6">
              <label className="block text-sm font-baloo font-medium text-muted mb-2">
                Reason for this report
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="w-full px-3 py-3 border border-[#D9D9D9] rounded-md text-sm font-baloo outline-none focus:border-primary transition-colors bg-[#F6F7F8] flex items-center justify-between cursor-pointer"
                >
                  <span className={type ? "text-muted" : "text-muted/30"}>
                    {type ? reportReasons.find((r) => r.value === type)?.label : "Select option"}
                  </span>
                  <svg
                    className={`w-4 h-4 text-muted/30 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <ul className="absolute z-10 mt-1 w-full bg-[#F6F7F8] border border-gray-200 rounded-md shadow-md overflow-y-auto max-h-60">
                    {reportReasons.map((reason) => (
                      <li
                        key={reason.value}
                        onClick={() => {
                          setType(reason.value);
                          setIsDropdownOpen(false);
                        }}
                        className={`px-4 py-2.5 text-sm font-baloo cursor-pointer transition-colors hover:bg-primary hover:text-white ${
                          type === reason.value ? "bg-primary/10 text-primary" : "text-gray-600"
                        }`}
                      >
                        {reason.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-4 md:px-6">
              <label className="block text-sm font-baloo font-medium text-muted mb-2">
                Give more details
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="write short note, you remain anonymous"
                rows={3}
                className="w-full px-3 py-2 border border-[#D9D9D9] rounded-md text-sm font-baloo outline-none focus:border-primary transition-colors placeholder:text-muted/30 resize-none"
              />
            </div>

            {/* Image Upload */}
            <div className="flex items-center gap-4 mb-6 md:px-4">
              <div className="flex flex-col text-center items-center gap-3 shrink-0">
                <BsImage className="text-primary w-6 h-6 shrink-0" />
                <p className="text-xs text-muted font-montserrat font-normal w-32">
                  Upload photo or screenshot evidence (optional)
                </p>
              </div>
              <label className="w-28 h-24 bg-muted/10 rounded-lg flex items-center justify-center cursor-pointer hover:bg-primary/5 transition-colors flex-shrink-0">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="preview"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <span className="text-primary text-2xl font-light">+</span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Error */}
            {error && <p className="text-red-500 text-sm mb-4 md:px-6">{error}</p>}

            {/* Buttons */}
            <div className="flex justify-end gap-2 md:px-4">
              <button
                onClick={handleClose}
                className="px-6 py-2 border border-primary text-primary font-medium rounded-md hover:bg-orange-50 transition-colors"
              >
                Discard
              </button>
              <button
                onClick={handleSubmit}
                disabled={isPending}
                className="px-6 py-2 bg-primary text-white font-medium rounded-md hover:bg-orange-600 transition-colors disabled:opacity-50"
              >
                {isPending ? "Submitting..." : "Submit"}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}