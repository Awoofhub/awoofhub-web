"use client";

import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useCategory } from "@/features/category/useCategory";
import { useCreateOffer } from "@/features/offers/useCreateOffer";
import { useUploadSinglePhoto } from "@/features/upload/useUpdateProfilePhoto";
import { CreateOfferData } from "@/types/offer";
import { CreateOfferFormProps } from "@/types/form-props";
import { MdClose } from "react-icons/md";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/button/Button";
import { DatePickerField } from "../date/DatePickerField";
import { GoogleAutocompleteNew } from "../form/AutoComplete";
import { InputField } from "../form/InputField";
import { PostOfferSuccessModal } from "../modals/PostOfferSuccessModal";
import { FaRegImage } from "react-icons/fa6";

const DEAL_TYPES: { label: string; value: CreateOfferData["dealType"] }[] = [
  { label: "Cash Back", value: "cashback" },
  { label: "Freebie", value: "freebie" },
  { label: "Discount", value: "discount" },
  { label: "Buy One Get One", value: "bogo" },
  { label: "Promo Code", value: "promo_code" },
  { label: "Free Trial", value: "free_trial" },
  { label: "Free Delivery", value: "free_delivery" },
  { label: "Price Drop", value: "price_drop" },
];

const DEAL_VALUE_PLACEHOLDERS: Record<CreateOfferData["dealType"], string> = {
  cashback: "e.g. Get ₦2,000 cashback on your first transfer",
  freebie: "e.g. Free branded tote bag with every purchase",
  discount: "e.g. 50% off all items this weekend",
  promo_code: "e.g. AWOOF20",
  bogo: "e.g. Buy 1 pair of sneakers, get 1 free",
  free_trial: "e.g. 30 days free, no card required",
  free_delivery: "e.g. Free delivery on orders above ₦20,000",
  price_drop: "e.g. ₦189,000 → ₦149,000",
};

const LABEL_CLS =
  "block font-baloo text-base lg:text-lg font-semibold text-black";

