"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const MENU_ITEMS = [
  { label: "Analytics", href: "/creator-studio/analytics" },
  { label: "Payment settings", href: "/creator-studio/payment-settings" },
  { label: "Payouts", href: "/creator-studio/payouts" },
  { label: "Contact support", href: "/help" },
  { label: "Learn more", href: "/creator-studio/learn-more" },
];

export default function CreatorSubscribed() {
  const router = useRouter();

  return (
    <div >
      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="text-neutral-600 hover:text-black"
        >
          <ChevronLeft className="size-6" />
        </button>
        <h1 className="text-2xl font-bold text-black ">
          Creator Studio
        </h1>
      </div>

      <nav className="mx-auto mt-16 flex w-full max-w-[850px] flex-col gap-4 md:mt-24" >
        {MENU_ITEMS.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="flex h-16 items-center justify-center rounded-xl border-2 border-[#FF5003] text-base font-semibold text-neutral-600 transition hover:bg-[#FF5003]/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5003] md:text-lg"
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
