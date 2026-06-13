"use client";

import { OfferError } from "@/components/offers/OfferError";
import OfferInfiniteList from "@/components/offers/OfferInfiniteList";
import OfferListSkeleton from "@/components/offers/OfferListSkeleton";
import { useTrendingOffers } from "@/features/offers/useTrendingOffers";
import { Spinner } from "@chakra-ui/react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

function TrendingResults() {
  const { data, isFetching, isFetched } = useTrendingOffers({ page: 1, limit: 8 });

  return (
    <section className="px-3 md:px-6 py-6 mb-15 lg:mb-0 max-w-[1440px] mx-auto">
      {isFetching && <OfferListSkeleton number={8} />}
      {!isFetching && data.length === 0 && (
        <p className="text-gray-500 text-center">No trending offers available.</p>
      )}
      {isFetched && data.length > 0 && (
        <OfferInfiniteList
          offers={data}
          hasNextPage={false}
          isFetchingNextPage={false}
          fetchNextPage={() => {}}
        />
      )}
    </section>
  );
}

export default function TrendingPage() {
  return (
    <Suspense
      fallback={
        <section className="pt-14 flex justify-center">
          <Spinner size="xl" />
        </section>
      }
    >
      <ErrorBoundary fallback={<OfferError />}>
        <TrendingResults />
      </ErrorBoundary>
    </Suspense>
  );
}