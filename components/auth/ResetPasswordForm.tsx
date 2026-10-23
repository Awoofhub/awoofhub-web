"use client";
import { Button } from "@/components/button/Button";
import { InputField } from "@/components/form/InputField";
import { useResetPassword } from "@/features/auth/useResetPassword";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
import { useForm } from "react-hook-form";

type ResetPasswordData = {
  password: string;
  confirmPassword: string;
}

type FilterParams = {
  token?: string;
};

interface FilterProps {
  searchParams: Promise<FilterParams>;
}

export default function ResetPasswordForm({ searchParams }: FilterProps) {
  const params = use(searchParams);
  const { token } = params;

  const router = useRouter();

  const onSuccess = () => {
    router.push("/reset-password/success");
  };

   const onError = () => {
    router.replace("/forgot-password");
  };

  const { submit, isPending } = useResetPassword({ onSuccess, onError });

  useEffect(() => {
    if (!token) {
      router.replace("/forgot-password");
    }
  }, [token, router]);

  const { register, handleSubmit, formState, getValues } = useForm<ResetPasswordData>();

  const onSubmit = (data: ResetPasswordData) => {
    if (!token) return;
    const { confirmPassword, ...resetData } = data;

    submit({
      ...resetData,
      token,
    });
  };

  if (!token) return null;

  return (
    <div className="w-full max-w-[600px] bg-white rounded-2xl px-4 py-8 xs:p-8 text-gray-900 text-center shadow-lg">
      {/* Lock icon */}
      <div className="flex justify-center mb-4">
        <div className=" flex items-center justify-center">
          <Lock size={32} className="text-primary" />
        </div>
      </div>

      <h1 className="text-2xl xs:text-3xl font-bold mb-1">Reset your password</h1>
      <p className="text-base xs:text-xl mb-6 leading-relaxed">
        Create your new password to proceed.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Enter New Password"
          type="password"
          labelClassName="font-medium font-baloo text-base xs:test-lg lg:text-xl"
          placeholder="JohnDEbby1234%@"
          className="!mt-0 !rounded-lg"
          icon={<Lock size={18} className="text-primary" />}
          {...register("password", {
            required: "Password field cannot be empty",
          })}
          error={formState.errors["password"]}
        />

        <InputField
          label="Confirm Password"
          type="password"
          placeholder="JohnDEbby1234%@"
          labelClassName="font-medium font-baloo text-base xs:test-lg lg:text-xl"
          className="!mt-0 !rounded-lg"
          icon={<Lock size={18} className="text-primary" />}
          {...register("confirmPassword", {
            required: "Confirm Password field cannot be empty",
            validate: (value) =>
              value === getValues("password") || "Passwords do not match",
          })}
          error={formState.errors["confirmPassword"]}
        />

        <div className="mt-10">
          <Button
            isLoading={isPending}
            isDisabled={isPending}
            type="submit"
            variant="solid"
          >
            Reset Password
          </Button>{" "}
        </div>

        <Button
          type="button"
          onClick={() => router.push("/")}
          className="!bg-[#AA3300] hover:!bg-[#922900] font-roboto"
        >
          Do this later
        </Button>
      </form>
    </div>
  );
}

