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
        <button onClick={handleClick} className="border border-primary text-xs sm:text-sm p-1 text-primary rounded-lg cursor-pointer">
            Boost Post
        </button>
    ) : null;

}
