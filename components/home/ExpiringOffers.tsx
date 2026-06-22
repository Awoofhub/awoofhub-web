"use client";

import { useExpiringOffers } from "@/features/offers/useExpiringOffers";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { FiArrowRight } from "react-icons/fi";
import { OfferError } from "../offers/OfferError";
import OfferList from "../offers/OfferList";
import OfferListSkeleton from "../offers/OfferListSkeleton";

const START_SECONDS = 3 * 24 * 60 * 60; // 3d 0h 0m 0s = 259,200s
const RESET_SECONDS = 2 * 24 * 60 * 60 + 23 * 60 * 60 + 58 * 60; // 2d 23h 58m 0s = 259,080s

export default function ExpiringOffers() {
  const { data, isFetching, isFetched } = useExpiringOffers({
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
      <div className="py-12 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="px-4 py-2 mb-4 bg-primary flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
          <span className="flex gap-2 items-center">
            <Image src="yellowClock.svg" alt="clock" width={20} height={20} />
            <h3 className="text-xl md:text-2xl font-semibold text-white">
              Expiring soon
            </h3>
          </span>

          {/* Countdown Clock Display */}
          <div className="text-white font-baloo text-sm md:text-base lg:text-lg">
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
            <span className="text-white text-xs sm:text-sm font-bold">
              View all
            </span>
            <FiArrowRight className="text-white transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        <ErrorBoundary fallback={<OfferError />}>
          {isFetching && <OfferListSkeleton number={4} />}
          {!isFetching && allOffers.length === 0 && (
            <p className="text-gray-500">No offers available.</p>
          )}
          {isFetched && allOffers.length > 0 && <OfferList offers={allOffers} />}
        </ErrorBoundary>
      </div>
    </section>
  );
}
