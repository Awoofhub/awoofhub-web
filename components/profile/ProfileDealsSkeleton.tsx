export default function ProfileDealsSkeleton() {
  return (
    <div className="grid grid-cols-2 xxs:grid-cols-3 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="bg-white  w-full h-[270px] xxs:h-[300px] xs:h-[270px] md:h-[350px] lg:h-[380px] xl:h-[440px] rounded-xl shadow-sm border border-gray-100 p-2 lg:p-3 flex flex-col"
        >
          {/* Image area */}
          <div className="h-[150px] md:h-[200px] lg:h-[200px] xl:h-[240px] mb-2 bg-[#E0E0E0] animate-pulse rounded-lg" />

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
