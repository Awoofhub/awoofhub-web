import { Offer } from "@/types/offer";
import Link from "next/link";

interface Props {
  offer: Offer;
}

export default function AnalyticsButton({ offer }: Props) {
  if (offer.isBoosted) {
    return (
      <Link
        href={`/my-offers/boost/${offer.id}/analytics`}
        className="w-full block text-center text-xs md:text-sm lg:text-base font-baloo text-primary py-2 rounded-md font-semibold hover:bg-primary/10 border border-primary"
      >
        See Analytics
      </Link>
    );
  }

  return null;
}