import { useTrendingOffers } from "@/features/offers/useTrendingOffers";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { IoIosArrowForward } from "react-icons/io";
import { OfferError } from "../offers/OfferError";
import OfferList from "../offers/OfferList";
import OfferListSkeleton from "../offers/OfferListSkeleton";

export default function TrendingOffers() {

  const { data, isFetching, isFetched } = useTrendingOffers({
    limit: 4,
  });

  const allOffers = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );

  return (
    <section className="bg-gray-50">
      <div className="pb-8 lg:pb-12 px-4 md:px-6 lg:px-8 xl:px-12 max-w-[1440px] mx-auto">
        <div className="px-2 md:px-4 py-2 bg-primary flex justify-between items-center">
          <span className="flex items-center gap-2">
            <Image src="yellowFlame.svg" alt="flame" priority width={20} height={20} className="w-5 h-5 md:w-6 md:h-6"/>
            <h3 className="text-base md:text-xl lg:text-2xl font-semibold  text-white">
              Trending now
            </h3>
          </span>

          <Link
            href="/trending"
            className="group inline-flex items-center gap-2 text-white font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
          >
            <span className="text-white text-sm md:text-base  font-medium font-baloo">
              View all
            </span>
            <IoIosArrowForward className=" text-white transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        <ErrorBoundary fallback={<OfferError />}>
          {isFetching && <OfferListSkeleton number={4} />}
          {!isFetching && allOffers.length === 0 && (
            <p className="text-gray-500 mt-2">No offers available.</p>
          )}
          {isFetched && allOffers.length > 0 && <OfferList offers={allOffers} />}
        </ErrorBoundary>
      </div>
    </section>
  );
}
