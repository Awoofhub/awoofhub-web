"use client";

import dayjs from "dayjs";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { useCategory } from "@/features/category/useCategory";
import { useCreateOffer } from "@/features/offers/useCreateOffer";
import { useUploadSinglePhoto } from "@/features/upload/useUpdateProfilePhoto";

import { CreateOfferFormProps } from "@/types/form-props";
import { CreateOfferData } from "@/types/offer";

import { FiUploadCloud } from "react-icons/fi";
import { MdClose } from "react-icons/md";

import { Button } from "@/components/button/Button";
import { DatePickerField } from "../date/DatePickerField";
import { GoogleAutocompleteNew } from "../form/AutoComplete";
import { InputField } from "../form/InputField";
import { SuccessModal } from "./SuccessModal";

// Deal-type options
const DEAL_TYPES: { label: string; value: CreateOfferData["dealType"] }[] = [
    { label: "Cash Back", value: "cashback" },
    { label: "Freebie", value: "freebie" },
    { label: "Discount", value: "discount" },
    { label: "Buy One Get One", value: "bogo" },
    { label: "Promo Code", value: "promo_code" },
    { label: "Free Trial", value: "free_trial" },
    { label: "Free Delivery", value: "free_delivery" },
];

// Shared select class
const SELECT_CLS =
    "w-full h-12 px-3 border border-gray-300 rounded-md bg-[#F6F7F8] " +
    "text-gray-700 font-baloo text-base " +
    "focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 " +
    "transition-shadow appearance-none cursor-pointer";

// Shared label class 
const LABEL_CLS = "block font-baloo text-lg font-semibold text-gray-700 mb-1";