export const CreateOfferForm = ({ onSuccess }: CreateOfferFormProps) => {
  const { data: categories } = useCategory();
  const { uploadPhoto, isPending: isUploading } = useUploadSinglePhoto();
  const [showSuccess, setShowSuccess] = useState(false);
  const createOffer = useCreateOffer({
    onSuccess: () => setShowSuccess(true),
  });
  const [locationType, setLocationType] = useState<
    "Online" | "Nationwide" | "at_a_location" | ""
  >("");

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [dealTypeOpen, setDealTypeOpen] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  const dealTypeRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, formState, control, watch, setValue } =
    useForm<CreateOfferData>({
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

  const dealType = watch("dealType");
  const category = watch("category");

  const valuePlaceholder = dealType
    ? DEAL_VALUE_PLACEHOLDERS[dealType]
    : "Select a deal type first";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(e.target as Node)
      ) {
        setCategoryOpen(false);
      }
      if (
        dealTypeRef.current &&
        !dealTypeRef.current.contains(e.target as Node)
      ) {
        setDealTypeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      setValue("imageUrl", res.data, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } catch {
      setImageError("Image upload failed. Please try again.");
      setImagePreview(null);
      setValue("imageUrl", "", { shouldValidate: true, shouldDirty: true });
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

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
      endDate: data.endDate ? dayjs(data.endDate).toISOString() : null,
    });
  };

  return (
    <div className="mt-3 xs:mt-5 mb-30 lg:mb-10 mx-auto w-full">
      {showSuccess && (
        <PostOfferSuccessModal
          onDone={() => {
            setShowSuccess(false);
            onSuccess();
          }}
        />
      )}

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {/* Category */}
        <div className="space-y-2">
          <label className={LABEL_CLS}>
            Category <span className="text-red-500">*</span>
          </label>
          <div ref={categoryRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setCategoryOpen((p) => !p);
                setDealTypeOpen(false);
              }}
              className="w-full h-12 px-3 flex items-center justify-between border border-gray-300 rounded-md bg-white text-muted text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <span className={category ? "text-gray-900" : "text-gray-400"}>
                {category || "Select option"}
              </span>
              <ChevronDown
                size={18}
                className={`transition-transform ${categoryOpen ? "rotate-180" : ""}`}
              />
            </button>
            {categoryOpen && (
              <ul className="absolute z-50 right-0 w-60 mt-2 py-2 px-4 bg-white border border-gray-200 rounded-md shadow-lg max-h-88 overflow-y-auto no-scrollbar">
                {categories?.map((cat) => (
                  <li
                    key={cat.id}
                    onClick={() => {
                      setValue("category", cat.name, { shouldValidate: true });
                      setCategoryOpen(false);
                    }}
                    className="px-3 py-1 cursor-pointer hover:bg-orange-50 font-baloo text-base border-b border-muted/20 last:border-none flex items-center justify-between text-gray-900"
                  >
                    <span className="flex items-center gap-1">
                      {category === cat.name && (
                        <span className="text-[#12B76A]">✓</span>
                      )}
                      {cat.name}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <input
            type="hidden"
            {...register("category", { required: "Category is required" })}
          />
          {formState.errors.category && (
            <p className="text-red-500 text-xs mt-1">
              {formState.errors.category.message}
            </p>
          )}
        </div>

        {/* Deal Type */}
        <div className="space-y-2">
          <label className={LABEL_CLS}>
            Deal Type <span className="text-red-500">*</span>
          </label>
          <div ref={dealTypeRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setDealTypeOpen((p) => !p);
                setCategoryOpen(false);
              }}
              className="w-full h-12 px-3 flex items-center justify-between border border-gray-300 rounded-md bg-white text-muted text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <span className={dealType ? "text-gray-900" : "text-gray-400"}>
                {DEAL_TYPES.find((d) => d.value === dealType)?.label ||
                  "Select option"}
              </span>
              <ChevronDown
                size={18}
                className={`transition-transform ${dealTypeOpen ? "rotate-180" : ""}`}
              />
            </button>
            {dealTypeOpen && (
              <ul className="absolute z-50 right-0 w-55 mt-2 py-2 px-4 bg-white border border-gray-200 rounded-md shadow-lg max-h-80 overflow-y-auto">
                {DEAL_TYPES.map((dt) => (
                  <li
                    key={dt.value}
                    onClick={() => {
                      setValue("dealType", dt.value, { shouldValidate: true });
                      setDealTypeOpen(false);
                    }}
                    className="px-3 py-1 cursor-pointer hover:bg-orange-50 font-baloo text-base border-b border-muted/20 last:border-none flex items-center justify-between text-gray-900"
                  >
                    <span className="flex items-center gap-1">
                      {" "}
                      {dealType === dt.value && (
                        <span className="text-[#12B76A]">✓</span>
                      )}
                      {dt.label}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <input
            type="hidden"
            {...register("dealType", { required: "Deal type is required" })}
          />
          {formState.errors.dealType && (
            <p className="text-red-500 text-xs mt-1">
              {formState.errors.dealType.message}
            </p>
          )}
        </div>

        {/* Title */}
        <InputField
          label="Title"
          type="text"
          labelClassName={LABEL_CLS}
          compulsory
          placeholder="e.g Get 50% off Dominos pizza of any size and choice"
          {...register("title", {
            required: "Title is required",
            maxLength: {
              value: 100,
              message: "Must be less than 100 characters",
            },
          })}
          error={formState.errors.title}
        />

        {/* Description */}
        <InputField
          label="Description"
          placeholder="What's the offer? Any conditions? Briefly describe this deal"
          type="textarea"
          textAreaRows={3}
          labelClassName={LABEL_CLS}
          compulsory
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 100,
              message: "Must be more than 100 characters",
            },
          })}
          error={formState.errors.description}
        />

        <div className="grid grid-cols-1 xxs:grid-cols-2 gap-4">
          <InputField
            label="Brand Name"
            type="text"
            labelClassName={LABEL_CLS}
            placeholder="e.g Domino"
            {...register("brandName", { required: "Brand name is required" })}
            error={formState.errors.brandName}
          />
          <Controller
            name="endDate"
            control={control}
            rules={{
              required: "Please select an end date",
              validate: (val) =>
                dayjs(val).isAfter(dayjs(), "day") ||
                "Expiry date must be at least tomorrow",
            }}
            render={({ field }) => (
              <DatePickerField
                label="Expiry Date"
                compulsory
                labelClassName={LABEL_CLS}
                value={field.value}
                onChange={field.onChange}
                error={formState.errors.endDate}
              />
            )}
          />
        </div>

        {/* Deal Value */}
        <div>
          <label className={LABEL_CLS}>
            Deal Value <span className="text-red-500">*</span>
          </label>
          <InputField
            type="text"
            placeholder={valuePlaceholder}
            compulsory
            labelClassName={LABEL_CLS}
            {...register("value", {
              required: "Value is required",
              maxLength: {
                value: 50,
                message: "Must not be more than 50 characters",
              },
            })}
            error={formState.errors.value}
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className={LABEL_CLS}>
            Where is this deal available?{" "}
            <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-col gap-2">
            {(["Online", "Nationwide"] as const).map((option) => (
              <label
                key={option}
                className="flex items-center gap-2 cursor-pointer font-baloo text-gray-700"
              >
                <input
                  type="radio"
                  name="locationType"
                  checked={locationType === option}
                  onChange={() => {
                    setLocationType(option);
                    setValue("location", option, { shouldValidate: true });
                  }}
                  className="accent-primary w-4 h-4"
                />
                {option}
              </label>
            ))}
            <label className="flex items-center gap-2 cursor-pointer font-baloo text-gray-700">
              <input
                type="radio"
                name="locationType"
                checked={locationType === "at_a_location"}
                onChange={() => {
                  setLocationType("at_a_location");
                  setValue("location", "", { shouldValidate: true });
                }}
                className="accent-primary w-4 h-4"
              />
              At a location
            </label>
          </div>
          {locationType === "at_a_location" && (
            <Controller
              name="location"
              control={control}
              rules={{ required: "Location is required" }}
              render={({ field, fieldState }) => (
                <GoogleAutocompleteNew
                  value={field.value}
                  onPlaceSelect={field.onChange}
                  error={fieldState.error}
                  placeholder="Enter deal address e.g, Ikeja city mall, Lagos"
                />
              )}
            />
          )}
          {formState.errors.location && (
            <p className="text-red-500 text-xs mt-1">
              {formState.errors.location.message}
            </p>
          )}
        </div>

        {/* External Link */}
        <InputField
          label="Website or Contact Link"
          type="text"
          labelClassName={LABEL_CLS}
          placeholder="e.g  https://www.jollyawoof.com"
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
            labelClassName={LABEL_CLS}
            placeholder="GLOWFREE2026"
            compulsory
            {...register("couponCode", { required: "Coupon code is required" })}
            error={formState.errors.couponCode}
          />
        )}

        {/* Image Upload */}
        <input
          type="hidden"
          {...register("imageUrl", { required: "Image is required" })}
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
            <div className="relative w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <img
                src={imagePreview}
                alt="Offer preview"
                className={`w-full max-h-64 object-cover transition-opacity ${isUploading ? "opacity-50" : "opacity-100"}`}
              />
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
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-white border border-gray-200 rounded-full p-1 shadow hover:bg-red-50"
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
              className={`w-full h-32 flex flex-col items-center justify-center gap-2 rounded-xl transition-colors cursor-pointer bg-[#F6F7F8] ${
                imageError || formState.errors.imageUrl
                  ? "border-red-400 bg-red-50"
                  : "border-gray-300 hover:border-orange-400 hover:bg-orange-50"
              }`}
            >
              <FaRegImage
                size={30}
                className={
                  imageError || formState.errors.imageUrl
                    ? "text-red-400"
                    : "text-primary"
                }
              />
              <span className="text-xs text-muted">Upload photo here</span>
            </button>
          )}
          {(imageError || formState.errors.imageUrl) && (
            <p className="text-red-500 text-xs mt-1">
              {imageError || formState.errors.imageUrl?.message}
            </p>
          )}
        </div>
        <div className="xs:w-75 mx-auto mt-6">
          <Button
            isLoading={createOffer.isPending}
            isDisabled={isUploading}
            type="submit"
          >
            Post an Awoof
          </Button>
        </div>
      </form>
    </div>
  );
};
