"use client";

import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  ChevronLeft,
  CreditCard,
  Headphones,
  MoreHorizontal,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface MenuItem {
  title: string;
  description: string;
  linkLabel: string;
  href: string;
  icon: LucideIcon;
  wide?: boolean;
}

const MENU_ITEMS: MenuItem[] = [
  {
    title: "Analytics",
    description: "Track views, saves, grabs, and engagements across your Awoofs",
    linkLabel: "View Analytics",
    href: "/creator-studio/analytics",
    icon: BarChart3,
    wide: true,
  },
  {
    title: "Payment Settings",
    description: "Update your bank account details for payouts",
    linkLabel: "Manage payments",
    href: "/creator-studio/payment-settings",
    icon: CreditCard,
  },
  {
    title: "Payouts",
    description: "Track your earnings and view your payout history",
    linkLabel: "View Payouts",
    href: "/creator-studio/payouts",
    icon: Wallet,
  },
  {
    title: "Contact Support",
    description: "We're here to help with any questions or issues.",
    linkLabel: "Get Support",
    href: "/help",
    icon: Headphones,
  },
  {
    title: "Learn More",
    description: "Most of your questions are already answered in our FAQs",
    linkLabel: "Explore FAQs",
    href: "/creator-studio/learn-more",
    icon: MoreHorizontal,
  },
];

export default function CreatorSubscribed() {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="cursor-pointer text-black hover:text-gray-700"
        >
          <ChevronLeft className="size-5"/>
        </button>
        <h1 className="text-base xs:text-xl font-semibold text-black">
          Creator Studio
        </h1>
      </div>

      <div className="relative w-full">
        <Image src="/big-creator-banner.svg" width={2000} height={100} alt="" className="hidden h-auto w-[101.6%] max-w-none -ml-[1.6%] lg:block" />
        <Image src="/tab-creator-banner.svg" width={100} height={100} alt="" className="hidden h-auto w-[101.6%] max-w-none -ml-[1.6%] xs:block lg:hidden" />
        <Image src="/small-creator-banner.svg" width={360} height={100} alt="" className="block h-auto w-[102.6%] max-w-none -ml-[3.2%] xs:hidden" />
      </div>

      <div>
        <p className="mt-4 xs:mt-1 text-xs md:text-sm uppercase tracking-wide text-primary">
          Explore your studio
        </p>
        <p className="text-sm mt-0.5 md:text-base text-muted">
          Choose a section to review your performance, money, or creator resources.
        </p>
      </div>

      <nav className="mt-4 md:mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {MENU_ITEMS.map(({ title, description, linkLabel, href, icon: Icon, wide }) => (
          <Link
            key={href}
            href={href}
            className={`group flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4 xs:p-5 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${wide ? "md:col-span-2" : ""}`}
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#FFD5C366] text-primary">
              <Icon className="size-5" />
            </span>
            <div>
              <h3 className="text-lg lg:text-2xl font-semibold text-black">{title}</h3>
              <p className="text-sm text-gray-900">{description}</p>
              <span className="mt-3 flex items-center gap-1 font-baloo text-sm font-semibold text-primary">
                {linkLabel}
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
}