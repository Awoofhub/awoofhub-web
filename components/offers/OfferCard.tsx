"use client";
import { Offer } from "@/types/offer";
import { formatCountdown } from "@/utils/formatCountdown";
import Rating from "@mui/material/Rating";
import { differenceInSeconds, parseISO } from "date-fns";
import {
  Flag,
  Gift,
  Globe,
  MapPin,
  TrendingDown,
  Truck,
} from "lucide-react";
import { LuTags } from "react-icons/lu";
import { RiCoupon4Line } from "react-icons/ri";
import { TbCashMoveBack } from "react-icons/tb";
import { FaArrowsRotate } from "react-icons/fa6";
import { RiFlashlightLine } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { IoAlarmOutline } from "react-icons/io5";
import WishlistButton from "../wishlist/WishlistButton";

interface Props {
  offer: Offer;
  index?: number;
}

// Icon shown next to the location, based on how the offer is available
function LocationIconFor({ location }: { location: string }) {
  if (location === "Online") return <Globe size={14} className="text-muted w-3 lg:w-4 shrink-0" />;
  if (location === "Nationwide") return <Flag size={14} className="text-muted w-3 lg:w-4 shrink-0" />;
  return <MapPin size={14} className="text-muted w-2.5 md:w-3 lg:w-4 shrink-0" />;
}

// Icon shown next to the deal value, based on the offer's deal type
function ValueIconFor({ dealType }: { dealType: Offer["dealType"] }) {
  switch (dealType) {
    case "cashback":
      return <TbCashMoveBack size={20} className="text-primary w-3 xs:w-4 lg:w-5 shrink-0" />;
    case "freebie":
      return <Gift size={20} className="text-primary w-3 xs:w-4 lg:w-5 shrink-0" />;
    case "discount":
      return <LuTags size={20} className="text-primary w-3 xs:w-4 lg:w-5 shrink-0" />;
    case "bogo":
      return <RiFlashlightLine size={20} className="text-primary w-3 xs:w-4 lg:w-5 shrink-0" />;
    case "promo_code":
      return <RiCoupon4Line size={20} className="text-primary w-3 xs:w-4 lg:w-5  shrink-0" />;
    case "free_trial":
      return <FaArrowsRotate size={20} className="text-primary w-3 xs:w-4 lg:w-5 shrink-0" />;
    case "free_delivery":
      return <Truck size={20} className="text-primary w-3 xs:w-4 lg:w-5 shrink-0" />;
    case "price_drop":
      return <TrendingDown size={20} className="text-primary w-3 xs:w-4 lg:w-5 shrink-0" />;
    default:
      return <LuTags size={20} className="text-primary w-3 xs:w-4 lg:w-5 shrink-0" />;
  }
}

function getOfferVariant(
  offer: Offer,
  index: number,
): "trending" | "expiring" | "trending-expiring" | "regular" {
  const isTrending = offer.clickCount >= 1;
  const daysLeft = differenceInSeconds(parseISO(offer.endDate), new Date());
  const isExpiring = daysLeft >= 0 && daysLeft <= 259200; // 3 days in seconds

  if (isTrending && isExpiring) return "trending-expiring";
  if (isTrending) return "trending";
  if (isExpiring) return "expiring";
  return "regular";
}

export default function OfferCard({ offer, index = 0 }: Props) {
  const variant = getOfferVariant(offer, index);
  const totalSeconds = Math.max(
    0,
    differenceInSeconds(parseISO(offer.endDate), new Date()),
  );

  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [prevTotalSeconds, setPrevTotalSeconds] = useState(totalSeconds);

  if (totalSeconds !== prevTotalSeconds) {
    setPrevTotalSeconds(totalSeconds);
    setSecondsLeft(totalSeconds);
  }

  const hasCountdown =
    variant === "expiring" || variant === "trending-expiring";

  useEffect(() => {
    if (!hasCountdown) return;
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasCountdown, secondsLeft]);



  return (
    <Link
      href={`/offers/${offer.id}`}
      className="w-full bg-white h-[270px] xxs:h-[290px] xs:h-[280px] md:h-[350px] lg:h-[380px] xl:h-[420px] rounded-lg shadow-sm border border-gray-100 p-1.5 md:p-2 lg:p-3 flex flex-col group hover:shadow-md transition-shadow"
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
          <span className="max-w-[60px] xxs:max-w-[80px] xs:max-w-[100px] lg:max-w-[140px] truncate text-primary text-[10px] lg:text-xs font-medium">
            @{offer.contributor.username}
          </span>
            <span className="flex items-center gap-1 text-muted/70 text-[10px] lg:text-xs">
            <FaRegUser className="w-2 h-2 md:w-2.5 md:h-2.5  -translate-y-px lg:translate-y-0"/>
            Awoofer
          </span>
        </div>

        {/* Card Content Wrapper */}
        <div className="flex flex-col">
          <h4 className="font-semibold text-black text-sm md:text-base lg:text-lg mb-0.5 line-clamp-1">
            {offer.title}
          </h4>

          <div className="flex items-center mb-0.5 gap-1">
            <ValueIconFor dealType={offer.dealType} />
            <p className="text-primary font-medium font-baloo text-xs xs:text-sm lg:text-base line-clamp-1">
              {offer.value}
            </p>
          </div>

          <div className="flex items-center justify-between mb-1 lg:mb-2">
            <div className="flex items-center gap-1 max-w-[70px] xxs:max-w-[80px] xs:max-w-[80px] lg:max-w-[120px]">
              <LocationIconFor location={offer.location} />
              <p className="truncate text-muted text-[10px] lg:text-xs">
                {offer.location}
              </p>
            </div>
               {offer.clickCount > 0 && (
              <div className="flex items-center gap-1 text-muted text-[10px] lg:text-xs">
                <FiUsers size={12} className="text-muted" />
                <span>{offer.clickCount} {offer.clickCount === 1 ? "grab" : "grabs"}</span>
              </div>
            )}
          </div>

          <hr className="text-muted/20"/>
          {/* rating and countdown*/}
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-1">
              <Rating
                name="readonly"
                className="ml-[-3px] !text-[14px] xs:!text-[16px] md:!text-[18px] lg:!text-[20px]"
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
              <span className="font-medium font-baloo text-[10px] sm:text-[16px] md:text-[10px] lg:text-[16px] text-gray-400 ml-1">
                ({offer.reviewCount})
              </span>
            </div>

            {hasCountdown && (
              <div className="flex font-baloo items-center gap-1 text-[#E70606] text-[10px] xs:text-xs md:text-sm lg:text-base font-medium">
                <IoAlarmOutline size={18} className="w-3"/>
                {formatCountdown(secondsLeft)}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}