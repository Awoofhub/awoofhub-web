"use client";

export default function MyOfferListItemSkeleton() {
  return (
    <div className="w-full flex flex-col xs:flex-row gap-3 md:gap-4 p-2 md:px-6 md:py-3 items-start md:items-center rounded-lg border border-gray-100 bg-white animate-pulse">
      {/* Image */}
      <div className="w-full h-[150px] xs:w-[110px] xs:h-[110px] md:w-[130px] md:h-[130px] lg:w-[150px] lg:h-[150px] shrink-0 rounded-md bg-gray-200" />

      {/* Content */}
      <div className="flex-1 min-w-0 w-full">
        {/* Status badge */}
        <div className="h-5 w-16 bg-gray-200 rounded-full mb-2" />

        {/* Title */}
        <div className="h-4 md:h-5 w-3/4 bg-gray-200 rounded mb-2" />

        {/* Category */}
        <div className="h-3 md:h-4 w-1/2 bg-gray-200 rounded mb-2" />

        {/* Location */}
        <div className="h-3 w-1/3 bg-gray-200 rounded mb-3" />

        {/* Footer */}
        <div className="flex flex-wrap justify-between items-center gap-1">
          <div className="h-3 w-24 bg-gray-200 rounded" />

          <div className="flex items-center w-full md:w-22 justify-between gap-2">
            <div className="flex items-center gap-1">
              <div className="h-3 w-12 bg-gray-200 rounded" />
            </div>
            <div className="h-4 w-4 bg-gray-200 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}