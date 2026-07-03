"use client";

import { useReport } from "@/features/report/useReport";
import { useState, useRef, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import ReportConfirmationModal from "./ReportConfirmationModal";

const reportReasons = [
  { label: "Spam or repetitive posting", value: "spam" },
  { label: "Scam or fraudulent activities", value: "scam" },
  { label: "Explicit content", value: "explicit" },
  { label: "Violence", value: "violence" },
  { label: "Abuse", value: "abuse" },
  { label: "Illegal activity", value: "illegal" },
  { label: "Self harm", value: "self_harm" },
  { label: "Others", value: "other" },
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
}: Props) {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { submit, isPending, isSuccess } = useReport();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


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
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  if (isSuccess) {
    return <ReportConfirmationModal isOpen={isSuccess} onDone={handleClose} />;
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-[199]"
        role="button"
        tabIndex={-1}
        onClick={handleClose}
        onKeyDown={handleClose}
      />

      <div className="fixed p-6 md:p-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-200 w-[90%] max-w-2xl bg-white rounded-2xl  shadow-xl">
        <button
          onClick={handleClose}
          className="absolute top-4 right-6 text-black hover:text-gray-600 transition-colors"
        >
          <IoClose size={24} />
        </button>

        <div className="flex items-center gap-3 my-6">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#CD0F0F1A] shrink-0">
            <Image src="/reportFlag.png" width={20} height={18} alt="report" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-black">
              {targetType === "offer"
                ? "Report this Deal"
                : "Report this Account"}
            </h2>
            <p className="text-muted text-xs md:text-sm lg:text-base">
              Your reports remain anonymous.
            </p>
          </div>
        </div>

        <hr className="text-muted/20" />

        {/* Reason Dropdown */}
        <div className="mb-4 mt-4">
          <label className="block text-sm md:text-lg font-baloo font-medium text-muted mb-1">
            Reason for this report
          </label>
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="w-full h-12 px-3 flex items-center justify-between border border-gray-300 rounded-md bg-white text-muted text-xs xs:text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <span className={type ? "text-gray-900" : "text-gray-400"}>
                {type
                  ? reportReasons.find((r) => r.value === type)?.label
                  : "Select option"}
              </span>
              <ChevronDown
                size={18}
                className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isDropdownOpen && (
              <ul className="absolute z-50 right-0 max-w-70 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto no-scrollbar">
                {reportReasons.map((reason) => (
                  <li
                    key={reason.value}
                    onClick={() => {
                      setType(reason.value);
                      setIsDropdownOpen(false);
                    }}
                    className={`px-4 py-3 cursor-pointer hover:bg-orange-50 font-baloo text-base border-b border-muted/20 last:border-none flex items-center gap-2 ${
                      type === reason.value
                        ? "font-semibold"
                        : "text-gray-800"
                    }`}
                  >
                    {type === reason.value && (
                      <span className="text-[#12B76A]">✓</span>
                    )}
                    {reason.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm md:text-lg font-baloo font-medium text-muted mb-1">
            Give more details
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a short note, you remain anonymous"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-xs xs:text-sm lg:text-base  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col-reverse xs:flex-row justify-end gap-2">
          <button
            onClick={handleClose}
            className="px-6 py-2 border text-xs xs:text-sm border-primary text-primary font-medium rounded-md hover:bg-orange-50 transition-colors"
          >
            Discard
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="px-6 py-2 bg-primary text-xs xs:text-sm text-white font-medium rounded-md hover:bg-orange-600 transition-colors disabled:opacity-50"
          >
            {isPending ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
}