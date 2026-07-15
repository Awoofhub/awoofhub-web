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

  const hasActiveFilters = Boolean(
    dealType || location || category || minRating || createdFrom || createdTo,
  );

  return (
    <div className="bg-white">
      <section className="mx-auto max-w-[1440px] w-full pt-4 px-4 md:px-6 lg:px-8 xl:px-12 pb-20 lg:mb-0">
        <div className="relative z-40 flex flex-col md:flex-row gap-3 py-3  items-start md:items-center mb-4 border-b border-muted/20">
          <div className="hidden md:flex shrink-0 items-center gap-2 font-baloo text-[16px] font-semibold text-primary border-r border-muted/20 pr-2 lg:pr-4">
            <IoFilterSharp className="text-[20px]" />
            <span>Filters</span>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 w-full">
            <div className="flex overflow-x-auto flex-nowrap items-start w-full md:max-w-138 lg:max-w-full no-scrollbar flex-1 pb-[400px] -mb-[400px]" style={{ WebkitOverflowScrolling: "touch" }}>
              <div className="flex items-center gap-4 shrink-0">
                <OfferSelectDropdown
                  placeholder="Deal type"
                  options={DEAL_TYPES.map(([value, label]) => ({ value, label }))}
                  value={dealType ?? ""}
                  onChange={(value) => updateFilter("dealType", value)}
                  width="shrink-0"
                  dropdownWidth="w-50"
                />

                <OfferSelectDropdown
                  placeholder="Category"
                  options={categories?.map((cat) => ({ value: cat.slug, label: cat.name })) ?? []}
                  value={category ?? ""}
                  onChange={(value) => updateFilter("category", value)}
                  width="shrink-0"
                  dropdownWidth="w-60"
                />

                <OfferSelectDropdown
                  placeholder="Offer rating"
                  options={RATING_OPTIONS}
                  value={minRating ? String(minRating) : ""}
                  onChange={(value) => updateFilter("minRating", value)}
                  width="shrink-0"
                  align="center"
                  dropdownWidth="w-35"
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
              type="button"
              disabled={!hasActiveFilters}
              onClick={() => {
                if (!hasActiveFilters) return;
                updateFilter({ dealType: "", location: "", category: "", minRating: "", createdFrom: "", createdTo: "" });
              }}
              className={[
                "flex items-center gap-1 px-2 text-sm transition",
                hasActiveFilters
                  ? "text-black font-semibold hover:text-primary cursor-pointer"
                  : "text-gray-400 cursor-not-allowed",
              ].join(" ")}
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
    </div>
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
