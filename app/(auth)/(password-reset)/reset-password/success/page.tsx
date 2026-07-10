"use client";

import { Button } from "@/components/button/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ResetPasswordSuccessPage() {
  const router = useRouter();

  return (
    <div className="text-center min-h-[80vh] space-y-6 max-w-lg w-full">
      <div className="flex justify-center ">
        <Image
          src="/emailSuccess.png"
          alt="Success"
          width={500}
          height={500}
          priority
          className="w-[140px] md:w-[230px] h-auto flex justify-center"
        />
      </div>

      <div className="space-y-2">
        <h1 className="text-xl xs:text-2xl md:text-3xl font-bold text-gray-900">
          Success!
        </h1>
        <p className="text-base xs:text-lg md:text-xl font-medium mx-auto text-gray-500 leading-relaxed">
          Your have successfully reset your password! We welcome you back
          onboard!
        </p>
      </div>

      <Button type="button" onClick={() => router.push("/login")}>
        Proceed to LogIn
      </Button>
    </div>
  );
}
