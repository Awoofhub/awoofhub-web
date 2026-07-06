"use client";

import ReportModal from "@/components/modals/ReportModal";
import ShareModal from "@/components/modals/ShareModal";
import SingleOffer from "@/components/offer/SingleOffer";
import SingleOfferSkeleton from "@/components/offer/SingleOfferSkeleton";
import OfferList from "@/components/offers/OfferList";
import OfferListSkeleton from "@/components/offers/OfferListSkeleton";
import WishlistButton from "@/components/wishlist/WishlistButton";
import { useOffer } from "@/features/offers/useOffer";
import { useRandomOffers } from "@/features/offers/useRandomOffers";
import { truncateId } from "@/utils/truncate";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { use, useRef, useState } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

export default function OfferPage({ params }: Props) {
  const { id } = use(params);
  const { data: offer, isLoading } = useOffer({ id });
  const { data, isFetching, isFetched } = useRandomOffers();
  const [isReportOpen, setIsReportOpen] = useState(false);
  const wishlistWrapperRef = useRef<HTMLDivElement>(null);

  if (isLoading) {
    return (
      <section className="p-4 sm:p-8 mx-auto max-w-[1440px] bg-white text-gray-800 border-b border-gray-300 pb-30">
        <div className="mx-auto flex justify-between items-center mb-7 md:mb-10">
          <div className="w-48 h-4 bg-gray-200 rounded animate-pulse" />
          <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
        </div>
        <SingleOfferSkeleton />
      </section>
    );
  }

  if (!offer) {
    return (
      <section className="pt-14 px-6">
        <p className="text-center text-gray-500">Offer not found.</p>
      </section>
    );
  }

  return (
    <div className="bg-white">
      <section className="px-4 md:px-6 lg:px-12 py-6 lg:py-10 mx-auto max-w-[1440px] border-b border-gray-300 pb-30">
        <div className="mx-auto flex flex-wrap gap-2 justify-between lg:items-center mb-4 md:mb-6 lg:mb-10">
          <nav className="flex items-center gap-0.25 md:gap-1 lg:gap-2">
            <Link
              className="text-[10px] xs:text-xs md:text-sm lg:text-base font-baloo font-medium text-muted/50"
              href={"/"}
            >
              Home
            </Link>{" "}
            <ChevronRight size={14} className="text-muted" />
            <Link
              className="text-[10px] xs:text-xs md:text-sm lg:text-base font-baloo font-medium text-muted/50"
              href={`/offers?category=${offer.category.slug}`}
            >
              <span className="xs:hidden">
                {truncateId(offer.category.name, 10)}
              </span>
              <span className="hidden xs:inline">{offer.category.name}</span>
            </Link>
            <ChevronRight size={14} className="text-muted" />
            <span className="max-w-[40px] xxs:max-w-[130px] xs:max-w-[140px] md:max-w-[170px] lg:max-w-[250px] xl:max-w-none truncate font-medium text-[10px] xs:text-xs md:text-sm lg:text-base font-baloo text-black">
              {offer.id}
            </span>
          </nav>

          <div className="flex items-center gap-1 md:gap-4 font-semibold font-baloo">
            <button
              onClick={() => setIsReportOpen(true)}
              className="hidden xs:inline border-2 border-[#E70606] rounded-md md:rounded-lg py-2 px-2 lg:px-3 xs:text-xs md:text-sm lg:text-base text-[#E70606] hover:bg-red-500 hover:text-white cursor-pointer"
            >
              Report this deal
            </button>
            <button
              onClick={() => setIsReportOpen(true)}
              className="xs:hidden border border-[#E70606] rounded-lg py-1 px-2 text-[10px] text-[#E70606] hover:bg-red-500 hover:text-white cursor-pointer"
            >
              Report
            </button>

            <span className="text-gray-300">|</span>
            <div
              ref={wishlistWrapperRef}
              className="flex items-center gap-1 cursor-pointer text-[10px] xs:text-xs md:text-sm lg:text-base"
            >
              <WishlistButton offerId={offer.id} size="text-[25px]" />{" "}
              <span
                className="text-black"
                onClick={() =>
                  wishlistWrapperRef.current?.querySelector("button")?.click()
                }
              >
                Save
              </span>
            </div>
            <span className="text-gray-300">|</span>
            <ShareModal offerId={offer.id} />
          </div>
        </div>
        <SingleOffer offer={offer} />

        <ReportModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          targetType="offer"
          targetId={offer.id}
          targetName={offer.title}
          targetImage={offer.imageUrl}
          targetBadge={offer.contributor.name}
        />
      </section>

      <section className="px-4 md:px-6 lg:px-12 py-10 lg:py-12 mx-auto max-w-[1440px] mb-16 lg:mb-0">
        <h3 className="text-xl xs:text-2xl md:text-3xl font-bold mb-4 lg:mb-6">
          Explore more offers like this
        </h3>

        {isFetching && <OfferListSkeleton number={8} />}
        {!isFetching && data.length === 0 && (
          <p className="text-gray-500 text-center">No offers available.</p>
        )}
        {isFetched && data.length > 0 && <OfferList offers={data} />}
      </section>
    </div>
  );
}
