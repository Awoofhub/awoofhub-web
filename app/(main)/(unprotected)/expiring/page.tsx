"use client";

import { OfferError } from "@/components/offers/OfferError";
import OfferInfiniteList from "@/components/offers/OfferInfiniteList";
import OfferListSkeleton from "@/components/offers/OfferListSkeleton";
import { useBoostedOffers } from "@/features/boost/useBoostedOffers";
import { useExpiringOffers } from "@/features/offers/useExpiringOffers";
import { Offer } from "@/types/offer";
import { appendUniqueBoostedOffers } from "@/utils/appendUniqueBoostedOffers";
import { mixOffers } from "@/utils/mixOffers";
import { Spinner } from "@chakra-ui/react";
import { Suspense, useEffect, useMemo, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

function ExpiringResults() {

  const [boostedOffers, setBoostedOffers] = useState<Offer[]>([]);

  const {
    data: boostedData,
    isLoading: isBoostedLoading,
    isFetching: isFetchingBoosted,
    refetch: fetchBoosted
  } = useBoostedOffers()

  const {
    data: expiringData,
    isLoading: isExpiringLoading,
    isFetchingNextPage: isExpiringFetchingNextPage,
    fetchNextPage: fetchNextExpiringPage,
    hasNextPage: hasNextExpiringPage,
    isError: isExpiringError,
    error: expiringError,
  } = useExpiringOffers({
    limit: 8,
  });

  useEffect(() => {
      if (boostedData?.length) {
        setBoostedOffers((previous) =>
          appendUniqueBoostedOffers(previous, boostedData),
        );
      }
    }, [boostedData]);


  const organicOffers = useMemo(
    () => expiringData?.pages.flatMap((page) => page.data) ?? [],
    [expiringData],
  );

  const fetchNextPage = async () => {
    if (!hasNextExpiringPage) {
      return;
    }

    // First get the next expiring page.
    const expiringResult = await fetchNextExpiringPage();

    // Only fetch boosted offers if a new expiring page was loaded.
    if (expiringResult.data) {
      const result = await fetchBoosted();
      const newBoostedOffers = result.data ?? [];

      setBoostedOffers((previous) =>
        appendUniqueBoostedOffers(previous, newBoostedOffers),
      );
    }
  };

  const isFetchingNextPage = isExpiringFetchingNextPage || isFetchingBoosted;
  const isLoading = isExpiringLoading || isBoostedLoading;

  const allOffers = useMemo(() => {
    return mixOffers(organicOffers, boostedOffers);
  }, [organicOffers, boostedOffers]);



  return (
    <section className="px-3 md:px-6 py-6 mb-15 lg:mb-0 max-w-[1440px] mx-auto">
      {isLoading && <OfferListSkeleton number={4} />}
      {!isLoading && !isFetchingNextPage && allOffers.length === 0 && (
        <p className="text-gray-500 text-center">No offers available.</p>
      )}
      {isExpiringError && <div>{expiringError?.message}</div>}
      {!isLoading && allOffers.length > 0 && (
        <OfferInfiniteList
          offers={allOffers}
          hasNextPage={hasNextExpiringPage}
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