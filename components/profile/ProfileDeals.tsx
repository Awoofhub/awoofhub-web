import { Offer } from "@/types/offer";
import Link from "next/link";
import OfferCard from "../offers/OfferCard";
import OfferListSkeleton from "../offers/OfferListSkeleton";
import Image from "next/image";

interface Props {
  isOwnProfile: boolean;
  offers: Offer[];
  isLoading: boolean;
}

export default function ProfileDeals({
  isOwnProfile,
  offers,
  isLoading,
}: Props) {
  return (
    <div className="flex-1 min-w-0 flex flex-col">
      <h2 className="text-2xl font-semibold text-black mb-4">Active Deals</h2>

      {isLoading && (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="skeleton rounded-xl h-[320px] lg:h-[500px]"
            />
          ))}
        </div>
      )}

      {!isLoading && offers.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center text-center min-h-[60vh]">
          <Image
            className="mb-4"
            src="/emptyProfile.svg"
            alt="empty deal"
            width={40}
            height={40}
          />
          <p className="font-bold text-black mb-1 text-lg">No deals yet</p>
          <p className="text-black text-sm mb-4">
            {isOwnProfile
              ? "Deals you post as an awoofer will appear here."
              : "This user has no live offers at the moment."}
          </p>
          {isOwnProfile && (
            <Link
              href="/offers/create"
              className="bg-primary font-baloo text-white px-6 py-2 rounded-md text-base font-semibold hover:bg-orange-700 transition-colors"
            >
              Post an Awoof
            </Link>
          )}
        </div>
      )}

      {!isLoading && offers.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {offers.map((offer, index) => (
            <OfferCard key={offer.id} offer={offer} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
