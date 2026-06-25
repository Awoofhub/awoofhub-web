export default function SingleOfferSkeleton() {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-9 gap-10 pb-10">
                {/* Left: Image */}
                <div className="md:col-span-4 flex flex-col items-center justify-start">
                    <div className="bg-[#E0E0E0] rounded-sm md:rounded-2xl w-full animate-pulse">
                        <div className="w-full aspect-[10/9]" />
                    </div>
                </div>

                {/* Right: Business + Info */}
                <div className="md:col-span-5 flex flex-col">
                    {/* BusinessLink + Available badge */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-[#E0E0E0] rounded-full animate-pulse" />
                            <div className="w-32 h-5 bg-[#E0E0E0] rounded animate-pulse" />
                        </div>
                        <div className="w-20 h-6 bg-[#E0E0E0] rounded-full animate-pulse" />
                    </div>

                    {/* OfferInfo */}
                    <div className="w-3/4 h-8 bg-[#E0E0E0] rounded animate-pulse mb-3" />
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-28 h-5 bg-[#E0E0E0] rounded animate-pulse" />
                        <div className="w-20 h-4 bg-[#E0E0E0] rounded animate-pulse" />
                    </div>
                    <div className="flex justify-between items-center mb-6">
                        <div className="w-32 h-4 bg-[#E0E0E0] rounded animate-pulse" />
                        <div className="w-8 h-8 bg-[#E0E0E0] rounded-full animate-pulse" />
                    </div>

                    <div className="space-y-2 mb-7">
                        <div className="w-full h-4 bg-[#E0E0E0] rounded animate-pulse" />
                        <div className="w-full h-4 bg-[#E0E0E0] rounded animate-pulse" />
                        <div className="w-5/6 h-4 bg-[#E0E0E0] rounded animate-pulse" />
                        <div className="w-4/6 h-4 bg-[#E0E0E0] rounded animate-pulse" />
                    </div>

                    <div className="w-28 h-9 bg-[#E0E0E0] rounded-md animate-pulse mb-6" />

                    {/* Action */}
                    <div className="w-full h-10 bg-[#E0E0E0] rounded-lg animate-pulse mb-3" />
                    <div className="w-full h-14 bg-[#E0E0E0] rounded-lg animate-pulse" />
                </div>
            </div>

            {/* TrustSection */}
            <section className="border-t border-b border-gray-300 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-8 items-start">
                <div className="flex flex-col items-center gap-3 border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-[#E0E0E0] rounded-full animate-pulse" />
                        <div className="w-28 h-5 bg-[#E0E0E0] rounded animate-pulse" />
                    </div>
                    <div className="w-32 h-9 bg-[#E0E0E0] rounded-lg animate-pulse" />
                </div>
                <div className="text-center md:border-x border-gray-300 xs:col-span-2 order-3 md:col-span-1 md:order-none px-4 flex flex-col items-center justify-center h-full">
                    <div className="w-32 h-6 bg-[#E0E0E0] rounded animate-pulse mx-auto mb-2" />
                    <div className="w-48 h-4 bg-[#E0E0E0] rounded animate-pulse mx-auto mb-4" />
                    <div className="w-36 h-8 bg-[#E0E0E0] rounded animate-pulse mx-auto" />
                </div>
                <div className="space-y-4 flex flex-col justify-center h-full pl-0 md:pl-4">
                    <div className="w-24 h-6 bg-[#E0E0E0] rounded animate-pulse" />
                    <div className="space-y-3">
                        <div className="w-full h-4 bg-[#E0E0E0] rounded animate-pulse" />
                        <div className="w-5/6 h-4 bg-[#E0E0E0] rounded animate-pulse" />
                        <div className="w-4/6 h-4 bg-[#E0E0E0] rounded animate-pulse" />
                    </div>
                </div>
            </section>

            {/* Reviews + Comments */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-12">
                <div className="md:col-span-4 space-y-6">
                    <div className="w-32 h-6 bg-[#E0E0E0] rounded animate-pulse mb-4" />
                    <div className="space-y-2">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className="w-8 h-4 bg-[#E0E0E0] rounded animate-pulse" />
                                <div className="flex-1 h-3 bg-[#E0E0E0] rounded animate-pulse" />
                                <div className="w-6 h-3 bg-[#E0E0E0] rounded animate-pulse" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="md:col-start-6 lg:col-start-5 md:col-span-6 space-y-8">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex gap-3">
                            <div className="w-9 h-9 bg-[#E0E0E0] rounded-full animate-pulse shrink-0" />
                            <div className="flex-1 space-y-2">
                                <div className="w-24 h-4 bg-[#E0E0E0] rounded animate-pulse" />
                                <div className="w-full h-3 bg-[#E0E0E0] rounded animate-pulse" />
                                <div className="w-4/5 h-3 bg-[#E0E0E0] rounded animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}