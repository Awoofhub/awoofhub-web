// components/community/JoinCommunityForm.tsx
"use client";
import { Button } from "@/components/button/Button";
import { TomTomAutocomplete } from "@/components/form/AutoComplete";
import { InputField } from "@/components/form/InputField";
import { JoinCommunitySuccessModal } from "@/components/modals/JoinCommunitySuccessModal";
import { useJoinCommunity } from "@/features/community/useJoinCommunity";
import { JoinCommunityData } from "@/types/community";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const DEAL_DISCOVERY_OPTIONS = [
    "Brand websites",
    "Instagram",
    "Facebook",
    "X (Twitter)",
    "Telegram",
    "WhatsApp",
    "Email newsletters",
    "Retail stores",
    "Others",
];

const HEAR_ABOUT_US_OPTIONS = [
    "Instagram",
    "Facebook",
    "LinkedIn",
    "X (Twitter)",
    "TikTok",
    "WhatsApp",
    "Internet Ads",
    "Influencers",
    "Referrals",
    "Others",
];

const YES_NO_OPTIONS = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
];

const LABEL_CLS = "font-baloo text-base leading-tight! lg:text-lg font-medium";

interface JoinCommunityFormValues {
    name: string;
    email: string;
    phoneNumber: string;
    cityOrState: string;
    occupation: string;
    dealDiscoverySource: string;
    hasModerationExperience: string;
    hasUsedDealWebsites: string;
    howDidYouHearAboutUs: string;
    recentDeal?: string;
    understandsExpectations: boolean;
}

