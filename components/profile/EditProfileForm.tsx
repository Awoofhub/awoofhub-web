"use client";
import { Button } from "@/components/button/Button";
import { InputField } from "@/components/form/InputField";
import { useUploadSinglePhoto } from "@/features/upload/useUpdateProfilePhoto";
import { useUpdateUser } from "@/features/user/useUpdateUser";
import { useUser } from "@/features/user/useUser";
import { notificationsStore } from "@/store/notifications/notifications";
import { EditProfileFormProps } from "@/types/form-props";
import { UpdateUserData, UsernameCheckResult } from "@/types/user";
import { capitalizeFirstLetter } from "@/utils/truncate";
import { differenceInDays, parseISO } from "date-fns";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FiCamera } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import { TomTomAutocomplete } from "../form/AutoComplete";
import UsernameChecker from "../form/UsernameChecker";

export const EditProfileForm = ({ onSuccess }: EditProfileFormProps) => {
  const { data: currentUser } = useUser();
  const updateUser = useUpdateUser({ onSuccess });
  const { uploadPhoto, isPending: isUploading } = useUploadSinglePhoto();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, formState, control, reset, setValue, watch } =
    useForm<UpdateUserData>();

  const { isDirty } = formState;
  const [usernameResult, setUsernameResult] = useState<UsernameCheckResult>();
  const photoUrl = watch("profileImageUrl");

  const isUsernameLocked = currentUser?.usernameChangeLockedUntil
    ? differenceInDays(
        parseISO(currentUser.usernameChangeLockedUntil),
        new Date(),
      ) > 0
    : false;

  const currentUsername = currentUser?.username ?? "";
  const enteredUsername = watch("username") ?? "";

  const usernameChanged = enteredUsername !== currentUsername;

  const canSubmitUsername =
    !usernameChanged ||
    usernameResult === undefined ||
    usernameResult.available === true;

  const onSubmit = (data: UpdateUserData) => {
    if (
      usernameChanged &&
      usernameResult &&
      usernameResult.available === false
    ) {
      return;
    }
    updateUser.submit(data);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const res = await uploadPhoto(file);
        setValue("profileImageUrl", res.data, {
          shouldDirty: true,
        });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Something went wrong";
        notificationsStore.getState().showNotification({
          type: "error",
          title: "Error",
          duration: 5000,
          message,
        });
      }
    }
  };

  useEffect(() => {
    if (currentUser) {
      reset({
        name: currentUser.name || "",
        username: currentUser.username || "",
        bio: currentUser.bio || "",
        address: currentUser.address || "",
        website: currentUser.website || "",
        profileImageUrl: currentUser.profileImageUrl || "",
      });
    }
  }, [currentUser, reset]);

  return (
    <div className="w-full">
      {/* Photo Upload Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative mt-10 lg:mt-0 h-24 w-24">
          <div className="h-full  w-full rounded-full border-2 border-primary overflow-hidden bg-gray-100 flex items-center justify-center">
            {photoUrl ? (
              <Image
                width={200}
                height={200}
                src={photoUrl}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="bg-green-500 text-white text-4xl font-semibold flex items-center justify-center w-full h-full">
                {capitalizeFirstLetter(currentUser?.name || "U")}
              </div>
            )}
          </div>
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="!absolute !bottom-0 !right-0 !p-1 !bg-white border-2 !border-primary !text-black !rounded-full !shadow-lg !w-8 !h-8"
            isDisabled={isUploading}
          >
            {isUploading ? (
              <ImSpinner2 className="animate-spin" size={14} />
            ) : (
              <FiCamera size={17} />
            )}
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handlePhotoUpload}
            className="hidden"
            accept="image/*"
          />
        </div>
      </div>

      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Name"
          type="text"
          {...register("name", {
            required: "Name is required",
            maxLength: {
              value: 50,
              message: "Name must be less than 50 characters",
            },
          })}
          error={formState.errors["name"]}
        />

        {/* Username */}
        <UsernameChecker
          value={watch("username") ?? currentUser?.username ?? ""}
          onChange={(val) =>
            setValue("username", val, {
              shouldDirty: true,
            })
          }
          onResult={setUsernameResult}
          disabled={isUsernameLocked}
        />

        <InputField
          label="Bio"
          type="textarea"
          {...register("bio", {
            maxLength: {
              value: 200,
              message: "Bio must be less than 200 characters",
            },
          })}
          error={formState.errors["bio"]}
        />

        <Controller
          name="address"
          control={control}
          render={({ field, fieldState }) => (
            <TomTomAutocomplete
              label="Location"
              error={fieldState.error}
              value={field.value}
              onPlaceSelect={field.onChange}
              compulsory={false}
            />
          )}
        />
        <div className="flex justify-center mt-8">
          <Button
            type="submit"
            isLoading={updateUser.isPending}
            isDisabled={updateUser.isPending || !isDirty}
            className={`!font-baloo !rounded-md !py-3 !w-full !max-w-[400px] ${
              !isDirty
                ? "!bg-[#FFD5C3] !text-white cursor-not-allowed"
                : "!bg-primary !text-white"
            }`}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};
