"use client";

import { Button } from "@/components/button/Button";
import Loading from "@/components/loading/Loading";
import BoostOfferCard from "@/components/my-offers/boost/BoostOfferCard";
import BoostStatsCard from "@/components/my-offers/boost/BoostStatsCard";
import { useActiveBoost } from "@/features/boost/useActiveBoost";
import { formatBoostExpiry } from "@/utils/formatBoostEndDate";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use } from "react";


interface Props {
    params: Promise<{ id: string }>;
}

export default function BoostAnalyticsPage({ params }: Props) {
    const { id } = use(params);
    const router = useRouter();
    const { data: boostData, isLoading } = useActiveBoost({ id });

    if (isLoading) {
        return <Loading />
    }

    if (!boostData) {
        return (
            <section className="p-6 xs:p-10 max-w-[1440px] mx-auto flex flex-col items-center text-center">
                <Image
                    src="/notFound.png"
                    alt=""
                    width={200}
                    height={200}
                    className="w-35 h-35 xs:w-40 xs:h-40 lg:w-50 lg:h-50 mb-3"
                />

                <h1 className="font-bold text-lg xs:text-xl lg:text-2xl text-black">
                    Offer not boosted, cannot get analytics
                </h1>

                <p className="text-muted text-xs xs:text-base lg:text-lg max-w-xl leading-tight mt-2 mb-6">
                    Analytics are only available for boosted offers.
                </p>

                <div className="w-full max-w-md">
                    <Button
                        onClick={() => router.push("/my-offers")}
                        className="!w-full !mx-0 text-sm"
                    >
                        Go to My Offers
                    </Button>
                </div>
            </section>
        )
    }

    return (
        <div className="py-6 px-4 md:px-6 lg:px-8 xl:px-12 max-w-[1440px] mx-auto mb-24 lg:mb-0 flex flex-col">
            <h1 className="text-xl xs:text-2xl font-semibold text-black mb-1">
                Promotion Performance
            </h1>
            <p className="text-muted text-sm xs:text-base">
                Track how your promotion is performing in real time
            </p>
            <hr className="my-4 text-[#BBBFBF]" />
            <div className="text-primary text-sm font-semibold mb-4">
                {formatBoostExpiry(boostData.endsAt)}
            </div>
            <BoostOfferCard offer={boostData.offer} />
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
                <BoostStatsCard label="Clicks" value={boostData.stats.comments} iconSrc="/clicks.svg" iconBg="bg-[#006400]/20" />
                <BoostStatsCard label="Comment" value={boostData.stats.clicks} iconSrc="/comment.svg" iconBg="bg-[#FFD553]/20" />
                <BoostStatsCard label="Shares" value={boostData.stats.shares} iconSrc="/share.svg" iconBg="bg-[#FE7B9C]/20" />
                <BoostStatsCard label="Impressions" value={boostData.stats.impressions} iconSrc="/eye.svg" iconBg="bg-[#8280FF]/20" />
            </div>
        </div>
    );
}