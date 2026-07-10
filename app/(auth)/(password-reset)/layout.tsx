"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function PasswordResetLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isResetSuccess = pathname?.startsWith("/reset-password/success");

  if (isResetSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        {children}
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-50 flex flex-col p-6 overflow-hidden">
      <Image
        src="/onboarding-oval1.svg"
        alt="background decoration"
        priority
        width={500}
        height={500}
        className="absolute -top-40 -left-70 lg:-top-20 lg:-left-20"
      />
      <Image
        src="/onboarding-oval2.svg"
        alt="background decoration"
        priority
        width={500}
        height={500}
        className="absolute -right-30 top-0 lg:right-0"
      />
      <Image
        src="/onboarding-oval3.svg"
        alt="background decoration"
        priority
        width={500}
        height={500}
        className="absolute -bottom-30 -left-30 lg:-bottom-20 lg:left-0"
      />
      <Image
        src="/onboarding-oval4.svg"
        alt="background decoration"
        priority
        width={500}
        height={500}
        className="absolute -bottom-30 -right-40 lg:-bottom-30 lg:-right-10"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-14 pt-4 pb-6 flex justify-center xs:justify-start items-center">
        <Link href="/">
          <Image
            src="/Logo.png"
            alt="AwoofHub"
            width={200}
            height={40}
            className="w-[120px] xs:w-[200px]"
            priority
          />
        </Link>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] flex-1 flex items-start justify-center">
        {children}
      </div>
    </div>
  );
}
