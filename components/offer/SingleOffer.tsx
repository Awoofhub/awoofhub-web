"use client";

import { Offer } from "@/types/offer";
import Image from "next/image";
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
      <div className="grid grid-cols-1 lg:grid-cols-9 gap-4 lg:gap-10 pb-10">
        <div className="lg:col-span-4 flex flex-col items-center justify-start">
          <Image
            src={offer.imageUrl}
            alt={offer.title}
            width={500}
            height={500}
            priority
            className="w-full max-w-[600px] mx-auto aspect-[12/9] lg:aspect-[10/9] object-fill rounded-2xl md:rounded-3xl"
          />
        </div>

        <div className="lg:col-span-5 flex flex-col pt-2">
          <div className="flex justify-between items-center mb-3">
            <CreatorLink offer={offer} />
            <span className="bg-[#20B52633] font-baloo text-[#2C742F] text-xs md:text-sm  animate-pulse font-medium px-4 md:px-5 py-1 md:py-2 rounded-sm">
              Available
            </span>
          </div>
          <OfferInfo offer={offer} />

          <span className="border-b border-gray-300 w-full" />
          <Action offer={offer} />
        </div>
      </div>

      <TrustSection offer={offer} />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 mt-6 md:mt-12">
        <div className="md:col-span-5 lg:col-span-4 space-y-6">
          <ReviewChart offer={offer} />
        </div>
        <div className="md:col-start-6 border-t border-muted/20 md:border-t-0 pt-4 md:pt-0 lg:col-start-5 md:col-span-6 space-y-8">
          <Comment offer={offer} />
        </div>
      </div>
    </>
  );
}
