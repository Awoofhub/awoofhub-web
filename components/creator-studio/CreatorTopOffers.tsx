"use client";

import { useCreatorTopOffers } from "@/features/creator-studio/useCreatorTopOffers";
import { formatTimeAgo } from "@/utils/formatTimeAgo";
import Image from "next/image";

export default function CreatorTopOffers() {
    const { data, isLoading } = useCreatorTopOffers();

    if (isLoading) {
        return (
            <div className="animate-pulse">
                {[0, 1].map((i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-200/80 mb-6 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <div className="h-4 w-40 rounded bg-gray-200" />
                        </div>
                        {[0, 1, 2].map((j) => (
                            <div key={j} className="flex items-center gap-4 py-4 px-6">
                                <div className="w-12 h-12 rounded-xl bg-gray-200" />
                                <div className="space-y-2">
                                    <div className="h-3 w-40 rounded bg-gray-200" />
                                    <div className="h-3 w-24 rounded bg-gray-100" />
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    }

    const topGrabbedOffers = data?.topGrabbedOffers || [];
    const topSharedOffers = data?.topSharedOffers || [];

    return (
        <div>
            {/* Top shared Offers Section */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4 xs:mb-6">
                <div className="px-4 xs:px-6 pt-4">
                    <p className="text-sm lg:text-base font-semibold text-primary uppercase">Top Shared Offers</p>
                    <p className="text-muted text-xs lg:text-sm font-medium mb-1">These awoofs were shared the most</p>
                </div>

                {topSharedOffers.length === 0 ? (
                    <div className="px-6 py-8 text-center">
                        <p className="text-sm xs:text-base font-semibold text-gray-700">
                            No offers shared yet
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            Top shared offers will show up here.
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-[#E5E7EB]">
                        {topSharedOffers.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between py-4 px-4 xs:px-8 hover:bg-gray-50/50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-primary shrink-0">
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.title}
                                            fill
                                            unoptimized
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                                        <p className="text-xs xs:text-sm text-muted">{`Published ${formatTimeAgo(item.createdAt)}`}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-sm font-semibold text-gray-900">{item.shares}</span>
                                    <p className="text-xs text-muted">Shares</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Top Grabbed Offers Section */}
           <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4 xs:mb-6">
               <div className="px-4 xs:px-6 pt-4">
                    <p className="text-sm lg:text-base font-semibold text-primary uppercase">Top Grabbed Offers</p>
                    <p className="text-muted text-xs lg:text-sm font-medium mb-1">These awoofs were claimed and loved the most</p>
                </div>

                {topGrabbedOffers.length === 0 ? (
                    <div className="px-6 py-8 text-center">
                        <p className="text-sm xs:text-base font-semibold text-gray-700">
                            No offers grabbed yet
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            Top grabbed offers will show up here.
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-[#E5E7EB]">
                        {topGrabbedOffers.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between py-4 px-4 xs:px-8 hover:bg-gray-50/50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                     <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-primary shrink-0">
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.title}
                                            fill
                                            unoptimized
                                            className="object-cover"
                                        />
                                    </div>
                                     <div>
                                        <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                                        <p className="text-xs xs:text-sm text-muted">{`Published ${formatTimeAgo(item.createdAt)}`}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-sm font-semibold text-gray-900">{item.grabs}</span>
                                    <p className="text-xs text-muted">Grabs</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}