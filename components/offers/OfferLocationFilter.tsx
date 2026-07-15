"use client";

import { useEffect, useRef, useState } from "react";
import { IoCheckmark, IoChevronDown } from "react-icons/io5";
import { TomTomAutocomplete } from "../form/AutoComplete";

type LocationValue = "Online" | "Nationwide" | "specific";

type OfferLocationFilterProps = {
  location?: string;
  onChange: (location: string) => void;
};

export function OfferLocationFilter({
  location,
  onChange,
}: OfferLocationFilterProps) {
  const isPresetLocation = location === "Online" || location === "Nationwide";
  const [isOpen, setIsOpen] = useState(false);
  const [isSpecificLocation, setIsSpecificLocation] = useState(
    Boolean(location && !isPresetLocation),
  );
  const [searchValue, setSearchValue] = useState(
    !isPresetLocation ? (location ?? "") : "",
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const hasValue = Boolean(location);
  const selected: LocationValue | null=hasValue? (location === "Online" || location ==="Nationwide"? location:"specific"):null
  const label = isPresetLocation
    ? location
    : location && !isPresetLocation
      ? location
      : "Location";

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-focus input when specific location is chosen
  useEffect(() => {
    if (isSpecificLocation && isOpen) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isSpecificLocation, isOpen]);

  const chooseLocation = (value: LocationValue) => {
    if (value === "specific") {
      setIsSpecificLocation(true);
      // keep panel open to show search input
      return;
    }
    setIsSpecificLocation(false);
    setSearchValue("");
    onChange(value);
    setIsOpen(false);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const trimmed = searchValue.trim();
      if (trimmed) {
        onChange(trimmed);
        setIsOpen(false);
      }
    }
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative z-20 font-baloo text-[16px] font-medium" ref={containerRef}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={[
          "flex py-2 cursor-pointer items-center justify-between gap-2 rounded-2xl border px-3 text-sm xs:text-base font-medium transition",
          hasValue || isOpen
            ? "border-primary bg-primary text-white"
            : "border-[#595858B2] bg-white text-[#0C0C0C] hover:border-[#737373]",
        ].join(" ")}
      >
        <span className="truncate">{label}</span>
        <IoChevronDown
          className={[
            "shrink-0 text-sm transition-transform duration-200",
            isOpen ? "rotate-180" : "",
            hasValue || isOpen ? "text-white" : "text-[#595858]",
          ].join(" ")}
        />
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Location"
          className="absolute left-0 z-30 mt-2 w-max whitespace-nowrap overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
        >
          {/* Options list */}
          {(["Online", "Nationwide", "specific"] as const).map((value) => {
            const optionLabel =
              value === "specific" ? "Specific Location" : value;
            const isSelected = value=== "specific" ? isSpecificLocation :selected === value;

            return (
              <button
                key={value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => chooseLocation(value)}
                className="flex w-50 items-center gap-2 border-b border-gray-100 px-4 py-[10px] text-left text-sm text-[#0C0C0C] last:border-0 hover:bg-orange-50 transition-colors"
              >
                <span className="w-4 shrink-0 text-[#12B76A]">
                  {isSelected && <IoCheckmark />}
                </span>
                {optionLabel}
              </button>
            );
          })}
        </div>
      )}

      {/* Search input — floats below the dropdown when "Specific Location" is active */}
      {isSpecificLocation && isOpen && (
        <div className="absolute left-0 z-30 top-[188px] w-max rounded-[14.12px] px-[16px] border-1 border-[#59585880]">
          <TomTomAutocomplete
            value={searchValue}
            onPlaceSelect={(val: string) => {
              setSearchValue(val);
              if (val) {
                onChange(val);
                setIsOpen(false);
              }
            }}
            placeholder="Search a city or area e.g. Ikeja, Lagos."
          />
        </div>
      )}
    </div>
  );
}
