"use client";

import { Flag, Globe } from "lucide-react";
import { useState } from "react";
import { TomTomAutocomplete } from "../form/AutoComplete";

interface Props {
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

export const LocationPicker = ({ value, onChange, error }: Props) => {

    const isPreset = value === "Online" || value === "Nationwide";

    const [isAtLocationSelected, setIsAtLocationSelected] = useState(!isPreset && Boolean(value));

    const locationType = isPreset ? value : isAtLocationSelected || value ? "at_a_location" : "";

    const handleTypeSelect = (type: "Online" | "Nationwide" | "at_a_location") => {
        if (type === "Online" || type === "Nationwide") {
            setIsAtLocationSelected(false);
            onChange(type);
        } else {
            setIsAtLocationSelected(true);
            if (value === "Online" || value === "Nationwide") {
                onChange("");
            }
        }
    };

    return (
        <div className="space-y-2">
            <label className="block font-baloo text-base lg:text-lg font-semibold text-black">
                Where is this deal available? <span className="text-red-500">*</span>
            </label>

            <div className="flex flex-col gap-2">
                {(["Online", "Nationwide"] as const).map((option) => (
                    <label
                        key={option}
                        className="flex items-center gap-2 cursor-pointer text-sm text-gray-700"
                    >
                        <input
                            type="radio"
                            name="locationType"
                            checked={locationType === option}
                            onChange={() => handleTypeSelect(option)}
                            className="accent-primary w-4 h-4"
                        />
                        {option}
                    </label>
                ))}
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                    <input
                        type="radio"
                        name="locationType"
                        checked={locationType === "at_a_location"}
                        onChange={() => handleTypeSelect("at_a_location")}
                        className="accent-primary w-4 h-4"
                    />
                    At a location
                </label>
            </div>

            {locationType && <hr className="text-primary/40 border-1 mb-0" />}

            {locationType === "Online" && (
                <div className="flex items-center gap-2 pt-1 text-primary text-xs md:text-sm">
                    <Globe size={16} />
                    This deal is available online
                </div>
            )}

            {locationType === "Nationwide" && (
                <div className="flex items-center gap-2 pt-1 text-primary text-xs md:text-sm">
                    <Flag size={16} />
                    Available across Nigeria
                </div>
            )}

            {locationType === "at_a_location" && (
                <div className="pt-2">
                    <TomTomAutocomplete
                        value={value === "Online" || value === "Nationwide" ? "" : value}
                        onPlaceSelect={onChange}
                        placeholder="Enter deal address e.g, Ikeja city mall, Lagos"
                    />
                </div>
            )}
            {error && (
                <p className="text-xs text-red-500 mt-1">
                    {error}
                </p>
            )}
        </div>
    );
};