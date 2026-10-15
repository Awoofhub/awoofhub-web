import { Offer } from "@/types/offer";
import { getDisplayStatus } from "@/utils/offerStatus";
import { useRouter } from 'next/navigation';

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

    return status === "active" ? (
        <button onClick={handleClick} className="border border-primary font-semibold text-[10px] xs:text-xs lg:text-sm md:px-2.5 xs:px-2 px-1.5 xs:py-1 py-0.5 text-primary rounded-full cursor-pointer">
            Boost Post
        </button>
    ) : null;

}
