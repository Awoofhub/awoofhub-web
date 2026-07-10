"use client";

import { Button } from "@/components/button/Button";
import { InputField } from "@/components/form/InputField";
import { useForgotPassword } from "@/features/auth/useForgotPassword";
import { EmailData } from "@/types/auth";
import { Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { register, handleSubmit, formState, getValues } = useForm<EmailData>();

  const onSuccess = () => {
    const email = getValues("email");
    router.push(`/forgot-password/sent?email=${encodeURIComponent(email)}`);
  };

  const { submit, isPending } = useForgotPassword({
    onSuccess,
  });

  const onSubmit = (data: EmailData) => {
    submit(data);
  };

  return (
    <div className="w-full max-w-[600px] bg-white rounded-2xl px-4 py-8 xs:p-8 text-gray-900 text-center shadow-lg">
      {/* Lock icon */}
      <div className="flex justify-center mb-4">
        <div className="flex items-center justify-center">
          <Lock size={32} className="text-primary" />
        </div>
      </div>

      <h1 className="text-2xl xs:text-3xl font-bold mb-1">Forgot password?</h1>
      <p className="text-sm xxs:text-base xs:text-lg md:text-xl mb-6 leading-relaxed">
        Enter the email address associated with your account and we’ll send you
        a reset link.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Enter Email address"
          placeholder="you@email.com"
          compulsory={true}
          type="email"
          labelClassName="font-medium font-baloo text-base xs:test-lg lg:text-xl"
          className="!mt-0 !py-2"
          icon={<Mail size={18} className="text-muted" />}
          {...register("email", {
            required: "Email is required to verify your account",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
          error={formState.errors["email"]}
        />
        <div className="mt-10">
          {" "}
          <Button
            isLoading={isPending}
            isDisabled={isPending}
            type="submit"
            variant="solid"
          >
            Send Reset Link
          </Button>
        </div>

        <Button
          type="button"
          onClick={() => router.back()}
          className="!bg-[#AA3300] hover:!bg-[#922900] font-roboto"
        >
          Go back
        </Button>
      </form>

      <p className="mt-4 text-sm font-medium text-primary">
        Remember password?{" "}
        <a href="/login" className="font-medium text-primary hover:underline">
          Login
        </a>
      </p>
    </div>
  );
}
