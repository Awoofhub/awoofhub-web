"use client";
import { useOffers } from "@/features/offers/useOffers";
import Link from "next/link";
import { useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { IoIosArrowForward } from "react-icons/io";
import { useInView } from "react-intersection-observer";
import { OfferError } from "../offers/OfferError";
import OfferList from "../offers/OfferList";
import OfferListSkeleton from "../offers/OfferListSkeleton";
import Image from "next/image";

interface Props {
  category: {
    id: string;
    name: string;
    slug: string;
  };
  index: number;
  setVisibleSection: (section: string) => void;
}

export default function ScrollSync({
  category,
  index,
  setVisibleSection,
}: Props) {
  const { ref } = useInView({
    threshold: 0.5,
    onChange: (inView, entry) => {
      if (!inView) return;

      setVisibleSection(category.slug);
    },
  });

  const { data, isFetching, isFetched } = useOffers({
    search: "",
    category: category.slug,
    minRating: 0,
    createdFrom: "",
    createdTo: "",
    limit: 4,
  });

  const offers = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );

  return (
    <>
      <section
        id={category.slug}
        ref={ref}
        className="max-w-[1440px] mx-auto pb-10 lg:pb-14 px-4 md:px-6 lg:px-12 scroll-mt-40"
      >
        <div className="flex justify-between items-baseline mb-3 sm:mb-6">
          <h3
            id={`cat-heading-${category.id}`}
            className="text-base md:text-xl lg:text-2xl font-bold"
          >
            {category.name}
          </h3>

          <Link
            href={`/offers?category=${category.slug}`}
            className="group inline-flex items-center gap-2 font-baloo text-orange-600 font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
            aria-label={`View all offers in ${category.name}`}
          >
            <span className="text-xs sm:text-sm font-bold">View all</span>
            <IoIosArrowForward className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        <ErrorBoundary fallback={<OfferError />}>
          {isFetching && <OfferListSkeleton number={4} />}
          {!isFetching && offers.length === 0 && (
            <p className="text-gray-500">No offers available.</p>
          )}
          {isFetched && offers.length > 0 && <OfferList offers={offers} />}
        </ErrorBoundary>
      </section>
      {index === 3 && (
        <div className="mb-6 md:mb-10 lg:mb-14 max-w-[1600px] mx-auto">
          <Image
            src="/homeBanner2.svg"
            alt="Don't miss deals again"
            width={1600}
            height={300}
            className="w-full"
          />
        </div>
      )}
    </>
  );
}
