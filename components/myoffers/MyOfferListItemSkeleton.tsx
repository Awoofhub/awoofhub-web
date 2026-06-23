"use client";

export default function MyOfferListItemSkeleton() {
  return (
    <div className="w-full flex gap-4 px-3 py-3 items-center lg:px-6 lg:py-3 rounded-lg border border-gray-100 bg-white animate-pulse">
      {/* Image */}
      <div className="w-[120px] h-[100px] lg:w-[200px] lg:h-[150px] shrink-0 rounded-md bg-gray-200" />

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Status badge */}
        <div className="h-6 w-20 bg-gray-200 rounded-full mb-3" />

        {/* Title */}
        <div className="h-6 w-3/4 bg-gray-200 rounded mb-3" />

        {/* Category */}
        <div className="h-4 w-1/2 bg-gray-200 rounded mb-2" />

        {/* Location */}
        <div className="h-3 w-1/3 bg-gray-200 rounded mb-4" />

        {/* Footer */}
        <div className="flex justify-between items-center">
          <div className="h-3 w-32 bg-gray-200 rounded" />

          <div className="flex items-center gap-2">
            <div className="h-3 w-12 bg-gray-200 rounded" />
            <div className="h-4 w-4 bg-gray-200 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}