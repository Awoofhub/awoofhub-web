"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname?.startsWith("/login");
  const isSignup = pathname?.startsWith("/signup");

  if (isSignup) {
    return <>{children}</>;
  }

  if (!isLogin) {
    return <div className="bg-white min-h-screen">{children}</div>;
  }

  return (
    <div className="relative bg-primary overflow-hidden min-h-screen">
      <Image
        src="/login-oval1.svg"
        alt="background decoration"
        priority
        width={500}
        height={400}
        className="absolute top-0 -left-60 lg:top-20 lg:-left-10"
      />
      <Image
        src="/login-oval2.svg"
        alt="background decoration"
        priority
        width={500}
        height={500}
        className="absolute top-0 -right-50 lg:right-40"
      />
      <Image
        src="/login-oval3.svg"
        alt="background decoration"
        priority
        width={500}
        height={500}
        className="absolute -bottom-40 -left-10"
      />
      <Image
        src="/login-oval4.svg"
        alt="background decoration"
        priority
        width={500}
        height={500}
        className="absolute -bottom-40 -right-40 md:-bottom-20 md:-right-20 lg:-bottom-10 lg:-right-10"
      />
      <div className="relative z-10 mx-auto w-full max-w-[1440px] flex-1 flex items-start justify-center">
        {children}
      </div>
    </div>
  );
}