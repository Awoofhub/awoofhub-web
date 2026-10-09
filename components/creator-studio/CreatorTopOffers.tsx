"use client";

import { useCreatorTopOffers } from "@/features/creator-studio/useCreatorTopOffers";
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

    const topClickedOffers = data?.topClickedOffers || [];
    const topSharedOffers = data?.topSharedOffers || [];

    return (
        <div>
            {/* Top Grabbed Offers Section */}
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden mb-6">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h3 className="text-base font-semibold text-gray-900">Top Grabbed Offers</h3>
                </div>

                {topClickedOffers.length === 0 ? (
                    <div className="px-6 py-8 text-center">
                        <p className="text-sm xs:text-base font-semibold text-gray-700">
                            No offers grabbed yet
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            Top grabbed offers will show up here.
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {topClickedOffers.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between py-4 px-6 hover:bg-gray-50/50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="w-12 h-12 rounded-xl object-cover border border-gray-200/80 shadow-xs"
                                    />
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-900">{item.title}</h4>
                                        <p className="text-xs text-gray-500 mt-0.5">{`Publihed ${item.createdAt}`}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-sm font-semibold text-gray-900">{item.clicks}</span>
                                    <p className="text-xs text-gray-500 mt-0.5">Grabs</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>


            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden mb-6">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h3 className="text-base font-semibold text-gray-900">Top Shared Offers</h3>
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
                    <div className="divide-y divide-gray-100">
                        {topSharedOffers.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between py-4 px-6 hover:bg-gray-50/50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-gray-200/80 shadow-xs flex-shrink-0">
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.title}
                                            fill
                                            unoptimized
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                         <h4 className="text-sm font-semibold text-gray-900">{item.title}</h4>
                                        <p className="text-xs text-gray-500 mt-0.5">{`Publihed ${item.createdAt}`}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                     <span className="text-sm font-semibold text-gray-900">{item.shares}</span>
                                    <p className="text-xs text-gray-500 mt-0.5">Shares</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}