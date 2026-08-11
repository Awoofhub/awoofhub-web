"use client";

import { Button } from "@/components/button/Button";
import { useCategory } from "@/features/category/useCategory";
import { useCreateOffer } from "@/features/offers/useCreateOffer";
import { useUpdateOffer } from "@/features/offers/useUpdateOffer";
import { useOfferById } from "@/features/offers/useOfferById";
import { useUploadSinglePhoto } from "@/features/upload/useUpdateProfilePhoto";
import { CreateOfferFormProps } from "@/types/form-props";
import { CreateOfferData } from "@/types/offer";
import { formatNairaDisplay } from "@/utils/formatNaira";
import { parsePriceDropValue } from "@/utils/parsePriceDropValue";
import dayjs from "dayjs";
import { ChevronDown, Flag, Globe, Pencil } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaRegImage } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { DatePickerField } from "../date/DatePickerField";
import { TomTomAutocomplete } from "../form/AutoComplete";
import { CurrencyInputField } from "../form/CurrencyInputField";
import { InputField } from "../form/InputField";
import { PostOfferSuccessModal } from "../modals/PostOfferSuccessModal";
import { ImageCropperModal } from "./ImageCropperModal";
import OfferNoticeBox from "../myoffers/OfferNoticeBox";
import { useLatestModeration } from "@/features/moderation/useLatestModeration";
import Loading from "../loading/Loading";

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
  cashback: "e.g. ₦2,000 cashback",
  freebie: "e.g. Free branded tote bag",
  discount: "e.g. 50% off",
  promo_code: "e.g. ₦5,000 bonus credit",
  bogo: "e.g. Get 1 free",
  free_trial: "e.g. 30 days free",
  free_delivery: "e.g. Free delivery",
  price_drop: "e.g. ₦189,000 → ₦149,000",
};

const LABEL_CLS =
  "block font-baloo text-base lg:text-lg font-semibold text-black";

function normalizeUrl(url: string): string {
  if (/^https?:\/\//i.test(url)) {
    return url;
  }
  return `https://${url}`;
}

function toNumericPrice(display: string): number | undefined {
  const digitsOnly = display.replace(/[^0-9.]/g, "");
  if (!digitsOnly) return undefined;
  const parsed = Number(digitsOnly);
  return Number.isNaN(parsed) ? undefined : parsed;
}

type FormValues = CreateOfferData & {
  normalPrice?: number;
  awoofPrice?: number;
};

