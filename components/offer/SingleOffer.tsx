"use client";

import { Offer } from "@/types/offer";
import Image from 'next/image';
import Comment from "../comment/Comment";
import ReviewChart from "../review/ReviewChart";
import Action from "./Action";
import CreatorLink from "./CreatorLink";
import OfferInfo from "./OfferInfo";
import TrustSection from "./TrustSection";

interface Props {
    offer: Offer;
}

export default function SingleOffer({ offer }: Props) {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-9 gap-10 pb-10">
                <div className="md:col-span-4 flex flex-col items-center justify-start">
                    <div className="bg-gray-100 rounded-sm md:rounded-2xl w-full">
                        <Image
                            src={offer.imageUrl}
                            alt={offer.title}
                            width={500}
                            height={500}
                            priority
                            className="w-full aspect-[10/9] p-4 md:p-10 object-cover rounded-sm md:rounded-2xl"
                        />
                    </div>
                </div>

                <div className="md:col-span-5 flex flex-col pt-2">
                    <div className="flex justify-between items-start mb-3">
                        <CreatorLink offer={offer} />
                        <span className="bg-green-100 text-green-700 text-[10px] uppercase tracking-wider font-bold px-5 py-3 rounded-sm mt-1">
                            Available
                        </span>
                    </div>
                    <OfferInfo offer={offer} />

                    <span className="border-b border-gray-300 w-full"/>
                    <Action offer={offer} />
                </div>
            </div>

            <TrustSection offer={offer} />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-12">
                <div className="md:col-span-4 space-y-6">
                    <ReviewChart offer={offer} />
                </div>
                <div className="md:col-start-6 lg:col-start-5 md:col-span-6 space-y-8">
                    <Comment offer={offer} />
                </div>
            </div>
        </>
    );
}