export default function ProfileDealsSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="bg-white w-[174px] h-[320px]  md:w-[174px] md:h-[320px] lg:w-[300px] lg:h-[400px] rounded-xl shadow-sm border border-gray-100 p-2 lg:p-3 flex flex-col"
        >
          {/* Image area */}
          <div className="mb-2 lg:mb-3 h-[160px] lg:h-[200px] w-full bg-[#E0E0E0] animate-pulse rounded-lg" />

          {/* Username + Awoofer badge */}
          <div className="flex items-center justify-between mb-1 lg:mb-2">
            <div className="h-3 w-16 bg-[#E0E0E0] animate-pulse rounded-md" />
            <div className="h-4 w-14 bg-[#E0E0E0] animate-pulse rounded-full" />
          </div>

          {/* Title */}
          <div className="h-4 w-full bg-[#E0E0E0] animate-pulse rounded-md mb-1" />

          {/* Description */}
          <div className="space-y-1 mb-1 lg:mb-2">
            <div className="h-3 w-full bg-[#E0E0E0] animate-pulse rounded-md" />
            <div className="h-3 w-4/5 bg-[#E0E0E0] animate-pulse rounded-md" />
          </div>

          {/* Rating + grabs */}
          <div className="flex items-center justify-between mb-1 lg:mb-2">
            <div className="h-4 w-24 bg-[#E0E0E0] animate-pulse rounded-md" />
            <div className="h-3 w-12 bg-[#E0E0E0] animate-pulse rounded-md" />
          </div>

          {/* Countdown / grabs */}
          <div className="h-4 w-20 bg-[#E0E0E0] animate-pulse rounded-md" />
        </div>
      ))}
    </div>
  );
}