export const JoinCommunityForm = () => {
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const { register, handleSubmit, formState, reset, watch, setValue, control } =
        useForm<JoinCommunityFormValues>();

    const dealDiscoverySource = watch("dealDiscoverySource");
    const hasModerationExperience = watch("hasModerationExperience");
    const hasUsedDealWebsites = watch("hasUsedDealWebsites");
    const howDidYouHearAboutUs = watch("howDidYouHearAboutUs");

    const [dealDiscoveryOpen, setDealDiscoveryOpen] = useState(false);
    const [moderationOpen, setModerationOpen] = useState(false);
    const [dealWebsitesOpen, setDealWebsitesOpen] = useState(false);
    const [hearAboutUsOpen, setHearAboutUsOpen] = useState(false);

    const dealDiscoveryRef = useRef<HTMLDivElement>(null);
    const moderationRef = useRef<HTMLDivElement>(null);
    const dealWebsitesRef = useRef<HTMLDivElement>(null);
    const hearAboutUsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dealDiscoveryRef.current &&
                !dealDiscoveryRef.current.contains(e.target as Node)
            ) {
                setDealDiscoveryOpen(false);
            }
            if (
                moderationRef.current &&
                !moderationRef.current.contains(e.target as Node)
            ) {
                setModerationOpen(false);
            }
            if (
                dealWebsitesRef.current &&
                !dealWebsitesRef.current.contains(e.target as Node)
            ) {
                setDealWebsitesOpen(false);
            }
            if (
                hearAboutUsRef.current &&
                !hearAboutUsRef.current.contains(e.target as Node)
            ) {
                setHearAboutUsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const onSuccess = () => {
        reset();
        setShowSuccessModal(true);
    };

    const { submit, isPending } = useJoinCommunity({ onSuccess });

    const onSubmit = (data: JoinCommunityFormValues) => {
        const {
            understandsExpectations,
            hasModerationExperience,
            hasUsedDealWebsites,
            phoneNumber,
            ...rest
        } = data;

        const payload: JoinCommunityData = {
            ...rest,
            phoneNumber: `+234${phoneNumber}`,
            hasModerationExperience: hasModerationExperience === "yes",
            hasUsedDealWebsites: hasUsedDealWebsites === "yes",
        };

        submit(payload);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                <InputField
                    label="Full name"
                    placeholder="John Debby"
                    labelClassName="font-medium! font-baloo! text-base! lg:text-lg!"
                    compulsory
                    type="text"
                    {...register("name", { required: "Full name is required" })}
                    error={formState.errors["name"]}
                />

                <InputField
                    label="Email address"
                    placeholder="you@email.com"
                    compulsory
                    labelClassName="font-medium! font-baloo! text-base! lg:text-lg!"
                    type="email"
                    className="py-3!"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email address",
                        },
                    })}
                    error={formState.errors["email"]}
                />

                <div>
                    <label className={LABEL_CLS}>
                        Phone number (WhatsApp preferred)
                        <span className="text-red-500"> *</span>
                    </label>
                    <input
                        type="text"
                        placeholder="+234 801 234 5678"
                        className="w-full mt-2 px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-sm lg:text-base"
                        {...register("phoneNumber", {
                            required: "Phone number is required",
                        })}
                    />
                    {formState.errors.phoneNumber && (
                        <p className="text-red-500 text-xs mt-1">
                            {formState.errors.phoneNumber.message}
                        </p>
                    )}
                </div>

                <label className={LABEL_CLS}>
                    City/State<span className="text-red-500"> *</span>
                </label>
                <Controller
                    name="cityOrState"
                    control={control}
                    rules={{ required: "City/State is required" }}
                    render={({ field, fieldState }) => (
                        <TomTomAutocomplete
                            value={field.value}
                            onPlaceSelect={field.onChange}
                            error={fieldState.error}
                            placeholder="e.g Ikeja, Lagos State"
                        />
                    )}
                />
                {formState.errors.cityOrState && (
                    <p className="text-red-500 text-xs mt-1">
                        {formState.errors.cityOrState.message}
                    </p>
                )}

                <InputField
                    label="Occupation"
                    placeholder="e.g Content creator"
                    compulsory
                    labelClassName="font-medium! font-baloo! text-base! lg:text-lg!"
                    type="text"
                    {...register("occupation", {
                        required: "Occupation is required",
                    })}
                    error={formState.errors["occupation"]}
                />

                <div className="space-y-2">
                    <label className={LABEL_CLS}>
                        Where do you usually discover deals?
                        <span className="text-red-500"> *</span>
                    </label>
                    <div ref={dealDiscoveryRef} className="relative">
                        <button
                            type="button"
                            onClick={() => setDealDiscoveryOpen((p) => !p)}
                            className="w-full py-3 px-3 flex mt-2 items-center justify-between border border-gray-300 rounded-md bg-white text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            <span
                                className={
                                    dealDiscoverySource ? "text-gray-900" : "text-gray-400"
                                }
                            >
                                {dealDiscoverySource || "Select option"}
                            </span>
                            <ChevronDown
                                size={18}
                                className={`transition-transform ${dealDiscoveryOpen ? "rotate-180" : ""}`}
                            />
                        </button>
                        {dealDiscoveryOpen && (
                            <ul className="absolute z-50 right-0 w-50 mt-2 py-2 px-4 bg-white border border-gray-200 rounded-md shadow-lg max-h-72 overflow-y-auto">
                                {DEAL_DISCOVERY_OPTIONS.map((option) => (
                                    <li
                                        key={option}
                                        onClick={() => {
                                            setValue("dealDiscoverySource", option, {
                                                shouldValidate: true,
                                            });
                                            setDealDiscoveryOpen(false);
                                        }}
                                        className="px-3 py-1 cursor-pointer hover:bg-orange-50 font-baloo text-base border-b border-muted/20 last:border-none flex items-center justify-between text-gray-900"
                                    >
                                        <span className="flex items-center gap-1">
                                            {dealDiscoverySource === option && (
                                                <span className="text-[#12B76A]">✓</span>
                                            )}
                                            {option}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <input
                        type="hidden"
                        {...register("dealDiscoverySource", {
                            required: "Please select an option",
                        })}
                    />
                    {formState.errors.dealDiscoverySource && (
                        <p className="text-red-500 text-xs mt-1">
                            {formState.errors.dealDiscoverySource.message}
                        </p>
                    )}
                </div>

                {/* Have you ever been a community moderator or contributor? */}
                <div className="space-y-2">
                    <label className={LABEL_CLS}>
                        Have you ever been a community moderator or contributor?
                        <span className="text-red-500"> *</span>
                    </label>
                    <div ref={moderationRef} className="relative">
                        <button
                            type="button"
                            onClick={() => setModerationOpen((p) => !p)}
                            className="w-full py-3 px-3 flex items-center mt-2 justify-between border border-gray-300 rounded-md bg-white text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            <span
                                className={
                                    hasModerationExperience ? "text-gray-900" : "text-gray-400"
                                }
                            >
                                {YES_NO_OPTIONS.find(
                                    (o) => o.value === hasModerationExperience
                                )?.label || "Select option"}
                            </span>
                            <ChevronDown
                                size={18}
                                className={`transition-transform ${moderationOpen ? "rotate-180" : ""}`}
                            />
                        </button>
                        {moderationOpen && (
                            <ul className="absolute z-50 right-0 w-50 mt-2 py-2 px-4 bg-white border border-gray-200 rounded-md shadow-lg">
                                {YES_NO_OPTIONS.map((option) => (
                                    <li
                                        key={option.value}
                                        onClick={() => {
                                            setValue("hasModerationExperience", option.value, {
                                                shouldValidate: true,
                                            });
                                            setModerationOpen(false);
                                        }}
                                        className="px-3 py-1 cursor-pointer hover:bg-orange-50 font-baloo text-base border-b border-muted/20 last:border-none flex items-center justify-between text-gray-900"
                                    >
                                        <span className="flex items-center gap-1">
                                            {hasModerationExperience === option.value && (
                                                <span className="text-[#12B76A]">✓</span>
                                            )}
                                            {option.label}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <input
                        type="hidden"
                        {...register("hasModerationExperience", {
                            required: "Please select an option",
                        })}
                    />
                    {formState.errors.hasModerationExperience && (
                        <p className="text-red-500 text-xs mt-1">
                            {formState.errors.hasModerationExperience.message}
                        </p>
                    )}
                </div>

                {/* Have you used cashback, coupon, or deal websites before? */}
                <div className="space-y-2">
                    <label className={LABEL_CLS}>
                        Have you used cashback, coupon, or deal websites before?
                        <span className="text-red-500"> *</span>
                    </label>
                    <div ref={dealWebsitesRef} className="relative">
                        <button
                            type="button"
                            onClick={() => setDealWebsitesOpen((p) => !p)}
                            className="w-full mt-2 py-3 px-3 flex items-center justify-between border border-gray-300 rounded-md bg-white text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            <span
                                className={
                                    hasUsedDealWebsites ? "text-gray-900" : "text-gray-400"
                                }
                            >
                                {YES_NO_OPTIONS.find((o) => o.value === hasUsedDealWebsites)
                                    ?.label || "Select option"}
                            </span>
                            <ChevronDown
                                size={18}
                                className={`transition-transform ${dealWebsitesOpen ? "rotate-180" : ""}`}
                            />
                        </button>
                        {dealWebsitesOpen && (
                            <ul className="absolute z-50 right-0 w-40 mt-2 py-2 px-4 bg-white border border-gray-200 rounded-md shadow-lg">
                                {YES_NO_OPTIONS.map((option) => (
                                    <li
                                        key={option.value}
                                        onClick={() => {
                                            setValue("hasUsedDealWebsites", option.value, {
                                                shouldValidate: true,
                                            });
                                            setDealWebsitesOpen(false);
                                        }}
                                        className="px-3 py-1 cursor-pointer hover:bg-orange-50 font-baloo text-base border-b border-muted/20 last:border-none flex items-center justify-between text-gray-900"
                                    >
                                        <span className="flex items-center gap-1">
                                            {hasUsedDealWebsites === option.value && (
                                                <span className="text-[#12B76A]">✓</span>
                                            )}
                                            {option.label}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <input
                        type="hidden"
                        {...register("hasUsedDealWebsites", {
                            required: "Please select an option",
                        })}
                    />
                    {formState.errors.hasUsedDealWebsites && (
                        <p className="text-red-500 text-xs mt-1">
                            {formState.errors.hasUsedDealWebsites.message}
                        </p>
                    )}
                </div>

                {/* How did you hear about us? */}
                <div className="space-y-2">
                    <label className={LABEL_CLS}>
                        How did you hear about us?
                        <span className="text-red-500"> *</span>
                    </label>
                    <div ref={hearAboutUsRef} className="relative">
                        <button
                            type="button"
                            onClick={() => setHearAboutUsOpen((p) => !p)}
                            className="w-full mt-2 py-3 px-3 flex items-center justify-between border border-gray-300 rounded-md bg-white text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            <span
                                className={
                                    howDidYouHearAboutUs ? "text-gray-900" : "text-gray-400"
                                }
                            >
                                {howDidYouHearAboutUs || "Select option"}
                            </span>
                            <ChevronDown
                                size={18}
                                className={`transition-transform ${hearAboutUsOpen ? "rotate-180" : ""}`}
                            />
                        </button>
                        {hearAboutUsOpen && (
                            <ul className="absolute z-50 right-0 w-50 mt-2 py-2 px-4 bg-white border border-gray-200 rounded-md shadow-lg max-h-72 overflow-y-auto">
                                {HEAR_ABOUT_US_OPTIONS.map((option) => (
                                    <li
                                        key={option}
                                        onClick={() => {
                                            setValue("howDidYouHearAboutUs", option, {
                                                shouldValidate: true,
                                            });
                                            setHearAboutUsOpen(false);
                                        }}
                                        className="px-3 py-1 cursor-pointer hover:bg-orange-50 font-baloo text-base border-b border-muted/20 last:border-none flex items-center justify-between text-gray-900"
                                    >
                                        <span className="flex items-center gap-1">
                                            {howDidYouHearAboutUs === option && (
                                                <span className="text-[#12B76A]">✓</span>
                                            )}
                                            {option}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <input
                        type="hidden"
                        {...register("howDidYouHearAboutUs", {
                            required: "Please select an option",
                        })}
                    />
                    {formState.errors.howDidYouHearAboutUs && (
                        <p className="text-red-500 text-xs mt-1">
                            {formState.errors.howDidYouHearAboutUs.message}
                        </p>
                    )}
                </div>

                <InputField
                    label="Share one recent deal you found that others would appreciate."
                    placeholder="Your answer"
                    labelClassName="font-medium! font-baloo! text-base! lg:text-lg! leading-tight!"
                    type="textarea"
                    {...register("recentDeal")}
                    error={formState.errors["recentDeal"]}
                />

                <label className="flex items-start gap-2 text-sm text-black cursor-pointer">
                    <input
                        type="checkbox"
                        className="mt-1 w-4 h-4 rounded accent-primary"
                        {...register("understandsExpectations", {
                            required: "You must agree before joining",
                        })}
                    />
                    I understand that community members are expected to submit accurate
                    offers, verify offers assigned to them, and participate in weekly
                    community activities.
                </label>
                {formState.errors.understandsExpectations && (
                    <p className="text-red-500 text-xs -mt-4">
                        {formState.errors.understandsExpectations.message}
                    </p>
                )}

                <Button type="submit" isLoading={isPending} isDisabled={isPending}>
                    Join Now
                </Button>
            </form>

            {showSuccessModal && (
                <JoinCommunitySuccessModal
                    onClose={() => setShowSuccessModal(false)}
                />
            )}
        </>
    );
};