export const CreateOfferForm = ({ onSuccess }: CreateOfferFormProps) => {
    const { data: categories } = useCategory();
    const { uploadPhoto, isPending: isUploading } = useUploadSinglePhoto();


    const [showSuccess, setShowSuccess] = useState(false);


    const createOffer = useCreateOffer({
        onSuccess: () => setShowSuccess(true),
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageError, setImageError] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    //React Hook Form 
    const {
        register,
        handleSubmit,
        formState,
        control,
        watch,
        setValue,
    } = useForm<CreateOfferData>({
        defaultValues: {
            category: "",
            dealType: undefined,
            imageUrl: "",
            endDate: null,
            brandName: "",
            value: "",
            location: "",
            externalLink: "",
        },
    });

    const category = watch("category");
    // Watch dealType so we can conditionally show the Coupon Code field
    const dealType = watch("dealType");


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
        reader.onload = () => setImagePreview(reader.result as string);
        reader.readAsDataURL(file);
        setImageError("");

        try {
            const res = await uploadPhoto(file);
            const url: string = res.data;

            setValue("imageUrl", url, { shouldValidate: true, shouldDirty: true });
        } catch {
            setImageError("Image upload failed. Please try again.");
            setImagePreview(null);
            setValue("imageUrl", "", { shouldValidate: true, shouldDirty: true });
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    // ── Remove image ──
    const removeImage = () => {
        setImagePreview(null);
        setImageError("");
        setValue("imageUrl", "", { shouldValidate: true, shouldDirty: true });
        if (fileInputRef.current) fileInputRef.current.value = "";
    };


    const onSubmit = (data: CreateOfferData) => {
        if (!data.imageUrl) {
            setImageError("Please upload an offer image.");
            return;
        }

        createOffer.submit({
            ...data,
            // Normalise the date to a full ISO-8601 string the backend expects
            endDate: data.endDate
                ? dayjs(data.endDate).toISOString()
                : null,
        });
    };

    const isBusy = createOffer.isPending || isUploading;

    return (
        <div className="mt-5 mb-30 lg:mb-10 mx-auto w-full max-w-2xl">

            {/*  Success modal  */}
            {showSuccess && (
                <SuccessModal

                    onDone={() => {
                        setShowSuccess(false);
                        onSuccess();
                    }}
                />
            )}

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

                {/*  Category  */}
                <div className="space-y-1">
                    <label className={LABEL_CLS}>
                        Category <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <select
                            {...register("category", {
                                required: "Category is required",
                            })}
                            className={SELECT_CLS}
                        >
                            <option value="" >Select option</option>
                            {categories?.map((cat) => (
                                <option key={cat.id} value={cat.name}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">▾</span>
                    </div>
                    {formState.errors.category && (
                        <p className="text-red-500 text-xs mt-1">{formState.errors.category.message}</p>
                    )}
                </div>

                {/*  Deal Type  */}
                <div className="space-y-1">
                    <label className={LABEL_CLS}>
                        Deal Type <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <select
                            {...register("dealType", {
                                required: "Deal type is required",
                            })}
                            className={SELECT_CLS}
                        >
                            <option value="" >Select option</option>
                            {DEAL_TYPES.map((dt) => (
                                <option key={dt.value} value={dt.value}>{dt.label}</option>
                            ))}
                        </select>
                        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">▾</span>
                    </div>
                    {formState.errors.dealType && (
                        <p className="text-red-500 text-xs mt-1">{formState.errors.dealType.message}</p>
                    )}
                </div>

                {/* ── Title  ─── */}
                <InputField
                    label="Title"
                    type="text"
                    compulsory
                    placeholder="e.g Get 50% off Dominos pizza of any size and choice"
                    {...register("title", {
                        required: "Title is required",
                        maxLength: { value: 100, message: "Must be less than 100 characters" },
                    })}
                    error={formState.errors.title}
                />

                {/*  Description  */}
                <InputField
                    label="Description"
                    placeholder="What's the offer? Any conditions? Briefly describe this deal"
                    type="textarea"
                    textAreaRows={5}
                    compulsory
                    {...register("description", {
                        required: "Description is required",
                        minLength: { value: 20, message: "Must be more than 20 characters" },
                    })}
                    error={formState.errors.description}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                        label="Brand Name"
                        type="text"
                        compulsory
                        placeholder="e.g Domino"
                        {...register("brandName", {
                            required: "Brand name is required",
                        })}
                        error={formState.errors.brandName}
                    />
                    <Controller
                        name="endDate"
                        control={control}
                        rules={{
                            required: "Please select an end date",
                            validate: (val) =>
                                // Minimum is tomorrow — today is not allowed
                                dayjs(val).isAfter(dayjs(), "day") ||
                                "Expiry date must be at least tomorrow",
                        }}
                        render={({ field }) => (
                            <DatePickerField
                                label="Expiry Date"
                                compulsory
                                value={field.value}
                                onChange={field.onChange}
                                error={formState.errors.endDate}
                            />
                        )}
                    />
                </div>

                <InputField
                    label="Value"
                    type="text"
                    compulsory
                    placeholder="e.g 50% off"
                    {...register("value", {
                        required: "Value is required",
                        maxLength: { value: 50, message: "Must not be more than 50 characters" },
                    })}
                    error={formState.errors.value}
                />
                <Controller
                    name="location"
                    control={control}
                    rules={{ required: "Location is required" }}
                    render={({ field, fieldState }) => (
                        <GoogleAutocompleteNew
                            label="Location"
                            compulsory
                            value={field.value}
                            onPlaceSelect={field.onChange}
                            error={fieldState.error}
                        />
                    )}
                />

                <InputField
                    label="External Link Address"
                    type="text"
                    placeholder="https://..."
                    compulsory
                    {...register("externalLink", {
                        required: "URL is required",
                        pattern: {
                            value: /^https?:\/\/.+$/,
                            message: "Enter a valid URL (must start with http/https)",
                        },
                    })}
                    error={formState.errors.externalLink}
                />

                {/* Coupon Code */}
                {dealType === "promo_code" && (
                    <InputField
                        label="Coupon Code"
                        type="text"
                        placeholder="GLOWFREE2026"
                        compulsory
                        {...register("couponCode", {
                            required: "Coupon code is required",
                        })}
                        error={formState.errors.couponCode}
                    />
                )}


                <input
                    type="hidden"
                    {...register("imageUrl", {
                        required: "Image is required",
                    })}
                />
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
                        /* ── Preview card with remove + uploading overlay ──── */
                        <div className="relative w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                            <img
                                src={imagePreview}
                                alt="Offer preview"
                                className={`w-full max-h-64 object-cover transition-opacity ${isUploading ? "opacity-50" : "opacity-100"}`}
                            />
                            {isUploading && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/60">
                                    <svg className="animate-spin h-7 w-7 text-orange-500" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                    </svg>
                                    <span className="text-sm font-baloo text-orange-600 font-semibold">Uploading…</span>
                                </div>
                            )}
                            {!isUploading && (
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute top-2 right-2 bg-white border border-gray-200 rounded-full p-1 shadow hover:bg-red-50 transition-colors"
                                    aria-label="Remove image"
                                >
                                    <MdClose size={18} className="text-red-500" />
                                </button>
                            )}
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className={`w-full h-32 flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed transition-colors cursor-pointer bg-[#F6F7F8]
                                ${imageError || formState.errors.imageUrl
                                    ? "border-red-400 bg-red-50"
                                    : "border-gray-300 hover:border-orange-400 hover:bg-orange-50"
                                }`}
                        >
                            <FiUploadCloud
                                size={30}
                                className={imageError || formState.errors.imageUrl ? "text-red-400" : "text-gray-400"}
                            />
                            <span className="font-baloo text-sm text-gray-500">Upload photo here</span>
                        </button>
                    )}

                    {/* Validation / upload error */}
                    {(imageError || formState.errors.imageUrl) && (
                        <p className="text-red-500 text-xs mt-1">
                            {imageError || formState.errors.imageUrl?.message}
                        </p>
                    )}
                </div>

                {/* ── Submit ─── */}
                <Button
                    isLoading={isBusy}
                    isDisabled={isBusy}
                    type="submit"
                >
                    {isUploading ? "Uploading image…" : "Post an Awoof"}
                </Button>
            </form>
            <SuccessModal />
        </div>
    );
};