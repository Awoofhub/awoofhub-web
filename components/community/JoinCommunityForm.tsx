"use client";
import { Button } from "@/components/button/Button";
import { TomTomAutocomplete } from "@/components/form/AutoComplete";
import { InputField } from "@/components/form/InputField";
import { useJoinCommunity } from "@/features/community/useJoinCommunity";
import { JoinCommunityData } from "@/types/community";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormSelectDropdown } from "../form/FormSelectDropdown";
import JoinCommunitySuccessModal from "../modals/community/JoinCommunitySuccessModal";

const DEAL_DISCOVERY_OPTIONS = [
    { value: undefined, label: "Select option" },
    { label: "Brand websites", value: "Brand websites" },
    { label: "Instagram", value: "Instagram" },
    { label: "Facebook", value: "Facebook" },
    { label: "X (Twitter)", value: "X (Twitter)" },
    { label: "Telegram", value: "Telegram" },
    { label: "WhatsApp", value: "WhatsApp" },
    { label: "Email newsletters", value: "Email newsletters" },
    { label: "Retail stores", value: "Retail stores" },
    { label: "Other", value: "Other" },
];

const HEAR_ABOUT_US_OPTIONS = [
    { value: undefined, label: "Select option" },
    { label: "Instagram", value: "Instagram" },
    { label: "Facebook", value: "Facebook" },
    { label: "Linkedin", value: "Linkedin" },
    { label: "X (Twitter)", value: "X (Twitter)" },
    { label: "Tiktok", value: "Tiktok" },
    { label: "Whatsapp", value: "Whatsapp" },
    { label: "Internet Ads", value: "Internet Ads" },
    { label: "Influencers", value: "Influencers" },
    { label: "From a friend", value: "From a friend" },
    { label: "Organisation or Club", value: "Organisation or Club" },
    { label: "Other", value: "Other" },
];

const YES_NO_OPTIONS = [
    { value: undefined, label: "Select option" },
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
];

const LABEL_CLS = "font-medium font-baloo text-base lg:text-lg"

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
    recentDeal: string;
    understandsExpectations: boolean;
}

export default function JoinCommunityForm() {
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const { register, handleSubmit, formState, reset, control, watch } = useForm<JoinCommunityFormValues>();


    const onSuccess = () => {
        reset();
        setShowSuccessModal(true);
    };

    const { submit, isPending } = useJoinCommunity({ onSuccess });

    const understandsExpectations = watch("understandsExpectations");

    const onSubmit = (data: JoinCommunityFormValues) => {
        const {
            hasModerationExperience,
            hasUsedDealWebsites,
            understandsExpectations,
            ...rest
        } = data;

        const payload: JoinCommunityData = {
            ...rest,
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
                    labelClassName={LABEL_CLS}
                    compulsory
                    type="text"
                    {...register("name", { required: "Full name is required" })}
                    error={formState.errors.name}
                />

                <InputField
                    label="Email address"
                    placeholder="you@email.com"
                    compulsory
                    labelClassName={LABEL_CLS}
                    type="email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email address",
                        },
                    })}
                    error={formState.errors.email}
                />

                <InputField
                    label="Phone number (WhatsApp preferred)"
                    placeholder="+234 801 234 5678"
                    labelClassName="font-medium! font-baloo! text-base! lg:text-lg!"
                    compulsory
                    type="text"
                    {...register("phoneNumber", { required: "Phone number is required" })}
                    error={formState.errors.phoneNumber}
                />

                <Controller
                    name="cityOrState"
                    control={control}
                    rules={{ required: "City is required" }}
                    render={({ field, fieldState }) => (
                        <TomTomAutocomplete
                            label="City/State"
                            labelClassName={LABEL_CLS}
                            error={fieldState.error}
                            value={field.value}
                            onPlaceSelect={field.onChange}
                            placeholder="e.g Ikeja, Lagos State"
                            compulsory={true}
                        />
                    )}
                />

                <InputField
                    label="Occupation"
                    placeholder="e.g Content creator"
                    compulsory
                    labelClassName={LABEL_CLS}
                    type="text"
                    {...register("occupation", {
                        required: "Occupation is required",
                    })}
                    error={formState.errors["occupation"]}
                />


                <Controller
                    name="dealDiscoverySource"
                    control={control}
                    rules={{ required: "Please select an option", }}
                    render={({ field, fieldState }) => (
                        <FormSelectDropdown
                            label="Where do you usually discover deals?"
                            labelClassName={LABEL_CLS}
                            data={DEAL_DISCOVERY_OPTIONS}
                            value={field.value}
                            compulsory={true}
                            onChange={field.onChange}
                            error={fieldState.error?.message}
                        />
                    )}
                />


                <Controller
                    name="hasModerationExperience"
                    control={control}
                    rules={{ required: "Please select an option", }}
                    render={({ field, fieldState }) => (
                        <FormSelectDropdown
                            label="Have you ever been a community moderator or contributor?"
                            labelClassName={LABEL_CLS}
                            data={YES_NO_OPTIONS}
                            value={field.value}
                            compulsory={true}
                            onChange={field.onChange}
                            error={fieldState.error?.message}
                        />
                    )}
                />


                <Controller
                    name="hasUsedDealWebsites"
                    control={control}
                    rules={{ required: "Please select an option", }}
                    render={({ field, fieldState }) => (
                        <FormSelectDropdown
                            label="Have you used cashback, coupon, or deal websites before?"
                            labelClassName={LABEL_CLS}
                            data={YES_NO_OPTIONS}
                            value={field.value}
                            compulsory={true}
                            onChange={field.onChange}
                            error={fieldState.error?.message}
                        />
                    )}
                />


                <Controller
                    name="howDidYouHearAboutUs"
                    control={control}
                    rules={{ required: "Please select an option", }}
                    render={({ field, fieldState }) => (
                        <FormSelectDropdown
                            label="How did you hear about us?"
                            labelClassName={LABEL_CLS}
                            data={HEAR_ABOUT_US_OPTIONS}
                            value={field.value}
                            compulsory={true}
                            onChange={field.onChange}
                            error={fieldState.error?.message}
                        />
                    )}
                />

                <InputField
                    label="Share one recent deal you found that others would appreciate."
                    placeholder="Your answer"
                    labelClassName="font-medium! font-baloo! text-base! lg:text-lg! leading-tight!"
                    type="textarea"
                    compulsory
                    {...register("recentDeal", {
                        required: "This section is required",
                        minLength: {
                            value: 20,
                            message: "Must not be less than 20 characters",
                        },
                    })}
                    error={formState.errors.recentDeal}
                />

                <label className="flex items-start gap-2 text-sm text-black cursor-pointer">
                    <input
                        type="checkbox"
                        className="mt-1 w-4 h-4 rounded accent-primary"
                        {...register("understandsExpectations")}
                    />
                    I understand that community members are expected to submit accurate
                    offers, verify offers assigned to them, and participate in weekly
                    community activities.
                </label>

                <Button type="submit" isLoading={isPending} isDisabled={isPending || !understandsExpectations}>
                    Join Now
                </Button>
            </form>


            <JoinCommunitySuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />

        </>
    );
};