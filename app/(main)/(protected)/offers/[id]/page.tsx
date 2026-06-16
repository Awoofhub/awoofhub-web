"use client"

import ShareModal from "@/components/modals/ShareModal";
import SingleOffer from "@/components/offer/SingleOffer";
import SingleOfferSkeleton from "@/components/offer/SingleOfferSkeleton";

import OfferList from "@/components/offers/OfferList";
import OfferListSkeleton from "@/components/offers/OfferListSkeleton";
import { useOffer } from "@/features/offers/useOffer";
import { useRandomOffers } from "@/features/offers/useRandomOffers";
import { ChevronRight } from "lucide-react";
import Link from 'next/link';
import { use } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

export default function OfferPage({ params }: Props) {
  const { id } = use(params);

  const { data: offer, isLoading } = useOffer({ id });

  const { data, isFetching, isFetched } = useRandomOffers();


  if (isLoading) {
    return (
      <section className="p-4 sm:p-8 mx-auto max-w-[1440px] bg-white text-gray-800 border-b border-gray-300 pb-30">
        <div className="mx-auto flex justify-between items-center mb-7 md:mb-10">
          <div className="w-48 h-4 bg-gray-200 rounded animate-pulse" />
          <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
        </div>
        <SingleOfferSkeleton />
      </section>
    );
  }

  if (!offer) {
    return (
      <section className="pt-14 px-6">
        <p className="text-center text-gray-500">Offer not found.</p>
      </section>
    );
  }

  return (
    <>
      <section className="p-4 sm:p-8 mx-auto max-w-[1440px] bg-white text-gray-800 border-b border-gray-300 pb-30">
        <div className="mx-auto flex justify-between items-center mb-7 md:mb-10">
          <nav className="flex items-center text-sm text-gray-500 gap-2">
            <Link href={`/offers?category=${offer.category.slug}`}>{offer.category.name}</Link> <ChevronRight size={14} />
            <span className="font-semibold text-[10px] xs:text-sm text-gray-900">{offer.id}</span>
          </nav>
          <ShareModal offerId={offer.id} />
        </div>
        <SingleOffer offer={offer} />
      </section>

      <section className="p-4 sm:p-8 bg-white mx-auto max-w-[1440px] pb-10 mb-15 lg:mb-0">
        <h3 className="text-xl xs:text-2xl md:text-3xl font-bold mb-6">
          Explore more offers like this
        </h3>


        {isFetching && <OfferListSkeleton number={8} />}
        {!isFetching && data.length === 0 && (
          <p className="text-gray-500 text-center">No offers available.</p>
        )}
        {isFetched && data.length > 0 && (
          <OfferList
            offers={data}
          />
        )}
      </section>
    </>
  );
}