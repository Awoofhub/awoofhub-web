"use client";
import EmailSent from "@/components/auth/EmailSent";
import SignupForm from "@/components/auth/SignupForm";
import SignupWrapper from "@/components/auth/SignupWrapper";
import { useState } from "react";


export default function SignupPage() {
  const [email, setEmail] = useState<string | null>(null);

  const handleSuccess = (userEmail: string) => {
    setEmail(userEmail);
  };

  if (email) {
    return (
      <div className="bg-white min-h-screen">
        <EmailSent email={email} onReset={() => setEmail(null)} />
      </div>
    )
  }

  return (
    <SignupWrapper>
        <SignupForm onSuccess={handleSuccess} />
    </SignupWrapper>
  );
}