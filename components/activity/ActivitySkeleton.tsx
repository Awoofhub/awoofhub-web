interface Props {
  number: number;
}

export default function ActivityListSkeleton({ number }: Props) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {[...Array(number)].map((_, i) => (
        <div
          key={i}
          className="w-full max-w-full mx-auto border border-gray-100 rounded-2xl py-3 px-2 xs:px-4 lg:py-4 lg:px-6 flex items-center gap-4 bg-white animate-pulse"
        >
          <div className="flex min-w-0 flex-1 flex-col gap-1 xs:gap-2">
            {/* Icon + title + timestamp */}
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="flex flex-1 flex-row items-center gap-2">
                <div className="w-5 h-5 xs:w-7 xs:h-7 lg:w-10 lg:h-10 rounded-full bg-orange-50 shrink-0" />
                <div className="h-4 w-28 xs:w-36 bg-gray-200 rounded-md" />
              </div>
              <div className="h-3 w-12 bg-orange-100 rounded-md shrink-0" />
            </div>

            {/* Message line */}
            <div className="h-3.5 w-3/4 xs:w-2/3 bg-gray-100 rounded-md xs:mb-2" />

            {/* Thumbnail + payload title */}
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0 w-10 h-10 xs:w-12.5 xs:h-12.5 rounded-lg bg-gray-100" />
              <div className="h-3 w-24 bg-gray-100 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}