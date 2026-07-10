"use client";

import { Button } from "@/components/button/Button";
import { Seo } from "@/components/seo/Seo";
import { useResendVerification } from "@/features/auth/useResendVerification";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const RESEND_COOLDOWN_SECONDS = 5 * 60;
const STORAGE_KEY = "verifyEmailResendAvailableAt";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const { submit: resendEmail, isPending: isResending } =
    useResendVerification();
  const [secondsLeft, setSecondsLeft] = useState<number>(() => {
    if (typeof window === "undefined") return RESEND_COOLDOWN_SECONDS;

    const stored = sessionStorage.getItem(STORAGE_KEY);
    let availableAt: number;

    if (stored) {
      availableAt = parseInt(stored, 10);
    } else {
      availableAt = Date.now() + RESEND_COOLDOWN_SECONDS * 1000;
      sessionStorage.setItem(STORAGE_KEY, availableAt.toString());
    }

    const remainingMs = availableAt - Date.now();
    return Math.max(0, Math.ceil(remainingMs / 1000));
  });

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsLeft]);

  const handleResend = () => {
    if (!email) return;
    resendEmail(
      { email },
      {
        onSuccess: () => {
          const availableAt = Date.now() + RESEND_COOLDOWN_SECONDS * 1000;
          sessionStorage.setItem(STORAGE_KEY, availableAt.toString());
          setSecondsLeft(RESEND_COOLDOWN_SECONDS);
        },
      },
    );
  };

  const canResend = secondsLeft <= 0;
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="max-w-[600px] mx-auto flex flex-col justify-center items-center min-h-[90vh] text-center space-y-6 px-4">
      <Seo title="Check your inbox" />

      <div className="space-y-2">
        <h1 className="text-2xl xs:text-3xl md:text-4xl font-bold text-gray-900">
          Check your <span className="text-primary">inbox!</span>
        </h1>
        <p className="text-sm xxs:text-base xs:text-lg md:text-xl font-medium text-muted">
          We've sent a verification link to the email{" "}
          {email ? (
            <span className="font-semibold text-gray-700">{email}</span>
          ) : (
            "your mail"
          )}
        </p>
      </div>

      <div className="flex justify-center">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#FFD5C3] flex items-center justify-center">
          <Mail size={32} className="text-black w-[20px] md:w-[35px]" />
        </div>
      </div>

      <p className="text-sm xxs:text-base md:text-lg text-gray-900 leading-relaxed max-w-[300px]">
        Do{" "}
        <span className="font-semibold text-gray-900">
          check your spam folder,
        </span>{" "}
        <br />
        sometimes it likes to hide there.
      </p>
      <span className="text-xs xxs:text-sm xs:text-base md:text-lg text-gray-900 leading-relaxed mt-0">
        Click on the link to complete the verification process.{" "}
      </span>
      <Button
        type="button"
        isLoading={isResending}
        isDisabled={!canResend || !email}
        onClick={handleResend}
      >
        {canResend
          ? "Resend Email"
          : `Resend in ${minutes}:${seconds.toString().padStart(2, "0")}`}
      </Button>

      <Link
        href="/signup"
        className="inline-flex font-baloo items-center gap-1 text-sm xxs:text-base md:text-lg font-semibold text-primary hover:underline"
      >
        Wrong Email <FaArrowRight size={15} />
      </Link>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailContent />
    </Suspense>
  );
}