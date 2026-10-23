"use client";

import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import ForgotPasswordSent from "@/components/auth/ForgotPasswordSent";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState<string | null>(null);

  const handleSuccess = (userEmail: string) => {
    setEmail(userEmail);
  };

  if (email) {
    return (
      <ForgotPasswordSent email={email} onReset={() => setEmail(null)} />
    )
  }

  return (
    <ForgotPasswordForm onSuccess={handleSuccess} />
  )

}
