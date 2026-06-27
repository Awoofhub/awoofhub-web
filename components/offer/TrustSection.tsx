import { Offer } from "@/types/offer";
import { CheckCircle2 } from "lucide-react";
import Review from "../review/Review";
import CreatorLink from "./CreatorLink";

interface Props {
  offer: Offer;
}

export default function TrustSection({ offer }: Props) {
  return (
    <section className="border-t md:border-b border-muted/20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8 items-center">
      {/* Store Info */}
      <div className="md:flex md:justify-center md:flex-center ">
        <div className="max-w-[450px] mx-auto md:mx-0 flex flex-col justify-center gap-10 items-center bg-white rounded-2xl py-3 shadow-md border-2 border-orange-500  ">
          <CreatorLink offer={offer} variant="card" />
        </div>
      </div>

      <div className="text-center md:border-x border-muted/20  order-3 md:col-span-1 md:border-none px-4 flex flex-col items-center justify-center h-full">
        <h3 className="font-bold text-black text-lg">Leave a Rating</h3>
        <p className="text-muted text-sm mb-2">
          Rate your experience about this offer
        </p>
        <Review offer={offer} />
      </div>

      {/* Safety Tips */}
      <div className="space-y-4 border-b border-muted/20 md:border-b-0 pb-3 md:pb-0 flex flex-col justify-center h-full pl-0 md:pl-4">
        <h3 className="font-semibold text-black text-base md:text-lg">Safety Tips</h3>
        <div className="space-y-3 text-sm text-muted ">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-[#2CAB2C] shrink-0" />
            <span>Verify deals before paying.</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-[#2CAB2C] shrink-0" />
            <span>Check deal expiry dates.</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-[#2CAB2C] shrink-0" />
            <span>Don’t share personal info.</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-[#2CAB2C] shrink-0" />
            <span>Report suspicious listings</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-[#2CAB2C] shrink-0" />
            <span>Avoid off platform deals.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
