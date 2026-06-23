import { Offer } from "@/types/offer";
import { CheckCircle2 } from "lucide-react";

import AlertButton from "../alert/Alert";
import Review from "../review/Review";
import CreatorLink from "./CreatorLink";

interface Props {
    offer: Offer;
}

export default function TrustSection({ offer }: Props) {
    return (
        <section className="border-t border-b border-gray-300 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-8 items-center">
            {/* Store Info */}
            <div className="md:flex md:justify-center md:flex-center ">
            <div className="flex flex-col justify-center gap-10 items-center bg-white rounded-xl py-3 shadow-md border-2 border-orange-500  ">
                <CreatorLink offer={offer} variant="card" />
                {/* AlertButton commented out to match exact UI of the reference image */}
                {/* <AlertButton contributorId={offer.contributor.id} /> */}
                 </div>
            </div>

            {/* Leave a Rating */}
            <div className="text-center md:border-x border-gray-300 xs:col-span-2 order-3 md:col-span-1 md:order-none px-4 flex flex-col items-center justify-center h-full">
                <h3 className="font-bold text-gray-800 text-lg">Leave a Rating</h3>
                <p className="text-gray-400 text-sm mb-4">Rate your experience about this offer</p>
               <Review offer={offer}/>
            </div>

            {/* Safety Tips */}
            <div className="space-y-4 flex flex-col justify-center h-full pl-0 md:pl-4">
                <h3 className="font-bold text-gray-800 text-lg">Safety Tips</h3>
                <div className="space-y-3 text-sm text-gray-600 font-medium">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                        <span>Verify deals before paying.</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                        <span>Check deal expiry dates.</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                        <span>Don’t share personal info.</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                        <span>Report suspicious listings</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                        <span>Avoid off platform deals.</span>
                    </div>
                </div>
            </div>
        </section>

    );
}