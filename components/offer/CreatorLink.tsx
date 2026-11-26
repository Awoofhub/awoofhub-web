import { Offer } from "@/types/offer";
import { capitalizeFirstLetter } from "@/utils/truncate";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa6";
import { RiVerifiedBadgeFill } from "react-icons/ri";

interface Props {
  offer: Offer;
}

export default function CreatorLink({ offer }: Props) {

  const isOfficial = offer.contributor.role === "staff";

  const isPremiumActive = offer.contributor.subscriptionState === "active" && (offer.contributor.subscriptionPlan === "growth" || offer.contributor.subscriptionPlan === "pro");

  return (
    <Link
      href={`/profile/${offer.contributor.username}`}
      className="flex items-center justify-between lg:py-2 px-2 lg:px-5 gap-3 lg:gap-4"
    >
      <div className="w-16 h-16 xs:w-12 xs:h-12 lg:w-25 lg:h-25 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold text-2xl overflow-hidden shrink-0 border-2 border-orange-500">
        {offer.contributor.profileImageUrl ? (
          <Image
            width={600}
            height={600}
            unoptimized
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
        <div className="flex justify-between items-center">
          <span className="font-semibold font-baloo text-black text-sm lg:text-lg hover:underline">
            {offer.contributor.name}
          </span>

          {isOfficial ? (
            <span className="flex items-center gap-1 bg-linear-to-b from-[#896D02] to-[#EFBF04] text-white text-[10px] lg:text-xs font-semibold px-2 py-1  rounded-full shrink-0">
              <RiVerifiedBadgeFill size={13} />
              Official
            </span>
          ) : isPremiumActive ? (
            <span className="flex items-center gap-1 bg-[#164CC3] text-white text-[10px] lg:text-xs font-semibold px-2 py-1  rounded-full shrink-0">
              <RiVerifiedBadgeFill size={13} />
              Premium
            </span>
          ) : (
            <span className="flex items-center gap-1 bg-[#FFF0EC] text-primary text-[10px] lg:text-xs font-semibold px-2 py-1 rounded-full shrink-0">
              <FaRegUser size={11} /> Awoofer
            </span>
          )}
        </div>
        <span className="text-muted font-medium text-xs xs:text-[10px] lg:text-sm">
          @{offer.contributor.username}
        </span>
        <span className="text-muted font-medium mt-1 text-xs xs:text-[10px] lg:text-sm">
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
