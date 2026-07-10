"use client";

import { Button } from "@/components/button/Button";
import { forgotPasswordService } from "@/services/auth-service";
import { Info, Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const RESEND_COOLDOWN_SECONDS = 60;
const STORAGE_KEY = "forgotPasswordResendAvailableAt";

function ForgotPasswordSentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [isResending, setIsResending] = useState(false);

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

  const canResend = secondsLeft <= 0;

  const handleResend = async () => {
    if (!email) return;
    setIsResending(true);
    try {
      await forgotPasswordService({ email });
      const availableAt = Date.now() + RESEND_COOLDOWN_SECONDS * 1000;
      sessionStorage.setItem(STORAGE_KEY, availableAt.toString());
      setSecondsLeft(RESEND_COOLDOWN_SECONDS);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-full max-w-[600px] bg-white rounded-2xl px-4 py-8 xs:p-8 text-gray-900 text-center shadow-lg">
      <div className="flex justify-center mb-4">
        <div className=" flex items-center justify-center">
          <Mail size={35} className="text-primary" />
        </div>
      </div>

      <h1 className="text-2xl xs:text-3xl font-bold mb-1">Check your inbox!</h1>
      <p className="text-sm xxs:text-base xs:text-lg mb-1">
        We've sent a reset link to your email:
      </p>
      {email && (
        <p className="text-sm xxs:text-base xs:text-lg font-semibold mb-5">
          {email}
        </p>
      )}

      <div className="flex max-w-[400px] mx-auto items-center gap-3 border border-primary rounded-xl py-2 px-6 text-left mb-6">
        <Info size={25} className="text-primary shrink-0" />
        <p className="text-xs xxs:text-sm xs:text-base lg:text-lg text-center text-black leading-snug">
          Do check your spam folder. Sometimes it likes to hide there.
        </p>
      </div>

      {!canResend && (
        <p className="text-primary font-semibold mb-2">
          Resend in 0:{secondsLeft.toString().padStart(2, "0")}s
        </p>
      )}

      <div className="mt-14 space-y-3">
        <Button
          type="button"
          variant="solid"
          isLoading={isResending}
          isDisabled={!canResend || !email}
          onClick={handleResend}
        >
          Resend Email
        </Button>

        <Button
          type="button"
          onClick={() => router.back()}
          className="!bg-[#AA3300] hover:!bg-[#922900] font-roboto"
        >
          Go back
        </Button>
      </div>

      <p className="mt-5 text-sm text-gray-500">
        Wrong Email?{" "}
        <a
          href="/forgot-password"
          className="font-semibold text-primary hover:underline"
        >
          Change
        </a>
      </p>
    </div>
  );
}

export default function ForgotPasswordSentPage() {
  return (
    <Suspense>
      <ForgotPasswordSentContent />
    </Suspense>
  );
}
