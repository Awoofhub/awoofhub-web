"use client";


import BoostOfferCard from "@/components/my-offers/BoostOfferCard";
import BoostPlanList from "@/components/my-offers/BoostPlanList";
import BoostPlanListSkeleton from "@/components/my-offers/BoostPlanListSkeleton";
import { useOffer } from "@/features/offers/useOffer";
import { getDisplayStatus } from "@/utils/offerStatus";
import { use } from "react";


interface Props {
    params: Promise<{ id: string }>;
}

export default function BoostPage({ params }: Props) {
    const { id } = use(params);
    const { data: offer, isLoading } = useOffer({ id });

    if (isLoading) {
        return <BoostPlanListSkeleton/>
    }

    if (!offer) {
        return (
            <section className="pt-14 px-6">
                <p className="text-center text-gray-500">Offer not found.</p>
            </section>
        );
    }

    const status = getDisplayStatus(offer);

    if (status !== "active") {
        return (
            <section className="pt-14 px-6">
                <p className="text-center text-gray-500"> Can only boost active Offer</p>
            </section>
        )
    }

    return (
        <div className="bg-white p-6 mb-16 md:mb-0 flex flex-col gap-6">
            <BoostOfferCard offer={offer} />
            <BoostPlanList offerId={offer.id} />            
        </div>
    );
}

