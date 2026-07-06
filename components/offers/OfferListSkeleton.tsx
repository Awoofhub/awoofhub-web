interface Props {
  number: number;
}

export default function OfferListSkeleton({ number }: Props) {
  return (
    <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 xl:gap-4 justify-items-center w-full">
      {[...Array(number)].map((_, i) => (
        <div
          key={i}
          className="bg-white w-full h-[270px] xxs:h-[290px] xs:h-[280px] md:h-[350px] lg:h-[380px] xl:h-[420px] rounded-lg shadow-sm border border-gray-100 p-1.5 md:p-2 lg:p-3 flex flex-col"
        >
          {/* Image */}
          <div className="h-[60%] md:h-[70%] bg-[#E0E0E0] animate-pulse rounded-md" />

          <div className="h-[40%] md:px-1 flex flex-col mt-3 md:mt-4 gap-1.5">
            {/* Username + Awoofer badge */}
            <div className="flex justify-between items-center">
              <div className="h-2.5 w-14 bg-[#E0E0E0] animate-pulse rounded-md" />
              <div className="h-2.5 w-12 bg-[#E0E0E0] animate-pulse rounded-full" />
            </div>

            {/* Title */}
            <div className="h-3.5 w-[85%] bg-[#E0E0E0] animate-pulse rounded-md" />

            {/* Value (icon + text) */}
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 shrink-0 bg-[#E0E0E0] animate-pulse rounded-full" />
              <div className="h-3 w-[60%] bg-[#E0E0E0] animate-pulse rounded-md" />
            </div>

            {/* Location + grabs */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <div className="h-2.5 w-2.5 shrink-0 bg-[#E0E0E0] animate-pulse rounded-full" />
                <div className="h-2.5 w-12 bg-[#E0E0E0] animate-pulse rounded-md" />
              </div>
              <div className="h-2.5 w-10 bg-[#E0E0E0] animate-pulse rounded-md" />
            </div>

            <hr className="text-muted/20" />

            {/* Rating + countdown */}
            <div className="flex justify-between items-center mt-1">
              <div className="h-3 w-16 bg-[#E0E0E0] animate-pulse rounded-md" />
              <div className="h-3 w-14 bg-[#E0E0E0] animate-pulse rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}