"use client";

import { Button } from "@/components/button/Button";
import { useResendVerification } from "@/features/auth/useResendVerification";
import { Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const RESEND_COOLDOWN_SECONDS = 5 * 60;

interface Props {
  email: string;
  onReset: () => void;
}

export default function EmailSent({ email, onReset }: Props) {

  const [secondsLeft, setSecondsLeft] = useState<number>(RESEND_COOLDOWN_SECONDS);

  const { submit: resendEmail, isPending: isResending } = useResendVerification({
    onSuccess: () => {
      setSecondsLeft(RESEND_COOLDOWN_SECONDS)
    },
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
    resendEmail({ email });
  };

  const handleWrongEmail = () => {
    onReset();
  };

  const canResend = secondsLeft <= 0;
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="max-w-[600px] mx-auto flex flex-col justify-center items-center min-h-[90vh] text-center space-y-6 px-4">
      <div className="space-y-2">
        <h1 className="text-2xl xs:text-3xl md:text-4xl font-bold text-gray-900">
          Check your <span className="text-primary">inbox!</span>
        </h1>
        <p className="text-sm xxs:text-base xs:text-lg md:text-xl font-medium text-muted">
          <span>We've sent a verification link to the email</span><br />
          <span className="font-semibold text-gray-700">{email}</span>
        </p>
      </div>

      <div className="flex justify-center">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#FFD5C3] flex items-center justify-center">
          <Mail size={32} className="text-black w-[20px] md:w-[35px]" />
        </div>
      </div>

      <p className="text-sm xxs:text-base md:text-lg text-gray-900 leading-relaxed max-w-[300px]">
        Do <span className="font-semibold text-gray-900">check your spam folder,</span><br />
        <span>
          sometimes it likes to hide there.
        </span>
      </p>
      <span className="text-xs xxs:text-sm xs:text-base md:text-lg text-gray-900 leading-relaxed mt-0">
        Click on the link to complete the verification process.
      </span>
      <Button
        type="button"
        isLoading={isResending}
        isDisabled={!canResend}
        onClick={handleResend}
      >
        {canResend ? "Resend Email" : `Resend in ${minutes}:${seconds.toString().padStart(2, "0")}`}
      </Button>

      <button
        type="button"
        onClick={handleWrongEmail}
        className="inline-flex font-baloo items-center gap-1 text-sm xxs:text-base md:text-lg font-semibold text-primary hover:underline cursor-pointer"
      >
        Wrong Email <FaArrowRight size={15} />
      </button>
    </div>
  );
}

