import { Offer } from "@/types/offer";
import { Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import OfferCard from "./OfferCard";

interface Props {
  offers: Offer[];
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
   gridClassName?: string;
}

export default function OfferInfiniteList({ offers, hasNextPage, fetchNextPage, isFetchingNextPage, gridClassName }: Props) {
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      <div className={gridClassName ?? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 xl:gap-4 justify-items-center"}>
        {offers.map((offer, index) => (
          <OfferCard offer={offer} key={offer.id} index={index} />
        ))}
      </div>
      <div ref={ref} className="h-10 flex items-center justify-center mt-6">
        {isFetchingNextPage && (
          <Spinner className="mt-5 w-17 h-17 text-primary" data-testid="loading" />
        )}
        {!hasNextPage && offers.length > 0 && <p className="text-center text-[14px] sm:text-[16px]">No more offers</p>}
      </div>
    </>
  );
};

