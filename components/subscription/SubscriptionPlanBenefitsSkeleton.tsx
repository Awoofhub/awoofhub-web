interface Props {
    count?: number;
    listClassName?: string;
    hasHeading?: boolean;
}

export default function SubscriptionPlanBenefitsSkeleton({
    count = 6,
    listClassName,
    hasHeading = false,
}: Props) {
    return (
        <div
            className="rounded-xl border border-[#00A95D]/30 bg-white p-4 md:p-5 lg:p-6 animate-pulse"
            aria-busy="true"
            aria-label="Loading plan benefits"
        >
            {hasHeading ? (
                <div className="h-5 xs:h-6 w-48 rounded bg-gray-300" />
            ) : (
                <div className="h-7 w-24 rounded-lg bg-gray-200" />
            )}

            <div className={`h-5 xs:h-6 w-64 xs:w-80 rounded bg-gray-300 mb-4 ${hasHeading ? "mt-2" : "mt-2"}`} />

            <ul className={`p-1 xs:p-3 grid gap-6 xs:gap-8 ${listClassName ?? "grid-cols-1 xs:grid-cols-2 lg:grid-cols-3"}`}>
                {Array.from({ length: count }).map((_, i) => (
                    <li key={i} className="flex items-start gap-2">
                        <div className="mt-1 h-4 w-4 shrink-0 rounded-full bg-gray-300" />
                        <div className="flex-1 space-y-2">
                            <div className="h-5 xs:h-6 w-3/4 rounded bg-gray-300" />
                            <div className="h-3 xs:h-4 w-full rounded bg-gray-200" />
                            <div className="h-3 xs:h-4 w-2/3 rounded bg-gray-200" />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}