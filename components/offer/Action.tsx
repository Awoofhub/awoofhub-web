import { useState, useEffect } from "react";
import Image from "next/image";
import { useGrabOffer } from "@/features/offers/useGrabOffer";
import { Offer } from "@/types/offer";
import { formatDate } from "@/utils/formatDate";
import { FiCopy } from "react-icons/fi";
import { IoCheckmarkSharp } from "react-icons/io5";
import { differenceInSeconds, parseISO } from "date-fns";
import { formatCountdown } from "@/utils/formatCountdown";


interface Props {
  offer: Offer;
}

export default function Action({ offer }: Props) {
  const [copied, setCopied] = useState(false);
  const grab = useGrabOffer({ id: offer.id });
  // Determine trending from click count (same source used elsewhere)
  const isTrending = (offer.clickCount ?? 0) >= 1;

  const totalSeconds = Math.max(
    0,
    differenceInSeconds(parseISO(offer.endDate), new Date()),
  );
  const isExpiring = totalSeconds >= 0 && totalSeconds <= 259200; // 3 days in seconds

  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [prevTotalSeconds, setPrevTotalSeconds] = useState(totalSeconds);

  // Sync prop changes during render
  if (totalSeconds !== prevTotalSeconds) {
    setPrevTotalSeconds(totalSeconds);
    setSecondsLeft(totalSeconds);
  }

  useEffect(() => {
    if (!isExpiring) return;
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
  }, [isExpiring, secondsLeft]);

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    grab.grabOffer();
    window.open(offer.externalLink, "_blank", "noopener,noreferrer");
  };

  const handleCopyCoupon = async () => {
    if (!offer.couponCode) return;

    await navigator.clipboard.writeText(offer.couponCode);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col py-2 lg:mt-1">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-2 lg:mb-4">
        <div className="flex items-center gap-2 ">
          {isExpiring ? (
            <div className="flex items-center text-sm lg:text-lg font-baloo gap-1 text-[#E70606] font-semibold">
              Expiring:
              <Image
                src="/clockk.svg"
                alt="expiring"
                width={16}
                height={16}
                className="w-4 h-4 ml-0.5"
              />
              <span>{formatCountdown(secondsLeft)}</span>
            </div>
          ) : (
            <>
              <span className="text-sm lg:text-lg font-semibold font-baloo text-[#006400]">
                Expiry:
              </span>
              <span className="text-sm lg:text-lg font-semibold font-baloo text-[#006400]">
                {formatDate(offer.endDate)}
              </span>
            </>
          )}
        </div>
        {isTrending && (
          <div className="flex items-center gap-1 text-sm lg:text-xl font-semibold font-baloo">
            <Image
              src="/flame.svg"
              alt="trending"
              width={16}
              height={16}
              className="w-4 h-4 lg:w-5 lg:h-5"
            />
            <span className="text-primary">Trending</span>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center gap-2 lg:gap-3">
        <a
          href={offer.externalLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className={`cursor-pointer flex justify-center items-center bg-primary text-white font-semibold py-2 md:px-8 rounded-sm transition-colors text-sm lg:text-base font-baloo ${offer.dealType === "promo_code" && offer.couponCode ? "w-[50%] md:w-[70%]" : "w-full"}`}
        >
          Grab this Deal
        </a>
        {offer.dealType === "promo_code" && offer.couponCode && (
          <div className="w-[50%] md:w-[30%] gap-3 flex justify-between items-center rounded-sm transition-colors text-sm lg:text-base font-baloo">
            <button
              className="bg-[#D2F0D4] text-black cursor-pointer font-semibold text-center py-2 px-4 rounded-sm w-full"
              type="button"
              onClick={handleCopyCoupon}
            >
              {offer.couponCode}
            </button>
            <button
              type="button"
              onClick={handleCopyCoupon}
              className="text-[#025920] cursor-pointer text-xl text-center"
            >
              {copied ? <IoCheckmarkSharp /> : <FiCopy />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
