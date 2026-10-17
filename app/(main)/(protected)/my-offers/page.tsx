import Loading from "@/components/loading/Loading";
import MyOffers from "@/components/my-offers/MyOffers";
import { Suspense } from "react";

type FilterParams = {
  tab?: string;
};

interface FilterProps {
  searchParams: Promise<FilterParams>;
}

export default function MyOffersPage({ searchParams }: FilterProps) {
  return (
      <Suspense fallback={<Loading />}>
      <MyOffers searchParams={searchParams} />
    </Suspense>
  );
}




