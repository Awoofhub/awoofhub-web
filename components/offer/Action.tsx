import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useGrabOffer } from '@/features/offers/useGrabOffer';
import { Offer } from '@/types/offer';
import { formatDate } from '@/utils/formatDate';
import { FiCopy } from "react-icons/fi";
import { IoCheckmarkSharp } from "react-icons/io5";
import { differenceInSeconds, parseISO } from 'date-fns';
import { IoAlarmOutline } from "react-icons/io5";


interface Props {
    offer: Offer;
}

function formatCountdown(seconds: number) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    return `${days}d ${hours}h ${minutes}m`;
}

export default function Action({ offer }: Props) {
    const [copied, setCopied] = useState(false);
    const grab = useGrabOffer({ id: offer.id });
    // Determine trending from click count (same source used elsewhere)
    const isTrending = (offer.clickCount ?? 0) >= 1;

    const totalSeconds = Math.max(0, differenceInSeconds(parseISO(offer.endDate), new Date()));
    const isExpiring = totalSeconds >= 0 && totalSeconds <= 259200; // 3 days in seconds

    const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
    const [prevTotalSeconds, setPrevTotalSeconds] = useState(totalSeconds);

    // Sync prop changes during render
    if (totalSeconds !== prevTotalSeconds) {
        setPrevTotalSeconds(totalSeconds);
        setSecondsLeft(totalSeconds);
    }

    useEffect(() => {
        if (!isExpiring) return;
        if (secondsLeft <= 0) return;

        const timer = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 1) { clearInterval(timer); return 0; }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isExpiring, secondsLeft]);

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
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2 text-base">
                    {isExpiring ? (
                        <div className="flex items-center gap-1 text-red-600 font-bold">
                            Expiring:
                        <Image src="/clockk.svg" alt="trending" width={16} height={16} className="w-4 h-4 ml-0.5" />

                            <span>{formatCountdown(secondsLeft)}</span>
                        </div>
                    ) : (
                        <>
                            <span className="font-bold text-green-600">Expiry:</span>
                            <span className="font-bold text-green-600">{formatDate(offer.endDate)}</span>
                        </>
                    )}
                </div>
                {isTrending && (
                    <div className="flex items-center gap- text-red-500 px-4 py-2 text-base font-bold  ml-2">
                        <Image src="/flame.svg" alt="trending" width={16} height={16} className="w-4 h-4" />
                        <span className='text-[#FE4F04]'>Trending</span>
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

            <div className="w-[40%] flex-row gap-2 flex justify-center items-center font-bold rounded-md transition-colors text-lg" 
            
            >

            <button className= "bg-green-200 text-black cursor-pointer font-bold text-center py-2 px-4 rounded-md w-[70%]" 
            type="button" onClick={handleCopyCoupon}
            >
            {offer.couponCode}

            </button>
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