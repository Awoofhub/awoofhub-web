"use client";

import Loading from "@/components/loading/Loading";
import { OfferDateRangePicker } from "@/components/offers/OfferDateRangePicker";
import { OfferError } from "@/components/offers/OfferError";
import OfferInfiniteList from "@/components/offers/OfferInfiniteList";
import OfferListSkeleton from "@/components/offers/OfferListSkeleton";
import { OfferLocationFilter } from "@/components/offers/OfferLocationFilter";
import { OfferSelectDropdown } from "@/components/offers/OfferSelectDropdown";
import { useCategory } from "@/features/category/useCategory";
import { useFilter } from "@/features/offers/useFilter";
import { useOffers } from "@/features/offers/useOffers";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { IoFilterSharp } from "react-icons/io5";
import { RiResetLeftLine } from "react-icons/ri";


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


function FilterResults() {

  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? undefined;
  const category = searchParams.get("category") ?? undefined;
  const minRating = searchParams.get("minRating") ? Number(searchParams.get("minRating")) : undefined;
  const createdFrom = searchParams.get("createdFrom") ?? undefined;
  const createdTo = searchParams.get("createdTo") ?? undefined;
  const dealType = searchParams.get("dealType") ?? undefined;
  const location = searchParams.get("location") ?? undefined;


  const { data: categories } = useCategory();
  const updateFilter = useFilter("/offers");

  const { data, isFetching, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, isError, error, } = useOffers({
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
            <div className="flex overflow-x-auto flex-nowrap items-start w-full md:max-w-138 lg:max-w-full no-scrollbar flex-1" style={{ WebkitOverflowScrolling: "touch" }}>
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
                  key={location ?? ""}
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
            <div className="shrink-0">
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

export default function Filter() {
  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary fallback={<OfferError />}>
        <FilterResults />
      </ErrorBoundary>
    </Suspense>
  );
}
