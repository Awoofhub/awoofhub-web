"use client";

import { OfferError } from "@/components/offers/OfferError";
import { OfferDateRangePicker } from "@/components/offers/OfferDateRangePicker";
import { OfferLocationFilter } from "@/components/offers/OfferLocationFilter";
import OfferInfiniteList from "@/components/offers/OfferInfiniteList";
import OfferListSkeleton from "@/components/offers/OfferListSkeleton";
import { OfferSelectDropdown } from "@/components/offers/OfferSelectDropdown";
import { useCategory } from "@/features/category/useCategory";
import { useFilter } from "@/features/offers/useFilter";
import { useOffers } from "@/features/offers/useOffers";
import { Spinner } from "@chakra-ui/react";
import { Suspense, use, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { IoFilterSharp } from "react-icons/io5";
import { RiResetLeftLine } from "react-icons/ri";


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

const DEAL_TYPES = [
  ["cashback", "Cash Back"],
  ["freebie", "Freebie"],
  ["discount", "Discount"],
  ["bogo", "Buy One Get One"],
  ["promo_code", "Promo Code"],
  ["free_trial", "Free Trial"],
  ["free_delivery", "Free Delivery"],
  ["price_drop", "Price Drop"],
] as const;

const RATING_OPTIONS = [1, 2, 3, 4, 5].map((r) => ({
  value: String(r),
  label: `${r} star${r > 1 ? "s" : ""}`,
}));


function FilterResults({ searchParams }: FilterProps) {
  const params = use(searchParams);
  const {
    search,
    dealType,
    location,
    category,
    minRating,
    createdFrom,
    createdTo,
  } = params;
  const { data: categories } = useCategory();
  const updateFilter = useFilter("/offers");

  const {
    data,
    isFetching,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
    error,
  } = useOffers({
    search: search ?? "",
    dealType: dealType ?? "",
    location: location ?? "",
    category: category ?? "",
    minRating: minRating ?? 0,
    createdFrom: createdFrom ?? "",
    createdTo: createdTo ?? "",
    limit: 8,
  });

  const allOffers = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );

  return (
    <section className="bg-white mx-auto mb-15 w-full px-4 py-6 md:px-6 lg:mb-0 lg:px-[60px] xl:px-[60px]">
      <div className="relative z-40 flex flex-col md:flex-row gap-3 md:gap-2 lg:gap-4 items-start md:items-center left-1/2 w-screen -translate-x-1/2 border-b border-[#CECEDE] pl-4 md:px-4 lg:px-[60px] xl:px-[90px] py-[16px]">
        <div className="hidden md:flex shrink-0 items-center gap-2 font-baloo text-[16px] font-semibold text-[#FE4F04] border-r border-[#CECEDE] pr-2 lg:pr-4">
             <IoFilterSharp className="text-[20px]" />
             <span>Filters</span>
          </div>
        <div className="flex flex-col md:flex-row md:flex-nowrap items-start md:items-center gap-[14px] md:gap-2 lg:gap-[14px] w-full">
          <div className="flex overflow-x-auto flex-nowrap items-start w-full md:w-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pr-4 md:pr-0 pb-[400px] -mb-[400px] pointer-events-none">
            <div className="flex items-center gap-[14px] md:gap-2 lg:gap-[14px] pointer-events-auto shrink-0">
              <OfferSelectDropdown
                placeholder="Deal type"
                options={DEAL_TYPES.map(([value, label]) => ({ value, label }))}
                value={dealType ?? ""}
                onChange={(value) => updateFilter("dealType", value)}
                width="w-[130px] shrink-0"
              />

              <OfferSelectDropdown
                placeholder="Category"
                options={categories?.map((cat) => ({ value: cat.slug, label: cat.name })) ?? []}
                value={category ?? ""}
                onChange={(value) => updateFilter("category", value)}
                width="w-[140px] shrink-0"
                
              />

              <OfferSelectDropdown
                placeholder="Offer rating"
                options={RATING_OPTIONS}
                value={minRating ? String(minRating) : ""}
                onChange={(value) => updateFilter("minRating", value)}
                width="w-[140px] shrink-0"
                align="center"
              />



              <OfferLocationFilter
                location={location}
                onChange={(value) => updateFilter("location", value)}
              />
              

              <OfferDateRangePicker
                createdFrom={createdFrom}
                createdTo={createdTo}
                onApply={updateFilter}
              />
            </div>
          </div>

          <button
            onClick={() => updateFilter({ dealType: "", location: "", category: "", minRating: "", createdFrom: "", createdTo: "" })}
            className="flex h-12 shrink-0 items-center gap-1 px-2 text-sm font-[400] text-[#b7b7b7] transition hover:text-primary"
          >
            Reset <RiResetLeftLine className="text-base" />
          </button>
        </div>
      </div>

      {isLoading && <OfferListSkeleton number={4} />}
      {!isLoading && !isFetching && allOffers.length === 0 && (
        <p className="text-center text-gray-500">No offers available.</p>
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

export default function Filter(props: FilterProps) {
  return (
    <Suspense
      fallback={
        <section className="flex justify-center pt-14">
          <Spinner size="xl" />
        </section>
      }
    >
      <ErrorBoundary fallback={<OfferError />}>
        <FilterResults searchParams={props.searchParams} />
      </ErrorBoundary>
    </Suspense>
  );
}
