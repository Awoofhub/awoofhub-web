"use client";
import { Button } from "@/components/button/Button";
import { InputField } from "@/components/form/InputField";
import { API_URL } from "@/config/constants";
import { useLogin } from "@/features/auth/useLogin";
import { LoginData } from "@/types/auth";
import { LoginFormProps } from "@/types/form-props";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { LoginErrorModal } from "./LoginErrorModal";

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const login = useLogin({ onSuccess });

  const { register, handleSubmit, formState, reset } = useForm<LoginData>({
    mode: "onChange",
  });

  const onSubmit = (data: LoginData) => {
    login.submit(data);
  };

  const handleGoogleLogin = () => {
    window.location.assign(`${API_URL}/v1/auth/google`);
  };

  const statusCode =
    (login.error as any)?.response?.status ?? (login.error as any)?.statusCode;
  const isIncorrectPassword = statusCode === 400 || statusCode === 401;

  const errorMessage =
    (login.error as any)?.response?.data?.message ||
    (login.error as any)?.message ||
    "Incorrect password combination";

  return (
    <div className="relative md:max-w-[600px] lg:max-w-[800px] xl:max-w-[850px] w-full bg-white py-8 lg:py-10 px-6 md:px-8 lg:px-10 xl:px-12 rounded-xl shadow-md mx-auto">
      <div className="text-start mb-4">
        <h1 className="text-2xl xs:text-3xl font-bold tracking-tight text-slate-900">
          Welcome <span className="text-primary">back</span>
        </h1>
        <p className="text-sm xxs:text-base xs:text-lg xl:text-xl font-medium leading-relaxed mt-1 text-muted">
          Manage your offers or save offers and get personalised recommendations
        </p>
      </div>

      <form
        className="mt-6  space-y-4 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputField
          label="Email Address"
          placeholder="you@email.com"
          compulsory={true}
          type="email"
          labelClassName="font-medium font-baloo text-base xs:test-lg lg:text-xl"
          className="!mt-0 !py-2 !rounded-lg"
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
          placeholder="**********"
          labelClassName="font-medium font-baloo text-base xs:test-lg lg:text-xl"
          className="!mt-0 !rounded-lg"
          icon={<Lock size={18} />}
          {...register("password", {
            required: "Password field cannot be empty",
          })}
          error={formState.errors["password"]}
        />

        <div className="flex mt-0 justify-end ">
          <Link
            href="/forgot-password"
            className="text-sm text-orange-600 hover:text-red-600 cursor-pointer"
          >
            Forgot Password ?
          </Link>
        </div>

        <div>
          <Button
            isLoading={login.isPending}
            isDisabled={login.isPending}
            type="submit"
          >
            Login
          </Button>
        </div>

        <div className="relative my-5 w-full">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">OR</span>
          </div>
        </div>

        <Button onClick={handleGoogleLogin} type="button" variant="outline">
          <FcGoogle size={20} />
          Continue with Google
        </Button>

        <div className="text-center space-y-2">
          <p className="text-muted text-sm">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-primary font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>

      {login.isError && isIncorrectPassword && (
        <LoginErrorModal
          message={errorMessage}
          onClose={() => login.reset()}
          onReset={() => {
            reset();
            login.reset();
          }}
        />
      )}
    </div>
  );
};
