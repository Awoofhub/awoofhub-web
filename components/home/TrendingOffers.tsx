import { useTrendingOffers } from "@/features/offers/useTrendingOffers";
import Link from "next/link";
import { ErrorBoundary } from "react-error-boundary";
import { FiArrowRight } from "react-icons/fi";
import { OfferError } from "../offers/OfferError";
import OfferList from "../offers/OfferList";
import OfferListSkeleton from "../offers/OfferListSkeleton";
import Image from "next/image";

export default function TrendingOffers() {
  const { data, isFetching, isFetched } = useTrendingOffers({
    page: 1,
    limit: 8,
  });

  return (
    <section className="bg-gray-50">
      <div className="pb-12 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="px-4 py-2 bg-primary flex justify-between items-center">
          <span className="flex gap-2">
            <Image src="yellowFlame.svg" alt="flame" width={20} height={20} />
            <h3 className="text-xl md:text-2xl font-semibold  text-white">
              Trending now
            </h3>
          </span>

          <Link
            href="/trending"
            className="group inline-flex items-center gap-2 text-white font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
          >
            <span className="text-white text-xs sm:text-sm font-bold">
              View all
            </span>
            <FiArrowRight className=" text-white transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        <ErrorBoundary fallback={<OfferError />}>
          {isFetching && <OfferListSkeleton number={4} />}
          {!isFetching && data.length === 0 && (
            <p className="text-gray-500">No trending offers available.</p>
          )}
          {isFetched && data.length > 0 && <OfferList offers={data} />}
        </ErrorBoundary>
      </div>
    </section>
  );
}
