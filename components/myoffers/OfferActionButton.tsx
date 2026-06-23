import { Offer } from "@/types/offer";
import { DisplayStatus } from "@/utils/offerStatus";
import Link from "next/link";

interface Props {
  offer: Offer;
  status: DisplayStatus;
}

export default function OfferActionButton({ offer, status }: Props) {
  if (status === "active") {
    return (
      <Link
        href={`/offers/${offer.id}`}
        className="w-full block text-center font-baloo bg-primary text-white py-2 rounded-md font-semibold hover:bg-orange-700 transition-colors"
      >
        View Live Post
      </Link>
    );
  }

  if (
    status === "pending" ||
    status === "suspended" ||
    status === "rejected" ||
    status === "expired"
  ) {
    return (
      <button
        disabled
        className="w-full bg-[#FFD5C3] font-baloo text-white py-2 rounded-md font-semibold cursor-not-allowed"
      >
        View Live Post
      </button>
    );
  }

  return null;
}
