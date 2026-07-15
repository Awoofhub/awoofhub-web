"use client";

import { useEffect, useRef, useState } from "react";
import { IoCheckmark, IoChevronDown } from "react-icons/io5";

type Option = {
  value: string;
  label: string;
};

type OfferSelectDropdownProps = {
  placeholder: string;
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  width?: string;
  /** If true the trigger uses the primary (orange) style when no value is selected */
  primaryWhenEmpty?: boolean;
  align?: "left" | "center";
};

export function OfferSelectDropdown({
  placeholder,
  options,
  value,
  onChange,
  width = "w-[130px]",
  primaryWhenEmpty = false,
  align = "left",
}: OfferSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);
  const label = selectedOption?.label ?? placeholder;
  const hasValue = Boolean(value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue === value ? "" : optionValue);
    setIsOpen(false);
  };

  const isPrimary = primaryWhenEmpty && !hasValue;

  return (
    <div className="relative font-baloo text-[16px] font-[500]" ref={containerRef}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={[
          "flex h-12 items-center justify-between gap-2 rounded-[8px] border px-4 text-[16px] font-medium transition",
          width,
          isPrimary || hasValue || isOpen
            ? "border-primary bg-primary text-white"
            : "border-[#595858B2] bg-white text-[#0C0C0C] hover:border-[#737373]",
        ].join(" ")}
      >
        <span className={`truncate ${align === "center" ? "flex-1 text-center" : ""}`}>{label}</span>
        <IoChevronDown
          className={[
            "shrink-0 text-sm transition-transform duration-200",
            isOpen ? "rotate-180" : "",
            isPrimary || hasValue || isOpen ? "text-white" : "text-[#595858]",
          ].join(" ")}
        />
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute left-0 z-30 mt-2 w-max whitespace-nowrap overflow-hidden text-[12px] font-medium rounded-2xl border border-gray-100 bg-white py-1 shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(option.value)}
                className="flex w-full items-center gap-2 border-b border-gray-100 px-4 py-[10px] text-left text-sm text-[#0C0C0C] last:border-0 hover:bg-orange-50 transition-colors"
              >
                <span className="w-4 shrink-0 text-[#12B76A]">
                  {isSelected && <IoCheckmark />}
                </span>
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
