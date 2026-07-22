import { Offer } from "@/types/offer";
import { CheckCircle2 } from "lucide-react";
import Review from "../review/Review";
import CreatorLink from "./CreatorLink";

interface Props {
  offer: Offer;
}

const safetyTips = [
  "Verify deals before paying.",
  "Check deal expiry dates.",
  "Don't share personal info.",
  "Report suspicious listings.",
  "Avoid off platform deals.",
];

export default function TrustSection({ offer }: Props) {
  return (
    <section className="border-t xs:border-b border-muted/20 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-8 py-8 items-center">
      {/* Store Info */}
      <div className="">
        <div className="flex flex-col justify-center gap-10 items-center bg-white rounded-2xl py-3 shadow-md border-2 border-orange-500  ">
          <CreatorLink offer={offer} variant="card" />
        </div>
      </div>

      <div className="text-center md:border-x border-muted/20  order-3 col-span-1 md:order-none px-2 lg:px-3 flex flex-col items-center justify-center">
        <h3 className="font-bold text-black mb-1 text-lg lg:text-xl">Leave a Rating</h3>
        <p className="text-muted text-xs lg:text-sm mb-2">
          Rate your experience about this offer
        </p>
        <Review offer={offer} />
      </div>

      {/* Safety Tips */}
      <div className="space-y-2 border-b border-muted/20 xs:border-b-0 pb-3 md:pb-0 flex flex-col justify-center h-full pl-0 lg:pl-4">
        <h3 className="font-semibold text-black ml-3 text-lg lg:text-xl">Safety Tips</h3>
        <div className="space-y-2 text-xs lg:text-sm text-muted ">
         {safetyTips.map((tip, id) => (
            <div key={id} className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#2CAB2C] shrink-0" />
              <span >{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
