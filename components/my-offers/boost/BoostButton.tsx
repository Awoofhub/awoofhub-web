import { Offer } from "@/types/offer";
import { getDisplayStatus } from "@/utils/offerStatus";
import { useRouter } from 'next/navigation';
import { PiRocketLaunchBold } from "react-icons/pi";

interface Props {
    offer: Offer;
}

export default function BoostButton({ offer }: Props) {
    const router = useRouter();
    const status = getDisplayStatus(offer);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        router.push(`/my-offers/boost/${offer.id}`)
    };

    if (offer.isBoosted) {
        return (
            <span className="bg-[#F3E8FF] border font-semibold border-[#7C3AED] text-[10px] xs:text-xs lg:text-sm md:px-2.5 xs:px-2 px-1.5 xs:py-1 py-0.5 text-[#7C3AED] rounded-full flex items-center gap-1">
                <PiRocketLaunchBold size={16} className="w-3 xs:w-3.5 lg:w-4" /> Boosted
            </span>
        );
    }


    return status === "active" ? (
        <button onClick={handleClick} className="border border-primary font-semibold text-[10px] xs:text-xs lg:text-sm md:px-2.5 xs:px-2 px-1.5 xs:py-1 py-0.5 text-primary rounded-full cursor-pointer">
            Boost Post
        </button>
    ) : null;

}