export const CreateOfferForm = ({ onSuccess }: CreateOfferFormProps) => {
  const searchParams = useSearchParams();
  const editOfferId = searchParams.get("editId");
  const isEditMode = Boolean(editOfferId);

  const { data: categories } = useCategory();
  const { uploadPhoto, isPending: isUploading } = useUploadSinglePhoto();
  const [showSuccess, setShowSuccess] = useState(false);

  const createOffer = useCreateOffer({
    onSuccess: () => setShowSuccess(true),
  });

  const updateOffer = useUpdateOffer({
    onSuccess: () => setShowSuccess(true),
  });

  const { data: existingOffer, isLoading: isLoadingOffer } = useOfferById({
    id: editOfferId ?? undefined,
  });

  const { data: moderation, isLoading: isLoadingModeration } = useLatestModeration(
    { id: editOfferId ?? "" },
    isEditMode,
  );

  const [locationType, setLocationType] = useState<
    "Online" | "Nationwide" | "at_a_location" | ""
  >("");

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string>("");
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [originalImageSrc, setOriginalImageSrc] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [dealTypeOpen, setDealTypeOpen] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  const dealTypeRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, formState, control, watch, setValue, reset } =
    useForm<FormValues>({
      mode: "onChange",
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
  const normalPrice = watch("normalPrice");
  const awoofPrice = watch("awoofPrice");

  const isPriceDrop = dealType === "price_drop";

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

  useEffect(() => {
    if (!isPriceDrop) return;
    if (normalPrice && awoofPrice) {
      const combined = `${formatNairaDisplay(normalPrice)} - ${formatNairaDisplay(awoofPrice)}`;
      setValue("value", combined, { shouldValidate: true, shouldDirty: true });
    } else {
      setValue("value", "", { shouldValidate: true });
    }
  }, [normalPrice, awoofPrice, isPriceDrop, setValue]);

  // Prefill the form once the offer-to-edit has loaded.
  useEffect(() => {
    if (!existingOffer) return;

    const isOnlineOrNationwide =
      existingOffer.location === "Online" ||
      existingOffer.location === "Nationwide";
    setLocationType(
      isOnlineOrNationwide
        ? (existingOffer.location as "Online" | "Nationwide")
        : "at_a_location",
    );

    const priceDrop =
      existingOffer.dealType === "price_drop"
        ? parsePriceDropValue(existingOffer.value)
        : null;

    reset({
      category: existingOffer.category.name,
      dealType: existingOffer.dealType,
      title: existingOffer.title,
      description: existingOffer.description,
      brandName: existingOffer.brandName,
      endDate: existingOffer.endDate ? dayjs(existingOffer.endDate) : null,
      value: existingOffer.value,
      location: existingOffer.location,
      externalLink: existingOffer.externalLink,
      couponCode: existingOffer.couponCode ?? "",
      imageUrl: existingOffer.imageUrl,
      normalPrice: priceDrop ? toNumericPrice(priceDrop.normalPrice) : undefined,
      awoofPrice: priceDrop ? toNumericPrice(priceDrop.awoofPrice) : undefined,
    } as unknown as FormValues);
    setImagePreview(existingOffer.imageUrl);
  }, [existingOffer, reset]);


  // Reset back to a blank form when navigating away from edit mode
  const prevEditOfferId = useRef(editOfferId);

  useEffect(() => {
    const wasEditing = Boolean(prevEditOfferId.current);
    const isEditingNow = Boolean(editOfferId);

    if (wasEditing && !isEditingNow) {
      reset({
        category: "",
        dealType: undefined,
        imageUrl: "",
        endDate: null,
        brandName: "",
        value: "",
        location: "",
        externalLink: "",
        title: "",
        description: "",
        couponCode: "",
        normalPrice: undefined,
        awoofPrice: undefined,
      });
      setLocationType("");
      setImagePreview(null);
      setImageError("");
      setCropSrc(null);
      setOriginalImageSrc(null);
      setSelectedImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }

    prevEditOfferId.current = editOfferId;
  }, [editOfferId, reset]);

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
    reader.onload = () => {
      const imageDataUrl = reader.result as string;
      setCropSrc(imageDataUrl);
      setOriginalImageSrc(imageDataUrl);
      setSelectedImageFile(file);
      setImageError("");
      setCropModalOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCropConfirm = async (croppedDataUrl: string) => {
    if (!selectedImageFile) return;

    try {
      const croppedBlob = await (await fetch(croppedDataUrl)).blob();
      const croppedFile = new File([croppedBlob], selectedImageFile.name, {
        type: selectedImageFile.type || "image/jpeg",
      });

      setImagePreview(croppedDataUrl);
      setCropModalOpen(false);
      const res = await uploadPhoto(croppedFile);
      setValue("imageUrl", res.data, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } catch {
      setImageError("Image upload failed. Please try again.");
      setImagePreview(null);
      setValue("imageUrl", "", { shouldValidate: true, shouldDirty: true });
      setCropModalOpen(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageError("");
    setCropSrc(null);
    setOriginalImageSrc(null);
    setSelectedImageFile(null);
    setValue("imageUrl", "", { shouldValidate: true, shouldDirty: true });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const editImage = () => {
    setCropSrc(originalImageSrc || imagePreview);
    setCropModalOpen(true);
  };

  const onSubmit = (data: FormValues) => {
    if (!data.imageUrl) {
      setImageError("Please upload an offer image.");
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { normalPrice: _np, awoofPrice: _ap, ...payload } = data;
    const finalPayload = {
      ...payload,
      externalLink: normalizeUrl(data.externalLink),
      endDate: data.endDate ? dayjs(data.endDate).toISOString() : null,
    };

    if (isEditMode && editOfferId) {
      updateOffer.submit(editOfferId, finalPayload);
    } else {
      createOffer.submit(finalPayload);
    }
  };

  const isSubmitDisabled =
    createOffer.isPending ||
    updateOffer.isPending ||
    isUploading ||
    !formState.isValid ||
    (isEditMode && !formState.isDirty);

  if (isEditMode && isLoadingOffer) {
    return (
      <div className="mt-10 flex justify-center">
       <Loading/>
      </div>
    );
  }

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
        {isEditMode && (
          <div className="rounded-md border border-red-200 bg-red-50 p-3">
            <OfferNoticeBox
              status="rejected"
              moderation={moderation}
              isLoading={isLoadingModeration}
            />
          </div>
        )}

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
              <ul className="absolute z-50 w-full mt-2 py-2 px-4 bg-white border border-gray-200 rounded-md shadow-lg max-h-70 overflow-y-auto ">
                {categories?.map((cat) => (
                  <li
                    key={cat.id}
                    onClick={() => {
                      setValue("category", cat.name, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
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
              <ul className="absolute z-50 w-full mt-2 py-2 px-4 bg-white border border-gray-200 rounded-md shadow-lg max-h-70 overflow-y-auto">
                {DEAL_TYPES.map((dt) => (
                  <li
                    key={dt.value}
                    onClick={() => {
                      setValue("dealType", dt.value, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                      setDealTypeOpen(false);
                      setValue("normalPrice", undefined, { shouldDirty: true });
                      setValue("awoofPrice", undefined, { shouldDirty: true });
                      setValue("value", "", { shouldValidate: true });
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
              value: 50,
              message: "Must not be less than 50 characters",
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

        {/* Deal Value — Normal/Awoof price for price_drop, single field otherwise */}
        {isPriceDrop ? (
          <div className="grid grid-cols-1 xxs:grid-cols-2 gap-4">
            <Controller
              name="normalPrice"
              control={control}
              rules={{ required: "Normal price is required" }}
              render={({ field }) => (
                <CurrencyInputField
                  label="Normal Price (₦)"
                  compulsory
                  labelClassName={LABEL_CLS}
                  placeholder="4,000"
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={formState.errors.normalPrice}
                />
              )}
            />
            <Controller
              name="awoofPrice"
              control={control}
              rules={{ required: "Awoof price is required" }}
              render={({ field }) => (
                <CurrencyInputField
                  label="Awoof Price (₦)"
                  compulsory
                  labelClassName={LABEL_CLS}
                  placeholder="2,000"
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={formState.errors.awoofPrice}
                />
              )}
            />
            <input
              type="hidden"
              {...register("value", { required: "Both prices are required" })}
            />
          </div>
        ) : (
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
        )}

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
                className="flex items-center gap-2 cursor-pointer text-sm text-gray-700"
              >
                <input
                  type="radio"
                  name="locationType"
                  checked={locationType === option}
                  onChange={() => {
                    setLocationType(option);
                    setValue("location", option, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
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
                onChange={() => {
                  setLocationType("at_a_location");
                  setValue("location", "", {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                className="accent-primary w-4 h-4"
              />
              At a location
            </label>
          </div>

          {locationType && <hr className="text-primary/40 border-1 mb-0" />}

          {locationType === "Online" && (
            <div className="flex items-center gap-2 pt-1 text-primary text-xs md:text-sm ">
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
            <Controller
              name="location"
              control={control}
              rules={{ required: "Location is required" }}
              render={({ field, fieldState }) => (
                <div className="pt-2">
                  <TomTomAutocomplete
                    value={field.value}
                    onPlaceSelect={field.onChange}
                    error={fieldState.error}
                    placeholder="Enter deal address e.g, Ikeja city mall, Lagos"
                  />
                </div>
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
          label="Website or Contact Link (https://)"
          type="text"
          labelClassName={LABEL_CLS}
          placeholder="e.g  www.jollyawoof.com"
          compulsory
          {...register("externalLink", {
            required: "URL is required",
            pattern: {
              value: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+([/?#].*)?$/,
              message: "Enter a valid website or link",
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
            <div className="relative w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50">
              <div className={`relative aspect-[4/3] w-full transition-opacity ${isUploading ? "opacity-50" : "opacity-100"}`}>
                <Image
                  src={imagePreview}
                  alt="Offer preview"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
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
                <div className="absolute top-2 right-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={editImage}
                    className="bg-white border border-gray-200 rounded-full p-1.5 shadow hover:bg-orange-50"
                    aria-label="Edit image"
                  >
                    <Pencil size={16} className="text-orange-500" />
                  </button>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="bg-white border border-gray-200 rounded-full p-1 shadow hover:bg-red-50"
                    aria-label="Remove image"
                  >
                    <MdClose size={18} className="text-red-500" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={`w-full h-32 flex flex-col items-center justify-center gap-2 rounded-xl transition-colors cursor-pointer bg-[#F6F7F8] ${imageError || formState.errors.imageUrl
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
          <ImageCropperModal
            isOpen={cropModalOpen}
            imageSrc={cropSrc}
            onClose={() => {
              setCropModalOpen(false);
              if (!imagePreview) {
                setCropSrc(null);
                setOriginalImageSrc(null);
                setSelectedImageFile(null);
              }
            }}
            onConfirm={handleCropConfirm}
          />
          {(imageError || formState.errors.imageUrl) && (
            <p className="text-red-500 text-xs mt-1">
              {imageError || formState.errors.imageUrl?.message}
            </p>
          )}
        </div>
        <div className="xs:w-75 mx-auto mt-6">
          <Button
            isLoading={createOffer.isPending || updateOffer.isPending}
            isDisabled={isSubmitDisabled}
            type="submit"
          >
            {isEditMode ? "Resubmit for Review" : "Post an Awoof"}
          </Button>
        </div>
      </form>
    </div>
  );
};