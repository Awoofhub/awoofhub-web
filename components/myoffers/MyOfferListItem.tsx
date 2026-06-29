import { Offer } from "@/types/offer";
import { getDisplayStatus, DisplayStatus } from "@/utils/offerStatus";
import { format } from "date-fns";
import Image from "next/image";
import { FiUsers, FiMapPin, FiArrowUpRight } from "react-icons/fi";
import StatusBadge from "./StatusBadge";
import { truncateId } from "@/utils/truncate";

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
      className={`w-full flex flex-col xs:flex-row gap-3 md:gap-4 p-2 md:px-6 md:py-3 items-start md:items-center rounded-lg cursor-pointer border ${
        isActive ? "border border-[#00A95D]" : "border-gray-100 border-2"
      } hover:shadow-md transition-shadow text-left bg-white`}
    >
      <div className="w-full h-[130px] xxs:h-[150px] xs:w-[110px] xs:h-[110px] md:w-[130px] md:h-[130px] lg:w-[150px] lg:h-[150px] shrink-0 overflow-hidden rounded-md">
        <Image
          src={offer.imageUrl}
          alt={offer.title}
          width={200}
          height={200}
          className="w-full h-full object-fill"
        />
      </div>

      <div className="flex-1 min-w-0 w-full">
        <div className="flex items-center gap-2 mb-1">
          <StatusBadge status={status} />
        </div>
        <h4 className="font-semibold text-black text-xs md:text-lg lg:text-xl mt-1 md:mt-2 line-clamp-1">
          {offer.title}
        </h4>
        <p className="mt-1 text-primary md:text-black  font-medium text-[10px] md:text-sm md:mt-2 lg:mt-4 truncate">
          {offer.category.name} | {offer.brandName}
        </p>
        <div className="flex items-center gap-1 text-muted text-[10px] md:text-xs mt-1">
          <FiMapPin size={11} />
          <span className="xxs:hidden">{truncateId(offer.location, 15)}</span>
          <span className="hidden xxs:inline xs:hidden">{truncateId(offer.location, 30)}</span>
          <span className="hidden xs:inline md:hidden">{truncateId(offer.location, 40)}</span>
          <span className="hidden md:inline">{offer.location}</span>
        </div>
        <div className="md:mt-2 flex flex-wrap justify-between items-center gap-1">
          <p className="text-muted text-[10px] md:text-xs">{dateLabel}</p>
          <div className="flex items-center w-full md:w-22 justify-between gap-2">
            <div className="flex items-center gap-1">
              <FiUsers size={12} />
              <span className="text-[8px] md:text-xs">
                {offer.clickCount} grabs
              </span>
            </div>
            <FiArrowUpRight color="#FE4F04" size={16} />
          </div>
        </div>
      </div>
    </button>
  );
}
