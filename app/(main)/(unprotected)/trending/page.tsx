"use client";

import { OfferError } from "@/components/offers/OfferError";
import OfferInfiniteList from "@/components/offers/OfferInfiniteList";
import OfferListSkeleton from "@/components/offers/OfferListSkeleton";
import { useBoostedOffers } from "@/features/boost/useBoostedOffers";
import { useTrendingOffers } from "@/features/offers/useTrendingOffers";
import { Offer } from "@/types/offer";
import { appendUniqueBoostedOffers } from "@/utils/appendUniqueBoostedOffers";
import { mixOffers } from "@/utils/mixOffers";
import { Spinner } from "@chakra-ui/react";
import { Suspense, useMemo, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";


function TrendingResults() {

  const [boostedOffers, setBoostedOffers] = useState<Offer[]>([]);

  const {
    data: boostedData,
    isLoading: isBoostedLoading,
    isFetching: isFetchingBoosted,
    refetch: fetchBoosted
  } = useBoostedOffers()

  const {
    data: trendingData,
    isLoading: isTrendingLoading,
    isFetchingNextPage: isTrendingFetchingNextPage,
    fetchNextPage: fetchNextTrendingPage,
    hasNextPage: hasNextTrendingPage,
    isError: isTrendingError,
    error: trendingError,
  } = useTrendingOffers({
    limit: 8,
  });

  const organicOffers = useMemo(
    () => trendingData?.pages.flatMap((page) => page.data) ?? [],
    [trendingData],
  );

  const currentBoostedOffers = boostedOffers.length > 0 ? boostedOffers : boostedData ?? []

  const fetchNextPage = async () => {
    if (!hasNextTrendingPage) {
      return;
    }

    // First get the next trending page.
    const trendingResult = await fetchNextTrendingPage();

    // Only fetch boosted offers if a new trending page was loaded.
    if (trendingResult.data) {
      const result = await fetchBoosted();
      const newBoostedOffers = result.data ?? [];

      setBoostedOffers((previous) =>
        appendUniqueBoostedOffers(previous, newBoostedOffers),
      );
    }
  };

  const isFetchingNextPage = isTrendingFetchingNextPage || isFetchingBoosted;
  const isLoading = isTrendingLoading || isBoostedLoading;

  const allOffers = useMemo(() => {
    return mixOffers(organicOffers, currentBoostedOffers);
  }, [organicOffers, currentBoostedOffers]);


  return (
    <section className="px-3 md:px-6 py-6 mb-15 lg:mb-0 max-w-[1440px] mx-auto">
      {isLoading && <OfferListSkeleton number={4} />}
      {!isLoading && !isFetchingNextPage && allOffers.length === 0 && (
        <p className="text-gray-500 text-center">No offers available.</p>
      )}
      {isTrendingError && <div>{trendingError?.message}</div>}
      {!isLoading && allOffers.length > 0 && (
        <OfferInfiniteList
          offers={allOffers}
          hasNextPage={hasNextTrendingPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      )}
    </section>
  );
}

export default function TrendingPage() {
  return (
    <Suspense
      fallback={
        < section className="pt-14 flex justify-center" >
          <Spinner size="xl" />
        </section >
      }
    >
      <ErrorBoundary fallback={<OfferError />}>
        <TrendingResults />
      </ErrorBoundary>
    </Suspense >
  );
}