import { Offer } from "@/types/offer";
import { DisplayStatus } from "@/utils/offerStatus";
import { format } from "date-fns";

interface Props {
  offer: Offer;
  status: DisplayStatus;
}

export default function OfferDateLabel({ offer, status }: Props) {
  if (status === "active") {
    return (
      <p className="flex items-center justify-between md:justify-start gap-4 text-xs mb-3">
        <span className="text-[#006400] font-semibold">
          Live since: {format(new Date(offer.createdAt), "d/M/yyyy")}
        </span>
        <span className="text-[#CCCCCC] font-semibold"> | </span>
        <span className="text-[#006400] font-semibold">
          Expires: {format(new Date(offer.endDate), "d/M/yyyy")}
        </span>
      </p>
    );
  }

  if (status === "expired") {
    return (
      <p className="text-xs mb-3">
        <span className="text-[#006400] font-semibold">
          Was live: {format(new Date(offer.createdAt), "d/M/yyyy")} –{" "}
          {format(new Date(offer.endDate), "d/M/yyyy")}
        </span>
      </p>
    );
  }

  return null;
}