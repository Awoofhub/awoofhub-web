import { useMyOffers } from "@/features/offers/useMyOffers";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
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
    <div className="flex flex-col gap-2">
     
        <MyOffersEmptyState tab={tab} />
      
    </div>
  )
}

