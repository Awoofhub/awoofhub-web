"use client";

import Loading from "@/components/loading/Loading";
import BoostOfferCard from "@/components/my-offers/boost/BoostOfferCard";
import BoostStatsCard from "@/components/my-offers/boost/BoostStatsCard";
import { useActiveBoost } from "@/features/boost/useActiveBoost";
import { formatBoostExpiry } from "@/utils/formatBoostEndDate";
import { use } from "react";


interface Props {
    params: Promise<{ id: string }>;
}

export default function BoostAnalyticsPage({ params }: Props) {
    const { id } = use(params);
    const { data: boostData, isLoading } = useActiveBoost({ id });

    if (isLoading) {
        return <Loading />
    }

    if (!boostData) {
        return (
            <section className="pt-14 px-6">
                <p className="text-center text-gray-500"> Offer Not boosted, cannot get analytics</p>
            </section>
        )
    }

    return (
        <div className="bg-white p-6 mb-16 md:mb-0 flex flex-col">
            <h1 className="text-xl lg:text-2xl font-semibold text-black mb-2">
                Promotion Performance
            </h1>
            <p className="text-muted text-xs md:text-sm lg:text-base">
                Track how your promotion is performing in real time
            </p>
            <hr className="my-6 text-[#BBBFBF]" />
            <div className="text-primary/80 font-semibold mb-6">
                {formatBoostExpiry(boostData.boost.endsAt)}
            </div>
            <BoostOfferCard offer={boostData.boost.offer} />
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2 mt-6">
                <BoostStatsCard label="Impressions" value={boostData.stats.impressions} iconSrc="/users.svg" iconBg="bg-[#48B7F3]/20" />
                <BoostStatsCard label="Comment" value={boostData.stats.clicks} iconSrc="/live.svg" iconBg="bg-[#4AD991]/20" />
                <BoostStatsCard label="Clicks" value={boostData.stats.comments} iconSrc="/posted.svg" iconBg="bg-[#8280FF]/20" />
                <BoostStatsCard label="Shares" value={boostData.stats.shares} iconSrc="/grabs.svg" iconBg="bg-[#FAAE8E]/20" />
            </div>
        </div>
    );
}

