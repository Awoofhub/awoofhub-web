"use client";
import Loading from "@/components/loading/Loading";
import { Seo } from "@/components/seo/Seo";
import { Button } from "@/components/button/Button";
import { useVerifyEmail } from "@/features/auth/useVerifyEmail";
import { useResendVerification } from "@/features/auth/useResendVerification";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function EmailVerification() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token")?.toString();
  const email = searchParams.get("email");

  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace("/email-sent");
    }
  }, [token, router]);

  const onSuccess = () => {
    router.push("/verify-email/success");
  };

  const { submit, isPending } = useVerifyEmail({ onSuccess });
  const { submit: resendEmail, isPending: isResending } =
    useResendVerification();

  useEffect(() => {
    if (!token) return;
    submit({ token });
  }, [token]);

  const handleResend = () => {
    if (!email) return;
    resendEmail({ email });
  };

  if (!token || isPending) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="text-center px-4 space-y-6 min-h-[90vh] max-w-[600px] mx-auto flex flex-col justify-center items-center">
      <Seo title="Sorry, we couldn't verify your email" />

      <div className="flex justify-center">
        <Image
          src="/emailFailure.png"
          alt="Verification failed"
          width={500}
          height={500}
          priority
          className="w-[140px] md:w-[230px] h-auto flex justify-center"
        />
      </div>

      <div className="space-y-2">
        <h1 className="text-xl xs:text-2xl md:text-3xl font-bold text-gray-900">
          Sorry! we couldn’t verify your email
        </h1>
        <p className="text-xs xxs:text-sm xs:text-lg md:text-xl font-medium text-gray-500 leading-relaxed">
          Something went wrong while validating your email:
          <br />
          {email && (
            <span className="text-sm xxs:text-base xs:text-lg md:text-xl font-semibold text-[#BA1A1A]">
              {email}
            </span>
          )}
        </p>
      </div>

      <p className="text-sm xxs:text-base xs:text-lg md:text-xl font-medium text-gray-500">
        Link may be invalid or has expired.
      </p>

      <div className="w-full space-y-3">
        <Button
          type="button"
          isLoading={isResending}
          isDisabled={!email}
          onClick={handleResend}
        >
          Resend link
        </Button>

        <Link href="/signup" className="block">
          <Button type="button" variant="outline">
            Change email
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function EmailVerificationPage() {
  return (
    <Suspense fallback={<Loading />}>
      <EmailVerification />
    </Suspense>
  );
}
