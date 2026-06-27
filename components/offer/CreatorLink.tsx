import { Offer } from "@/types/offer";
import { capitalizeFirstLetter } from "@/utils/truncate";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { FaRegUser } from "react-icons/fa6";

interface Props {
  offer: Offer;
  variant?: "top" | "card";
}

export default function CreatorLink({ offer, variant = "top" }: Props) {
  if (variant === "card") {
    return (
      <Link
        href={`/profile/${offer.contributor.username}`}
        className="flex items-center justify-between  md:py-2 px-2 md:px-5 gap-6"
      >
        <div className="w-18 h-18 md:w-25 md:h-25 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold text-2xl overflow-hidden shrink-0 border-2 border-orange-500">
          {offer.contributor.profileImageUrl ? (
            <Image
              width={600}
              height={600}
              src={offer.contributor.profileImageUrl}
              alt={offer.contributor.name}
              className="w-full h-full object-cover "
            />
          ) : (
            <div className="bg-[#F7C8D5] text-[#B85B80] text-3xl font-semibold flex items-center justify-center w-full h-full">
              {capitalizeFirstLetter(offer.contributor.name)}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between gap-1">
          <div className="flex gap-12 justify-between items-center">
            <span className="font-semibold font-baloo text-black text-sm md:text-base lg:text-lg hover:underline">
              {offer.contributor.name}
            </span>
            <span className="flex items-center gap-1 bg-[#FFF0EC] text-primary text-[10px] lg:text-xs font-semibold px-2.5 py-2 rounded-full">
              <FaRegUser size={12} /> Awoofer
            </span>
          </div>
          <span className="text-muted font-medium text-xs md:text-sm">
            @{offer.contributor.username}
          </span>
          <span className="text-muted font-medium text-xs md:text-sm">
            Awoofer since{" "}
            {format(
              new Date(offer.contributor.createdAt || "2023-01-01"),
              "MMMM yyyy",
            )}
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/profile/${offer.contributor.username}`}
      className="flex items-center gap-2"
    >
      <div className="w-7 h-7 md:w-9 md:h-9 border border-primary bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold text-sm overflow-hidden">
        {offer.contributor.profileImageUrl ? (
          <Image
            width={50}
            height={50}
            src={offer.contributor.profileImageUrl}
            alt={offer.contributor.name}
            className="w-full h-full object-cover"
          />
        ) : (
          capitalizeFirstLetter(`${offer.contributor.name}`)
        )}
      </div>
      <span className="text-orange-500 text-xs md:text-sm font-semibold hover:underline">
        {offer.contributor.username}
      </span>
    </Link>
  );
}
