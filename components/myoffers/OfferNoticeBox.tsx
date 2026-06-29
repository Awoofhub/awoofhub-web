import { Moderation } from "@/types/moderation";
import { DisplayStatus } from "@/utils/offerStatus";
import { format } from "date-fns";
import { ImSpinner2 } from "react-icons/im";

interface Props {
  status: DisplayStatus;
  moderation?: Moderation;
  isLoading: boolean;
}

export default function OfferNoticeBox({ status, moderation, isLoading }: Props) {
  if (status === "pending") {
    return (
      <div className="text-[#C29A06] text-xs md:text-sm font-semibold">
        This post is under review - usually within 24 hours.
      </div>
    );
  }

  if (status === "rejected") {
    return (
      <div className="text-red-600 text-xs md:text-sm font-semibold">
        <span className="font-semibold">Reason:</span>{" "}
        <p>
          {isLoading ? (
            <ImSpinner2 className="animate-spin" />
          ) : (
            moderation?.reason ?? "No reason provided."
          )}
        </p>
      </div>
    );
  }

  if (status === "suspended") {
    return (
      <div className="text-orange-600 text-xs md:text-sm font-semibold">
        <span className="font-semibold">Reason:</span>{" "}
        {isLoading ? (
          <ImSpinner2 className="animate-spin" />
        ) : (
          moderation?.reason ?? "This post has been suspended by our moderation team."
        )}
        {moderation?.endsAt && (
          <p className="mt-1">
            Suspension ends: {format(new Date(moderation.endsAt), "do MMM yyyy")}
          </p>
        )}
      </div>
    );
  }

  if (status === "expired") {
    return (
      <div className="text-gray-500 text-xs md:text-sm font-semibold">
        This deal has expired and is no longer visible to users.
      </div>
    );
  }

  return null;
}