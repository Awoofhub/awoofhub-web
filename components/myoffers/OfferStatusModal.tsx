"use client";
import { Offer } from "@/types/offer";
import { getDisplayStatus } from "@/utils/offerStatus";
import { useLatestModeration } from "@/features/moderation/useLatestModeration";
import { format } from "date-fns";
import Image from "next/image";
import { FiMapPin, FiUsers, FiX } from "react-icons/fi";
import StatusBadge from "./StatusBadge";
import OfferDateLabel from "./OfferDateLabel";
import OfferNoticeBox from "./OfferNoticeBox";
import OfferActionButton from "./OfferActionButton";
import OfferDescription from "./OfferDescription";

interface Props {
  offer: Offer;
  onClose: () => void;
}

export default function OfferStatusModal({ offer, onClose }: Props) {
  const status = getDisplayStatus(offer);
  const needsModeration = status === "rejected" || status === "suspended";

  const { data: moderation, isLoading } = useLatestModeration(
    { id: offer.id },
    needsModeration,
  );

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute cursor-pointer -top-10 -right-1 xs:-top-8 xs:-right-8 z-10 bg-white p-1.5 rounded-full shadow-md hover:bg-gray-50"
        >
          <FiX size={16} />
        </button>

        <div
          className="bg-white rounded-xl w-[90vw] xs:w-[500px] lg:w-[600px] max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-full h-[240px] xxs:h-[260px] xs:h-[270px] md:h-[300px] lg:h-[320px]">
            <Image
              src={offer.imageUrl}
              alt={offer.title}
              fill
              className={`object-fill p-3 ${
                status === "pending" ||
                status === "suspended" ||
                status === "expired"
                  ? "opacity-60"
                  : ""
              }`}
            />
          </div>

          <div className="p-5">
            <div className="flex items-center justify-between mb-2">
              <StatusBadge status={status} />
              {["active", "expired", "pending"].includes(status) && (
                <div className="flex items-center justify-center gap-1 md:gap-2">
                  <FiUsers size={12} className="text-primary/60 w-2.5 md:w-3" />
                  <span className="font-baloo text-[10px] md:text-sm lg:text-base font-medium text-muted/80">
                    {offer.clickCount} grabs
                  </span>
                </div>
              )}
            </div>

            <h3 className="font-semibold text-sm md:text-xl text-black mb-1">
              {offer.title}
            </h3>

            <p className="text-[10px] md:text-sm font-medium text-primary">
              {offer.category.name} | {offer.brandName}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-muted text-[10px] md:text-xs">
                Submitted: {format(new Date(offer.createdAt), "do MMM yyyy")}
              </span>
              <span className="text-xs md:text-sm font-baloo bg-[#EA4B48]/10 text-primary font-semibold px-4 py-1 rounded-full">
                {offer.value}
              </span>
            </div>

            <div className="flex items-center gap-1 text-muted">
              <FiMapPin size={10} />
              <span className="text-[8px]">{offer.location}</span>
            </div>

            <hr className="mt-2 mb-1 text-[#E6E6E6]" />

            <h4 className="text-xs font-semibold text-gray-800 mb-1">
              Details
            </h4>

            <OfferDescription description={offer.description} />

            <OfferDateLabel offer={offer} status={status} />

            <OfferNoticeBox
              status={status}
              moderation={moderation}
              isLoading={isLoading}
            />

            <div className="mt-4">
              <OfferActionButton offer={offer} status={status} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
