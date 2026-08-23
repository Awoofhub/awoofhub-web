import { useMyOffers } from "@/features/offers/useMyOffers";
import { Spinner } from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import MyOfferListCard from "./MyOfferListCard";
import MyOfferListItemSkeleton from "./MyOfferListItemSkeleton";
import MyOffersEmptyState from "./MyOffersEmptyState";

interface Props {
  tab?: string;
}


export default function MyOfferListItem({ tab }: Props) {
  const [ref, inView] = useInView();


  const { data, isFetching, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useMyOffers({
    limit: 8,
    tab: tab ?? "all",
  });

  const offers = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data]
  )

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);


  return (
    <div className="grid grid-cols-2 xs:flex xs:flex-col gap-2">
      {isLoading && <MyOfferListItemSkeleton />}
      {!isLoading && !isFetching && offers.length === 0 && (
        <MyOffersEmptyState tab={tab} />
      )}
      {!isLoading && offers.length > 0 && (
        offers.map((offer) => (
          <MyOfferListCard offer={offer} key={offer.id} />
        )))
      }
      <div ref={ref} className="h-10 flex items-center justify-center mt-4">
        {isFetchingNextPage && <Spinner className="text-primary w-10 h-10" size="md" />}
      </div>
    </div>
  )
}

