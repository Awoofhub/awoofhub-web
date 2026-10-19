import Loading from "@/components/loading/Loading";
import MyOffersPage from "@/components/my-offers/MyOffersPage";
import { Suspense } from "react";

type FilterParams = {
  tab?: string;
};

interface FilterProps {
  searchParams: Promise<FilterParams>;
}

export default function Page({ searchParams }: FilterProps) {
  return (
    <Suspense fallback={<Loading />}>
      <MyOffersPage searchParams={searchParams} />
    </Suspense>
  );
}




