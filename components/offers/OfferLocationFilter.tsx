"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const [isSpecificLocation, setIsSpecificLocation] = useState(
    Boolean(location && !isPresetLocation),
  );
  const [searchValue, setSearchValue] = useState(
    !isPresetLocation ? (location ?? "") : "",
  );
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const updatePosition = () => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (rect) {
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
      });
    }
  };

  const hasValue = Boolean(location);
  const selected: LocationValue | null = hasValue
    ? (location === "Online" || location === "Nationwide" ? location : "specific")
    : null;
  const label = isPresetLocation
    ? location
    : location && !isPresetLocation
      ? location
      : "Location";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current && !triggerRef.current.contains(target) &&
        panelRef.current && !panelRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isSpecificLocation && isOpen) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isSpecificLocation, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleReposition = () => updatePosition();

    window.addEventListener("scroll", handleReposition, true);
    window.addEventListener("resize", handleReposition);

    return () => {
      window.removeEventListener("scroll", handleReposition, true);
      window.removeEventListener("resize", handleReposition);
    };
  }, [isOpen]);

  const toggle = () => {
    if (!isOpen) {
      updatePosition();
    }
    setIsOpen((open) => !open);
  };

  const chooseLocation = (value: LocationValue) => {
    if (value === "specific") {
      setIsSpecificLocation(true);
      return;
    }
    setIsSpecificLocation(false);
    setSearchValue("");
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative font-baloo text-[16px] font-medium">
      <button
        ref={triggerRef}
        type="button"
        onClick={toggle}
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

      {isOpen && position && createPortal(
        <div
          ref={panelRef}
          style={{
            position: "absolute",
            top: position.top,
            left: position.left,
          }}
          className="z-50"
        >
          <div
            role="listbox"
            aria-label="Location"
            className="w-max whitespace-nowrap overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
          >
            {(["Online", "Nationwide", "specific"] as const).map((value) => {
              const optionLabel =
                value === "specific" ? "Specific Location" : value;
              const isSelected = value === "specific" ? isSpecificLocation : selected === value;

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

          {isSpecificLocation && (
            <div className="mt-2 w-max rounded-[14.12px] px-[16px] border-1 border-[#59585880] bg-white">
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
        </div>,
        document.body
      )}
    </div>
  );
}