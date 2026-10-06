"use client";

import Link from "next/link";
import { ArrowRight, LockKeyholeOpen } from "lucide-react";

export default function CreatorNotSubscribed() {
  return (
    <div className="flex flex-col text-center w-full max-w-[700px] mx-auto justify-center  items-center  min-h-screen  ">
      <LockKeyholeOpen
        className="size-12 text-[#FF5003]"
        strokeWidth={2}
        aria-hidden="true"
      />

      <h2 className="mt-6 text-2xl font-bold text-black md:text-[28px]">
        Unlock the creator studio
      </h2>

      <p className="mt-2 text-base leading-relaxed text-neutral-600 md:text-xl">
        Share your best deals with the community and start earning rewards for
        every approved Awoof. Join our growing network of successful
        contributors today.
      </p>

      <Link
        href="/premium-user"
        className="mt-10 flex h-14 w-full items-center justify-center rounded-md bg-[#FF5003] text-base font-semibold text-white transition hover:bg-[#e04500] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5003] md:text-lg"
      >
        Join Premium to Start
      </Link>

      <Link
        href="/creator-studio-learnmore"
        className="mt-6 inline-flex items-center gap-2 text-lg font-semibold text-[#FF5003] hover:underline md:text-xl"
      >
        Learn More
        <ArrowRight className="size-5" aria-hidden="true" />
      </Link>
    </div>
  );
}
