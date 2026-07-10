"use client";
import { Button } from "@/components/button/Button";
import { InputField } from "@/components/form/InputField";
import { API_URL } from "@/config/constants";
import { useSignup } from "@/features/auth/useSignup";
import { SignupFormProps } from "@/types/form-props";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { IoBusinessOutline } from "react-icons/io5";

interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

export default function SignupForm({ onSuccess }: SignupFormProps) {
  const signup = useSignup({ onSuccess });

  const { register, handleSubmit, formState, getValues } =
    useForm<SignupFormData>({ mode: "onChange" });

  const onSubmit = (data: SignupFormData) => {
    const { confirmPassword, ...signupData } = data;
    signup.submit(signupData, {
      onSuccess: () => {
        onSuccess(data.email);
      },
    });
  };

  const handleGoogleLogin = () => {
    window.location.assign(`${API_URL}/v1/auth/google`);
  };

  return (
    <div className="relative bg-white -mt-6 xs:-mt-24 lg:mt-0 z-[100] px-4 py-6 xxs:p-6 xl:p-10 rounded-2xl shadow-md">
      <div className="xs:text-center lg:text-start mb-5">
        <h1 className="text-2xl xs:text-3xl xl:text-4xl font-bold  text-black">
          Create your <span className="text-primary">awoof</span> account
        </h1>
        <p className="text-sm xs:text-base xl:text-lg font-medium leading-relaxed mt-1 text-muted">
          Join the Awoofers community! Spend less, save more, publish deals and
          reach active audiences.
        </p>
      </div>

      <form
        className="space-y-4 xl:space-y-6 mt-4 lg:mt-6 xl:mt-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputField
          label="Full Name"
          placeholder="John Debby"
          labelClassName="font-medium font-baloo text-base xs:test-lg lg:text-xl"
          compulsory={true}
          type="text"
          className="!mt-0 !py-2  !rounded-lg"
          icon={<IoBusinessOutline size={18} className="text-primary" />}
          {...register("name", { required: "Full name is required" })}
          error={formState.errors["name"]}
        />

        <InputField
          label="Email Address"
          placeholder="you@email.com"
          compulsory={true}
          type="email"
          className="!mt-0 !py-2 !rounded-lg"
          labelClassName="font-medium font-baloo text-base xs:test-lg lg:text-xl"
          icon={<Mail size={18} className="text-primary" />}
          {...register("email", {
            required: "Email is required to verify your account",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
          error={formState.errors["email"]}
        />

        <InputField
          label="Password"
          type="password"
          compulsory={true}
          placeholder="JohnDEbby1234%@"
          labelClassName="font-medium font-baloo text-base xs:test-lg lg:text-xl"
          className="!mt-0 !rounded-lg"
          icon={<Lock size={18} />}
          {...register("password", {
            required: "Password field cannot be empty",
          })}
          error={formState.errors["password"]}
        />

        <InputField
          label="Confirm Password"
          type="password"
          compulsory={true}
          placeholder="JohnDEbby1234%@"
          labelClassName="font-medium font-baloo text-base xs:test-lg lg:text-xl"
          className="!mt-0 !rounded-lg"
          icon={<Lock size={18} />}
          {...register("confirmPassword", {
            required: "Confirm Password field cannot be empty",
            validate: (value) =>
              value === getValues("password") || "Passwords do not match",
          })}
          error={formState.errors["confirmPassword"]}
        />

        <div className="mt-8">
          <Button
            isLoading={signup.isPending}
            isDisabled={signup.isPending || !formState.isDirty}
            type="submit"
          >
            Create Account
          </Button>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="text base xs:text-lg font-baloo font-semibold text-black hover:text-slate-700 hover:underline"
          >
            Continue as Guest
          </Link>
        </div>

        <div className="relative mb-4  w-full">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-muted/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-muted">OR</span>
          </div>
        </div>

        <Button onClick={handleGoogleLogin} type="button" variant="outline">
          <FcGoogle size={20} />
          Continue with Google
        </Button>

        <div className="text-center space-y-2">
          <p className="text-muted font-medium text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
