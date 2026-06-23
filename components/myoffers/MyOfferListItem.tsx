import { Offer } from "@/types/offer";
import { getDisplayStatus, DisplayStatus } from "@/utils/offerStatus";
import { format } from "date-fns";
import Image from "next/image";
import { FiUsers, FiMapPin, FiArrowUpRight } from "react-icons/fi";
import StatusBadge from "./StatusBadge";

interface Props {
  offer: Offer;
  onClick: () => void;
}

function getDateLabel(offer: Offer, status: DisplayStatus) {
  if (status === "active") {
    return `Live since: ${format(new Date(offer.createdAt), "do MMM yyyy")}`;
  }
  if (status === "expired") {
    return `Was live: ${format(new Date(offer.createdAt), "do MMM yyyy")} - ${format(new Date(offer.endDate), "do MMM yyyy")}`;
  }
  return `Submitted: ${format(new Date(offer.createdAt), "do MMM yyyy")}`;
}

export default function MyOfferListItem({ offer, onClick }: Props) {
  const status = getDisplayStatus(offer);
  const dateLabel = getDateLabel(offer, status);
  const isActive = status === "active";

  return (
    <button
      onClick={onClick}
      className={`w-full flex gap-4 px-3 py-3 items-center lg:px-6 lg:py-3 rounded-lg cursor-pointer border ${
        isActive ? "border-1 border-[#00A95D]" : "border-gray-100"
      } hover:shadow-md transition-shadow text-left bg-white`}
    >
      <div className="w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] shrink-0 overflow-hidden">
        <Image
          src={offer.imageUrl}
          alt={offer.title}
          width={200}
          height={200}
          className="w-full h-full object-fill"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <StatusBadge status={status} />
        </div>
        <h4 className="font-semibold text-black text-lg lg:text-xl mt-2 line-clamp-1">
          {offer.title}
        </h4>
        <p className="text-black font-medium text-sm lg:mt-4">
          {offer.category.name} | {offer.brandName}
        </p>
        <div className="flex items-center gap-1 text-muted text-xs mt-1">
          <FiMapPin size={11} />
          <span>{offer.location}</span>
        </div>
        <div className="mt-2 flex justify-between items-center">
          <p className="text-muted text-xs">{dateLabel}</p>
          <div className="flex items-center justify-center gap-2">
            <FiUsers size={12} />
            <span className="text-[12px]">{offer.clickCount} grabs</span>
            <FiArrowUpRight color="#FE4F04" size={16} />
          </div>
        </div>
      </div>
    </button>
  );
}
