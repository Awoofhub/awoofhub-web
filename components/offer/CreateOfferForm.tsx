"use client";

import { Button } from "@/components/button/Button";
import { useCategory } from "@/features/category/useCategory";
import { useLatestModeration } from "@/features/moderation/useLatestModeration";
import { useCreateOffer } from "@/features/offers/useCreateOffer";
import { useOffer } from "@/features/offers/useOffer";
import { useUpdateOffer } from "@/features/offers/useUpdateOffer";
import { useUploadSinglePhoto } from "@/features/upload/useUpdateProfilePhoto";
import { CreateOfferFormProps } from "@/types/form-props";
import { CreateOfferData } from "@/types/offer";
import { formatNairaDisplay } from "@/utils/formatNaira";
import { normalizeUrl } from "@/utils/normalizeUrl";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { DatePickerField } from "../date/DatePickerField";
import { CurrencyInputField } from "../form/CurrencyInputField";
import { FormSelectDropdown } from "../form/FormSelectDropdown";
import { InputField } from "../form/InputField";
import Loading from "../loading/Loading";
import OfferNoticeBox from "../my-offers/OfferNoticeBox";
import { ImageUploader } from "./ImageUploader";
import { LocationPicker } from "./LocationPicker";

const DealTypes = [
  { value: undefined, label: "Select option" },
  { label: "Cash Back", value: "cashback" },
  { label: "Freebie", value: "freebie" },
  { label: "Discount", value: "discount" },
  { label: "Buy One Get One", value: "bogo" },
  { label: "Promo Code", value: "promo_code" },
  { label: "Free Trial", value: "free_trial" },
  { label: "Free Delivery", value: "free_delivery" },
  { label: "Price Drop", value: "price_drop" },
];

const DEAL_VALUE_PLACEHOLDERS = {
  cashback: "e.g. ₦2,000 cashback",
  freebie: "e.g. Free branded tote bag",
  discount: "e.g. 50% off",
  promo_code: "e.g. ₦5,000 bonus credit",
  bogo: "e.g. Get 1 free",
  free_trial: "e.g. 30 days free",
  free_delivery: "e.g. Free delivery",
  price_drop: "e.g. ₦189,000 → ₦149,000",
};

const LABEL_CLS = "block font-baloo text-base lg:text-lg font-semibold text-black";

type CreateOfferFormData = CreateOfferData & {
  normalPrice?: number;
  awoofPrice?: number;
};

