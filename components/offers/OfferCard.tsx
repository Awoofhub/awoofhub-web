'use client'
import { Offer } from "@/types/offer";
import Rating from "@mui/material/Rating";
import { differenceInSeconds, parseISO } from "date-fns";
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

function formatCountdown(seconds: number) {
  if (seconds <= 0) return "Expired";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
}

export default function OfferCard({ offer, index = 0 }: Props) {
  const variant = getOfferVariant(offer, index);
  const totalSeconds = Math.max(0, differenceInSeconds(parseISO(offer.endDate), new Date()));

  // Track both current seconds and previous total seconds to handle background data changes safely
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [prevTotalSeconds, setPrevTotalSeconds] = useState(totalSeconds);

  // The official React way to sync prop changes directly during render (prevents cascading renders)
  if (totalSeconds !== prevTotalSeconds) {
    setPrevTotalSeconds(totalSeconds);
    setSecondsLeft(totalSeconds);
  }

  const hasCountdown = variant === "expiring" || variant === "trending-expiring";

  useEffect(() => {
    if (!hasCountdown) return;
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) { clearInterval(timer); return 0; }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasCountdown, secondsLeft]);

  return (
    <Link href={`/offers/${offer.id}`} className="bg-white w-[174px] h-[320px] sm:w-[300px] sm:h-[400px] md:w-[174px] md:h-[320px] lg:w-[300px] lg:h-[400px] rounded-xl shadow-sm border border-gray-100 p-2 md:p-2 lg:p-3 flex flex-col group hover:shadow-md transition-shadow">

      {/* Card Image & Badges */}
      <div className="relative mb-2 lg:mb-3 rounded-lg overflow-hidden flex-grow bg-white">
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center z-10">
          {variant === "trending" || variant === "trending-expiring" ? (
            <div className="w-7 h-7 lg:w-9 lg:h-9 bg-white rounded-full flex items-center justify-center">
              <Image src="/flame.svg" alt="trending" width={16} height={16} className="lg:w-7 lg:h-7" />
            </div>
          ) : (
            <span />
          )}
          <div className="w-7 h-7 lg:w-9 lg:h-9 bg-white rounded-full flex items-center justify-center"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}>
            <WishlistButton position="relative" size="text-[20px] lg:text-[30px]" offerId={offer.id} />
          </div>
        </div>

        <Image
          src={offer.imageUrl}
          alt={offer.title}
          width={500}
          height={500}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform"
        />
      </div>

      {/* Username and Awoofer badge */}
      <div className="flex items-center justify-between mb-1 lg:mb-2">
        <span className="text-primary text-[10px] lg:text-xs font-medium">
          @{offer.contributor.username}
        </span>
        <span className="flex items-center gap-1 bg-[#FFF0EC] text-primary text-[9px] lg:text-[11px] font-semibold px-1.5 py-0.5 rounded-full">
          <FaRegUser size={10} /> Awoofer
        </span>
      </div>

      {/* Card Content Wrapper */}
      <div className="flex flex-col">
        <h4 className="font-bold text-black text-sm sm:text-base md:text-sm lg:text-base mb-1 line-clamp-1">
          {offer.title}
        </h4>
        <p className="text-muted text-xs sm:text-sm md:text-xs lg:text-sm mb-1 lg:mb-2 line-clamp-2">
          {offer.description}
        </p>

        {/* Bottom Metrics Container */}
        <div>
          {/* Top Row: Ratings & Conditionally Grabs */}
          <div className="flex items-center justify-between mb-1 lg:mb-2">
            <div className="flex items-center gap-1">
              <Rating
                name="readonly"
                className="ml-[-3px] sm:!text-[24px] md:!text-[18px] lg:!text-[22px]"
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

            {/* Grabs for expiring condition */}
            {hasCountdown && (
              <div className="flex items-center gap-1 text-muted text-[10px] lg:text-xs">
                <FiUsers size={12} className="text-primary/60" />
                <span>{offer.clickCount} grabs</span>
              </div>
            )}
          </div>

          {/* Bottom Row: Displays either the Countdown OR the Grabs count */}
          <div className="flex items-center gap-1 mb-2">
            {hasCountdown ? (
              <div className="flex items-center gap-1 text-[#E70606] text-xs lg:text-sm font-medium">
                <IoAlarmOutline size={18} />
                {formatCountdown(secondsLeft)}
              </div>
            ) : (
              <div className="flex items-center gap-1 text-muted text-[10px] lg:text-xs">
                <FiUsers size={12} className="text-primary/60" />
                <span >{offer.clickCount} grabs</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}