"use client";
import { Seo } from "@/components/seo/Seo";
import SignupForm from "@/components/signup/SignupForm";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  
  const onSuccess = (email: string) => {
    router.push(`/email-sent?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="w-full px-4 md:px-6  lg:px-0">
      <Seo title="Sign Up" />
      <SignupForm onSuccess={onSuccess} />
    </div>
  );
}