"use client";
import { useWishlist } from "@/features/wishlist/useWishlist";
import Image from "next/image";
import Link from "next/link";
import OfferList from "../offers/OfferList";
import OfferListSkeleton from "../offers/OfferListSkeleton";

export default function WishlistOffers() {
  const { data, isLoading } = useWishlist();
  const hasItems = !isLoading && data && data.length > 0;

  return (
    <section className="pt-6 pb-24 lg:pb-10 px-4 md:px-6 lg:px-8 xl:px-12 max-w-[1440px] mx-auto">
      {(isLoading || hasItems) && (
        <h1 className="text-lg md:text-xl xl:text-2xl font-semibold mb-2">Saved Deals</h1>
      )}

      {isLoading && <OfferListSkeleton number={8} />}

      {hasItems && <OfferList offers={data.map((w) => w.offer)} />}

      {!isLoading && !hasItems && (
        <div className="flex flex-col items-center justify-center text-center px-4 py-40">
          <Image
            src="/wishlist.png"
            alt="wishlist-img"
            width={50}
            height={50}
            className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] mb-2"
          />
          <h1 className="mb-2 text-lg md:text-xl font-bold">
            No saved deals
          </h1>
          <p className="mb-6 text-xs md:text-sm text-muted max-w-140">
            Save deals you like and, they'll appear here.
          </p>
          <Link
            className="flex font-semibold font-baloo items-center bg-primary text-white justify-center text-sm md:text-base w-[140px] md:w-[160px] py-2 rounded-sm transition-all hover:bg-orange-700 active:scale-95"
            href="/"
          >
            Explore offers
          </Link>
        </div>
      )}
    </section>
  );
}