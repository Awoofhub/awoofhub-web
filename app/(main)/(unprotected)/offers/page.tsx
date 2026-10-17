import Loading from "@/components/loading/Loading";
import { OfferError } from "@/components/offers/OfferError";
import OffersPage from "@/components/offers/OffersPage";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type FilterParams = {
  search?: string;
  category?: string;
  minRating?: number;
  createdFrom?: string;
  createdTo?: string;
  dealType?: string;
  location?: string;
};

interface FilterProps {
  searchParams: Promise<FilterParams>;
}

export default function Page({ searchParams }: FilterProps) {
  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary fallback={<OfferError />}>
        <OffersPage searchParams={searchParams} />
      </ErrorBoundary>
    </Suspense>
  );
}