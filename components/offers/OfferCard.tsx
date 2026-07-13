"use client";
import { useOfferCountdown } from "@/features/offers/Useoffercountdown";
import { Offer } from "@/types/offer";
import { formatCountdown } from "@/utils/formatCountdown";
import Rating from "@mui/material/Rating";
import Image from "next/image";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { IoAlarmOutline } from "react-icons/io5";
import WishlistButton from "../wishlist/WishlistButton";
import { getOfferVariant } from "@/utils/offerVariant";
import { LocationIconFor, ValueIconFor } from "./Offercardicons";

interface Props {
  offer: Offer;
  index?: number;
}

export default function OfferCard({ offer }: Props) {
  const variant = getOfferVariant(offer);
  const { secondsLeft, hasCountdown } = useOfferCountdown(offer, variant);

  return (
    <Link
      href={`/offers/${offer.id}`}
      className="w-full bg-white h-[280px] xxs:h-[290px] xs:h-[280px] md:h-[350px] lg:h-[380px] xl:h-[420px] rounded-lg shadow-sm border border-gray-100 p-1.5 md:p-2 lg:p-3 flex flex-col group hover:shadow-md transition-shadow"
    >
      {/* Card Image & Badges */}
      <div className="relative h-[60%] md:h-[70%] rounded-md overflow-hidden bg-white">
        <div className="absolute top-2 md:top-4 left-2 right-2 flex justify-between items-center z-10">
          {variant === "trending" || variant === "trending-expiring" ? (
            <div className="w-6 h-6 md:w-7 md:h-7 lg:w-9 lg:h-9 bg-white rounded-full flex items-center justify-center">
              <Image
                src="/flame.svg"
                alt="trending"
                width={16}
                height={16}
                priority
                className="w-4 h-4 md:w-5 md:h-5 lg:w-7 lg:h-7"
              />
            </div>
          ) : (
            <span />
          )}
          <div
            className="w-6 h-6 md:w-7 md:h-7 lg:w-9 lg:h-9 bg-white rounded-full flex items-center justify-center"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <WishlistButton
              position="relative"
              size="text-[20px] md:text-[25px] lg:text-[30px]"
              offerId={offer.id}
            />
          </div>
        </div>

        <Image
          src={offer.imageUrl}
          alt={offer.title}
          width={500}
          height={500}
          className="w-full h-full object-fill group-hover:scale-105 transition-transform"
        />
      </div>

      <div className="h-[40%] md:px-1 flex flex-col mt-3 md:mt-4">
        {/* Username and Awoofer badge */}
        <div className="flex flex-wrap items-center justify-between mb-1">
          <span className="max-w-[55%] truncate text-primary text-[10px] lg:text-xs font-medium">
            @{offer.contributor.username}
          </span>
          <span className="flex items-center gap-1 text-muted/70 text-[10px] lg:text-xs">
            <FaRegUser className="w-2 h-2 md:w-2.5 md:h-2.5" />
            Awoofer
          </span>
        </div>

        {/* Card Content Wrapper */}
        <div className="flex flex-col">
          <h4 className="w-full block font-semibold text-black text-sm md:text-base lg:text-lg mb-0.5 truncate">
            {offer.title}
          </h4>

          <div className="flex items-center mb-0.5 gap-1">
            <ValueIconFor dealType={offer.dealType} />
            <p className="text-primary font-medium font-baloo text-[12.5px] xs:text-sm lg:text-base line-clamp-1">
              {offer.value}
            </p>
          </div>

          <div className="flex items-center justify-between mb-1 lg:mb-2">
            <div
              className={`flex items-center gap-1 ${offer.clickCount > 0
                ? "max-w-[50%]"
                : "w-full"
                }`}
            >
              <LocationIconFor location={offer.location} />
              <p className="truncate text-muted text-[11px] lg:text-xs">
                {offer.location}
              </p>
            </div>
            {offer.clickCount > 0 && (
              <div className="flex items-center gap-1 text-muted text-[10px] lg:text-xs">
                <FiUsers size={12} className="text-muted" />
                <span>
                  {offer.clickCount} {offer.clickCount === 1 ? "grab" : "grabs"}
                </span>
              </div>
            )}
          </div>

          <hr className="text-muted/20" />
          {/* rating and countdown*/}
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-1">
              <Rating
                name="readonly"
                className="!text-[16px] md:!text-[18px] lg:!text-[20px]"
                value={offer.avgRating}
                precision={0.1}
                readOnly
                sx={{
                  fontSize: { xs: "18px" },
                  "& .MuiRating-icon": { marginRight: "-7px" },
                  "& .MuiRating-iconFilled": { color: "#FFC000" },
                  "& .MuiRating-iconEmpty": { color: "#ccc" },
                }}
              />
              <span className="font-medium font-baloo text-[12px]  md:text-xs lg:text-[16px] text-gray-400 ml-1">
                ({offer.reviewCount})
              </span>
            </div>

            {hasCountdown && (
              <div className="flex font-baloo items-center gap-1 text-[#E70606] text-[12px] xs:text-xs md:text-sm lg:text-base font-medium">
                <IoAlarmOutline size={18} className="w-3" />
                {formatCountdown(secondsLeft)}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}