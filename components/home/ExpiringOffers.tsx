"use client";
import { useExpiringOffers } from "@/features/offers/useExpiringOffers";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { IoIosArrowForward } from "react-icons/io";
import { OfferError } from "../offers/OfferError";
import OfferList from "../offers/OfferList";
import OfferListSkeleton from "../offers/OfferListSkeleton";

const START_SECONDS = 3 * 24 * 60 * 60; // 3d 0h 0m 0s = 259,200s
const RESET_SECONDS = 2 * 24 * 60 * 60 + 23 * 60 * 60 + 58 * 60; // 2d 23h 58m 0s = 259,080s

export default function ExpiringOffers() {
  const { data, isFetching, isLoading, isFetched } = useExpiringOffers({
    limit: 4,
  });

  const allOffers = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );

  const [secondsLeft, setSecondsLeft] = useState(START_SECONDS);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= RESET_SECONDS) {
          return START_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const days = Math.floor(secondsLeft / (24 * 3600));
  const hours = Math.floor((secondsLeft % (24 * 3600)) / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  return (
    <section className="bg-gray-50">
      <div className="py-8 lg:py-12 px-4 md:px-6 lg:px-8 xl:px-12 max-w-[1440px] mx-auto">
        {/* desktop screen view */}
        <div className="hidden md:flex px-4 py-2 bg-primary justify-between items-center ">
          <span className="flex gap-2 items-center">
            <Image src="yellowClock.svg" alt="clock" width={20} height={20} className="w-6 h-6" />
            <h3 className="text-xl lg:text-2xl font-semibold text-white">
              Expiring soon
            </h3>
          </span>
          {/* Countdown Clock Display */}
          <div className="text-white font-baloo text-sm lg:text-lg">
            Time left:{" "}
            <span className="font-semibold font-mono">
              {days}d {hours}h {minutes}m {seconds}s
            </span>
          </div>
          {/* Navigation Link*/}
          <Link
            href="/expiring"
            className="group inline-flex items-center gap-2 text-white font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
          >
            <span className="text-white text-base font-baloo font-medium">
              View all
            </span>
            <IoIosArrowForward className="text-white transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* mobile screen view */}
        <div className="px-2 py-2 md:hidden bg-primary flex justify-between items-center">
          <div>
            <span className="flex gap-2 items-center">
              <Image src="yellowClock.svg" alt="clock" priority width={20} height={20} className="w-5 h-5" />
              <h3 className="text-base font-semibold text-white">
                Expiring soon
              </h3>
            </span>
            {/* Countdown Clock Display */}
            <div className="text-white font-baloo text-xs mt-1">
              Time left:{" "}
              <span className="font-semibold font-mono">
                {days}d {hours}h {minutes}m {seconds}s
              </span>
            </div>
          </div>
          {/* Navigation Link*/}
          <Link
            href="/expiring"
            className="group inline-flex items-center gap-2 text-white font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
          >
            <span className="text-white text-sm font-baloo font-medium">
              View all
            </span>
            <IoIosArrowForward className="text-white transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        <ErrorBoundary fallback={<OfferError />}>
          {isLoading && <OfferListSkeleton number={4} />}
          {!isLoading && !isFetching && allOffers.length === 0 && (
            <p className="text-gray-500 mt-2">No offers available.</p>
          )}
          {isFetched && allOffers.length > 0 && <OfferList offers={allOffers} />}
        </ErrorBoundary>
      </div>
    </section>
  );
}
