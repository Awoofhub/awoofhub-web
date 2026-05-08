"use client";

import { OfferError } from "@/components/offers/OfferError";
import OfferInfiniteList from "@/components/offers/OfferInfiniteList";
import OfferListSkeleton from "@/components/offers/OfferListSkeleton";
import { useCategory } from "@/features/category/useCategory";
import { useFilter } from "@/features/offers/useFilter";
import { useOffers } from "@/features/offers/useOffers";
import { Spinner } from "@chakra-ui/react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import dayjs, { Dayjs } from "dayjs";
import { Suspense, use, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";

type FilterParams = {
  search?: string;
  category?: string;
  minRating?: number;
  createdFrom?: string;
  createdTo?: string;
};

interface FilterProps {
  searchParams: Promise<FilterParams>;
}

function FilterResults({ searchParams }: FilterProps) {
  const params = use(searchParams);
  const { search, category, minRating, createdFrom, createdTo } = params;
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <section className="px-3 md:px-6 py-6 mb-15 lg:mb-0 max-w-[1440px] mx-auto">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6 items-center">
          {/* Category */}
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={category ?? ""}
              label="Category"
              onChange={(e) => updateFilter("category", e.target.value)}
              MenuProps={{ PaperProps: { style: { minWidth: 160 } } }}
            >
              <MenuItem value="">All</MenuItem>
              {categories?.map((cat) => (
                <MenuItem key={cat.id} value={cat.slug}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Min Rating */}
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Min Rating</InputLabel>
            <Select
              value={minRating ?? ""}
              label="Min Rating"
              onChange={(e) => updateFilter("minRating", e.target.value)}
              MenuProps={{ PaperProps: { style: { minWidth: 160 } } }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="1">⭐ 1</MenuItem>
              <MenuItem value="2">⭐⭐ 2</MenuItem>
              <MenuItem value="3">⭐⭐⭐ 3</MenuItem>
              <MenuItem value="4">⭐⭐⭐⭐ 4</MenuItem>
              <MenuItem value="5">⭐⭐⭐⭐⭐ 5</MenuItem>
            </Select>
          </FormControl>
          {/* Date From */}
          <DatePicker
            label="From Date"
            value={createdFrom ? dayjs(createdFrom) : null}
            maxDate={createdTo ? dayjs(createdTo) : undefined}
            closeOnSelect
            onChange={(newValue: Dayjs | null) => {
              updateFilter(
                "createdFrom",
                newValue ? newValue.format("YYYY-MM-DD") : "",
              );
            }}
            slotProps={{
              textField: { size: "small", sx: { maxWidth: 170 } },
              actionBar: { actions: ["clear"] },
            }}
          />

          {/* Date To */}
          <DatePicker
            label="To Date"
            value={createdTo ? dayjs(createdTo) : null}
            minDate={createdFrom ? dayjs(createdFrom) : undefined}
            closeOnSelect
            onChange={(newValue: Dayjs | null) => {
              updateFilter(
                "createdTo",
                newValue ? newValue.format("YYYY-MM-DD") : "",
              );
            }}
            slotProps={{
              textField: { size: "small", sx: { maxWidth: 170 } },
              actionBar: { actions: ["clear"] },
            }}
          />

          {/* Clear Filters */}
          {(category || minRating || createdFrom || createdTo) && (
            <button
              onClick={() => {
                updateFilter({
                  category: "",
                  minRating: "",
                  createdFrom: "",
                  createdTo: "",
                });
              }}
              className="px-4 py-1.5 text-sm text-primary border border-primary rounded-md hover:bg-orange-50 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>

        {isLoading && <OfferListSkeleton number={4} />}
        {!isLoading && !isFetching && allOffers.length === 0 && (
          <p className="text-gray-500 text-center">No offers available.</p>
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
    </LocalizationProvider>
  );
}

export default function Filter(props: FilterProps) {
  return (
    <Suspense
      fallback={
        <section className="pt-14 flex justify-center">
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
