"use client";

import { Button } from "@/components/button/Button";
import { InputField } from "@/components/form/InputField";
import { useResetPassword } from "@/features/auth/useResetPassword";
import { Spinner } from "@chakra-ui/react";
import { Lock } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";

export interface ResetPasswordTempData {
  token: string;
  password: string;
  confirmPassword: string;
}

function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token")?.toString();

  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace("/forgot-password");
    }
  }, [token, router]);

  const onSuccess = () => {
    const redirect = "/reset-password/success";
    router.push(redirect);
  };

  const { submit, isPending } = useResetPassword({
    onSuccess,
  });

  const { register, handleSubmit, formState, getValues } =
    useForm<ResetPasswordTempData>();

  const onSubmit = (data: ResetPasswordTempData) => {
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

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center">
          <Spinner size="xl" />
        </div>
      }
    >
      <ResetPassword />
    </Suspense>
  );
}
