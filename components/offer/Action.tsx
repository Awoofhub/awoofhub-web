import { useState } from 'react';
import Image from 'next/image';
import { useGrabOffer } from '@/features/offers/useGrabOffer';
import { Offer } from '@/types/offer';
import { formatDate } from '@/utils/formatDate';
import { FiCopy } from "react-icons/fi";
import { IoCheckmarkSharp } from "react-icons/io5";


interface Props {
    offer: Offer;
}

export default function Action({ offer }: Props) {
    const [copied, setCopied] = useState(false);
    const grab = useGrabOffer({ id: offer.id });
    // Determine trending from click count (same source used elsewhere)
    const isTrending = (offer.clickCount ?? 0) >= 1;

    const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        grab.grabOffer();
        window.open(offer.externalLink, "_blank", "noopener,noreferrer");
    };

    const handleCopyCoupon = async () => {
        if (!offer.couponCode) return;

        await navigator.clipboard.writeText(offer.couponCode);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col py-2 mt-2 mb-3">
            <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-2 text-base">
                    <span className="font-bold text-green-600">Expiry:</span>
                    <span className="font-bold text-green-600">{formatDate(offer.endDate)}</span>
                </div>
                {isTrending && (
                    <div className="flex items-center gap-2 bg-red-50 text-red-500 px-4 py-2 rounded-full text-sm font-bold border border-red-100 ml-2">
                        <Image src="/flame.svg" alt="trending" width={16} height={16} className="w-4 h-4" />
                        <span>Trending</span>
                    </div>
                )}
            </div>

            <div className="flex flex-row gap-1">

            <a
                href={offer.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClick}
                className="w-full cursor-pointer flex justify-center items-center bg-[#FE4F04] text-white font-bold py-2 px-8 rounded-md transition-colors text-lg"
                >
                Grab this Deal
            </a>
             {offer.dealType === 'promo_code' && offer.couponCode && ( 

            <div className="w-[40%] flex-row gap-2 flex justify-center items-center font-bold rounded-md transition-colors text-lg">

            <div className= "bg-green-200 text-black font-bold text-center py-2 px-4 rounded-md w-[70%]">
            <p className="mt-1 text-md tracking-[0.1em] font-bold uppercase">{offer.couponCode}</p>

            </div>
            <button  type="button"
                onClick={handleCopyCoupon} 
                className="text-green-600 cursor-pointer text-3xl text-center">
                {copied ? <IoCheckmarkSharp /> : <FiCopy />}
            </button>
            </div>


              )}
                </div>
        </div>
    );
}