import { ReactNode } from "react";
import Image from "next/image";
import SignupHero from "@/components/signup/SignupHero";

export default function SignupLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1440px] flex flex-col lg:flex-row">
      <SignupHero />
     <div className="relative bg-gray-50 w-full min-h-screen lg:min-h-0 pb-12 lg:pb-0 lg:w-1/2 lg:px-8 xl:px-14 flex items-start lg:items-center justify-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Image
            src="/onboarding-oval1.svg"
            alt="background decoration"
            priority
            width={500}
            height={500}
            className="absolute top-10 -left-30"
          />
          <Image
            src="/onboarding-oval2.svg"
            alt="background decoration"
            priority
            width={500}
            height={500}
            className="absolute top-0 right-0"
          />
          <Image
            src="/onboarding-oval3.svg"
            alt="background decoration"
            priority
            width={400}
            height={400}
            className="absolute bottom-40 xs:bottom-0 lg:bottom-50 -left-20"
          />
          <Image
            src="/onboarding-oval4.svg"
            alt="background decoration"
            priority
            width={500}
            height={500}
            className="absolute -right-20 -bottom-10 lg:bottom-0 lg:right-0"
          />
        </div>
        <div className="relative z-10 w-full">{children}</div>
      </div>
    </div>
  );
}