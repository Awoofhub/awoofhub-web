interface Props {
  number: number;
}

export default function OfferListSkeleton({ number }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 xl:gap-4 justify-items-center w-full">
      {[...Array(number)].map((_, i) => (
        <div
          key={i}
          className="bg-white w-full h-[270px] md:h-[350px] lg:h-[380px] xl:h-[440px] rounded-xl shadow-sm border border-gray-100 p-1.5 md:p-2 lg:p-3 flex flex-col"
        >
          <div className="h-[150px] md:h-[200px] lg:h-[200px] xl:h-[240px] mb-2 bg-[#E0E0E0] animate-pulse rounded-lg" />
          <div className="md:px-2 flex flex-col gap-1.5">
            <div className="flex justify-between">
              <div className="h-3 w-20 bg-[#E0E0E0] animate-pulse rounded-md" />
              <div className="h-3 w-16 bg-[#E0E0E0] animate-pulse rounded-full" />
            </div>
            <div className="h-3.5 w-full bg-[#E0E0E0] animate-pulse rounded-md" />
            <div className="h-3 w-[75%] bg-[#E0E0E0] animate-pulse rounded-md" />
            <div className="h-3 w-[75%] bg-[#E0E0E0] animate-pulse rounded-md" />
            <div className="h-3 w-[55%] bg-[#E0E0E0] animate-pulse rounded-md" />
            <div className="h-3 w-[40%] bg-[#E0E0E0] animate-pulse rounded-md mt-1" />
          </div>
        </div>
      ))}
    </div>
  );
}