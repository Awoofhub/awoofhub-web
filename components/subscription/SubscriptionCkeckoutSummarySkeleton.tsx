export default function SubscriptionCheckoutSummarySkeleton() {
    return (
        <div
            className="bg-[#D9D9D966] shadow-sm flex flex-col xs:flex-row xs:items-stretch justify-between rounded-xl animate-pulse"
            aria-busy="true"
            aria-label="Loading checkout summary"
        >
            {/* Left: title + description */}
            <div className="p-4 flex-1">
                <div className="flex items-center gap-2">
                    <div className="rounded-full bg-gray-300 w-6 h-6 xs:w-7.5 xs:h-7.5 shrink-0" />
                    <div className="h-6 xs:h-7 w-40 xs:w-52 rounded bg-gray-300" />
                </div>

                <div className="mt-2 space-y-2 max-w-3xl">
                    <div className="h-4 xs:h-5 w-full rounded bg-gray-300" />
                    <div className="h-4 xs:h-5 w-11/12 rounded bg-gray-300" />
                    <div className="h-4 xs:h-5 w-2/3 rounded bg-gray-300" />
                </div>
            </div>

            {/* Right: price + button */}
            <div className="bg-white p-4 lg:p-5 flex flex-col items-center md:items-start justify-center lg:flex-row lg:items-center lg:justify-between gap-2 lg:gap-6 rounded-b-xl xs:rounded-xl">
                <div className="space-y-2">
                    <div className="h-4 w-28 rounded bg-gray-200" />
                    <div className="h-6 w-24 rounded bg-gray-300" />
                </div>
                <div className="h-10 w-full xs:w-[160px] lg:w-[200px] rounded-lg bg-gray-300" />
            </div>
        </div>
    );
}