export const CreateOfferForm = ({ onSuccess }: CreateOfferFormProps) => {
  const searchParams = useSearchParams();
  const editOfferId = searchParams.get("editId");

  const { data: categoryData } = useCategory()
  const { uploadPhoto, isPending: isUploading } = useUploadSinglePhoto();

  const createOffer = useCreateOffer({ onSuccess });
  const updateOffer = useUpdateOffer({ id: editOfferId ?? "", onSuccess });


  const { data: Offer, isLoading } = useOffer({ id: editOfferId ?? "" });

  const { data: moderation, isLoading: isLoadingModeration } = useLatestModeration({ id: editOfferId ?? "" });

  const Categories = [
    { value: undefined, label: "Select option" },
    ...(categoryData?.map((category) => ({
      value: category.name,
      label: category.name,
    })) ?? []),
  ];

  const { register, handleSubmit, watch, formState, control, setValue, reset } = useForm<CreateOfferFormData>({
    defaultValues: {
      category: undefined,
      dealType: undefined,
      imageUrl: "",
      endDate: dayjs().add(1, 'day'),
      brandName: "",
      value: "",
      location: "",
      externalLink: "",
    },
  });

  const { isDirty } = formState;

  useEffect(() => {
    if (!editOfferId || !Offer) return;

    let normalPrice: number | undefined;
    let awoofPrice: number | undefined;

    if (Offer.dealType === "price_drop" && Offer.value) {
      const prices = Offer.value.match(/[\d,]+/g);

      if (prices && prices?.length >= 2) {
        normalPrice = Number(prices[0].replace(/,/g, ""));
        awoofPrice = Number(prices[1].replace(/,/g, ""));
      }
    }

    reset({
      category: Offer.category.name,
      dealType: Offer.dealType,
      title: Offer.title,
      description: Offer.description,
      brandName: Offer.brandName,
      endDate: Offer.endDate ? dayjs(Offer.endDate) : dayjs(),
      value: Offer.value,
      normalPrice,
      awoofPrice,
      location: Offer.location,
      externalLink: Offer.externalLink,
      couponCode: Offer.couponCode ?? "",
      imageUrl: Offer.imageUrl,
    });
  }, [Offer, editOfferId, reset]);


  const selectedDealType = watch("dealType");
  const dynamicPlaceholder = DEAL_VALUE_PLACEHOLDERS[selectedDealType as keyof typeof DEAL_VALUE_PLACEHOLDERS] || "e.g. Enter deal value";
  const isPriceDrop = selectedDealType === "price_drop";
  const isPromoCode = selectedDealType === "promo_code";

  useEffect(() => {
    if (selectedDealType !== "price_drop") {
      setValue("normalPrice", undefined);
      setValue("awoofPrice", undefined);
    }
  }, [selectedDealType, setValue]);

  const onSubmit = (data: CreateOfferFormData) => {

    const value = data.dealType === "price_drop" ? `${formatNairaDisplay(data.normalPrice ?? 0)} - ${formatNairaDisplay(data.awoofPrice ?? 0)}` : data.value;

    const payload = {
      category: data.category,
      dealType: data.dealType,
      title: data.title,
      description: data.description,
      brandName: data.brandName,
      endDate: data.endDate,
      value,
      location: data.location,
      externalLink: normalizeUrl(data.externalLink),
      couponCode: data.couponCode,
      imageUrl: data.imageUrl,
    };

    if (editOfferId) {
      updateOffer.submit(payload);
    } else {
      createOffer.submit(payload);
    }

  }

  const isSubmitDisabled = createOffer.isPending || updateOffer.isPending || isUploading || (Boolean(editOfferId) && !formState.isDirty);

  if (editOfferId && (isLoading || isLoadingModeration)) {
    return <Loading />
  }


  return (
    <div className="mt-3 xs:mt-5 mb-30 lg:mb-10 mx-auto w-full">

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

        {Boolean(editOfferId) && (
          <div className="rounded-md border border-red-200 bg-red-50 p-3">
            <OfferNoticeBox
              status="rejected"
              moderation={moderation}
              isLoading={isLoadingModeration}
            />
          </div>
        )}

        <Controller
          name="category"
          control={control}
          rules={{ required: "Category is required" }}
          render={({ field, fieldState }) => (
            <FormSelectDropdown
              label="Category"
              data={Categories}
              value={field.value}
              compulsory={true}
              onChange={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="dealType"
          control={control}
          rules={{ required: "Deal type is required" }}
          render={({ field, fieldState }) => (
            <FormSelectDropdown
              label="Deal Type"
              data={DealTypes}
              value={field.value}
              compulsory={true}
              onChange={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />

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
            compulsory
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
              rules={{
                required: "Awoof price is required",
                validate: (value, formValues) => {
                  const awoof = Number(value);
                  const normal = Number(formValues.normalPrice);
                  if (!formValues.normalPrice || isNaN(normal)) {
                    return true;
                  }
                  return awoof < normal || "Awoof price must be less than normal price";
                },
              }}
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
          </div>
        ) : (
          <InputField
            type="text"
            placeholder={dynamicPlaceholder}
            compulsory
            labelClassName={LABEL_CLS}
            label="Deal Value"
            {...register("value", {
              required: "Value is required",
              maxLength: {
                value: 50,
                message: "Must not be more than 50 characters",
              },
            })}
            error={formState.errors.value}
          />

        )}

        <Controller
          name="location"
          control={control}
          rules={{ required: "Location is required" }}
          render={({ field, fieldState }) => (
            <LocationPicker
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
            />
          )}

        />

        <InputField
          label="Website or Contact Link"
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

        {isPromoCode && (
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


        < Controller
          name="imageUrl"
          control={control}
          rules={{ required: "Image is required" }}
          render={({ field, fieldState }) => (
            <ImageUploader
              value={field.value}
              uploadPhoto={uploadPhoto}
              isUploading={isUploading}
              onChange={(url) => {
                field.onChange(url);
                setValue("imageUrl", url, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
              error={fieldState.error?.message}
            />
          )}
        />

        <div className="xs:w-75 mx-auto mt-6">
          <Button
            isLoading={createOffer.isPending}
            isDisabled={isSubmitDisabled}
            type="submit"
          >
            {editOfferId ? "Update Awoof" : "Post an Awoof"}
          </Button>
        </div>
      </form>
    </div >
  );
};
