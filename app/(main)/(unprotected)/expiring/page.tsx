"use client";

import { OfferError } from "@/components/offers/OfferError";
import OfferInfiniteList from "@/components/offers/OfferInfiniteList";
import OfferListSkeleton from "@/components/offers/OfferListSkeleton";
import { useExpiringOffers } from "@/features/offers/useExpiringOffers";
import { Spinner } from "@chakra-ui/react";
import { Suspense, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";

function ExpiringResults() {
  const { data, isFetching, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, isError, error } = useExpiringOffers({
    limit: 8,
  });

  const allOffers = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );

  return (
    <section className="px-3 md:px-6 py-6 mb-15 lg:mb-0 max-w-[1440px] mx-auto">
      {isLoading && <OfferListSkeleton number={4} />}
      {!isLoading && !isFetching && allOffers.length === 0 && (
        <p className="text-gray-500 text-center">No offers available.</p>
      )}
      {isError && <div>{error?.message}</div>}
      {!isLoading && allOffers.length > 0 && (
        <OfferInfiniteList
          offers={allOffers}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      )}
    </section>
  );
}

export default function ExpiringPage() {
  return (
    <Suspense
      fallback={
        <section className="pt-14 flex justify-center">
          <Spinner size="xl" />
        </section>
      }
    >
      <ErrorBoundary fallback={<OfferError />}>
        <ExpiringResults />
      </ErrorBoundary>
    </Suspense>
  );
}