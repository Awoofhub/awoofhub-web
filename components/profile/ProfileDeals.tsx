import { Offer } from "@/types/offer";
import Link from "next/link";
import OfferInfiniteList from "../offers/OfferInfiniteList";
import Image from "next/image";
import ProfileDealsSkeleton from "./ProfileDealsSkeleton";

interface Props {
  isOwnProfile: boolean;
  offers: Offer[];
  isLoading: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

export default function ProfileDeals({
  isOwnProfile,
  offers,
  isLoading,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: Props) {
  return (
    <div className="flex-1 min-w-0 flex flex-col">
      <h2 className="text-2xl font-semibold text-black mb-4">Active Deals</h2>

      {isLoading && <ProfileDealsSkeleton />}

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
        <OfferInfiniteList
          offers={offers}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          gridClassName="grid grid-cols-2 lg:grid-cols-3 gap-4"
        />
      )}
    </div>
  );
}
