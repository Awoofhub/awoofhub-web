"use client";

import { Button } from "@/components/button/Button";
import { useForgotPassword } from "@/features/auth/useForgotPassword";
import { Info, Mail } from "lucide-react";
import { useEffect, useState } from "react";

const RESEND_COOLDOWN_SECONDS = 60;

interface Props {
  email: string;
  onReset: () => void;
}

export default function ForgotPasswordSent({ email, onReset }: Props) {

  const [secondsLeft, setSecondsLeft] = useState<number>(RESEND_COOLDOWN_SECONDS);

  const { submit: resendEmail, isPending: isResending } = useForgotPassword({
    onSuccess: () => {
      setSecondsLeft(RESEND_COOLDOWN_SECONDS);
    },
  })

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsLeft]);

  const handleResend = async () => {
    if (!email) return;
    resendEmail({ email });
  };

  const handleWrongEmail = () => {
    onReset();
  };

  const canResend = secondsLeft <= 0;

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
          isDisabled={!canResend}
          onClick={handleResend}
        >
          Resend Email
        </Button>

        <Button
          type="button"
          onClick={handleWrongEmail}
          className="!bg-[#AA3300] hover:!bg-[#922900] font-roboto"
        >
          Go back
        </Button>
      </div>

    </div>
  );
}
