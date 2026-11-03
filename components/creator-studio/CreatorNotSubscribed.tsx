"use client";

import { ArrowRight, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreatorNotSubscribed() {
  const router = useRouter();

  return (
    <div >
      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm xs:text-lg font-baloo font-semibold mb-4"
      >
        <ChevronLeft size={16} /> Back
      </button>

      <div className="flex flex-col px-3 text-center w-full max-w-150 mx-auto justify-center items-center min-h-[60dvh]">
        <Image src="/creator-lock.svg" width={40} height={40} alt="" className="w-[20px] xs:w-[28px]" />

        <h2 className="mt-4 xs:mt-6 text-2xl font-bold text-black md:text-[28px]">
          Unlock the creator studio
        </h2>

        <p className="mt-2 text-sm font-medium leading-relaxed text-muted md:text-lg">
          Share your best deals with the community and start earning rewards for every approved Awoof. Join our growing network of successful creators today.
        </p>

        <Link
          href="/premium-user"
          className="mt-6 xs:mt-8 flex py-2 w-full items-center justify-center rounded-sm bg-primary font-baloo text-base font-semibold text-white transition hover:bg-[#e04500] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5003] md:text-lg"
        >
          Upgrade to Premium
        </Link>

        <Link
          href="/creator-studio/learn-more"
          className="mt-4 inline-flex items-center gap-2 text-lg font-baloo font-semibold text-primary hover:underline md:text-xl"
        >
          Learn More
          <ArrowRight className="size-5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
