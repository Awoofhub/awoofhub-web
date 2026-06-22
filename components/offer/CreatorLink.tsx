import { Offer } from "@/types/offer";
import { capitalizeFirstLetter } from "@/utils/truncate";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { FaRegUser } from "react-icons/fa6";

interface Props {
    offer: Offer;
    variant?: "top" | "card";
}

export default function CreatorLink({ offer, variant = "top" }: Props) {
    if (variant === "card") {
        return (
            <div className="flex items-center gap-6 w-full">
                <Link href={`/profile/${offer.contributor.username}`}>
                    <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold text-2xl overflow-hidden shrink-0">
                        {
                            offer.contributor.profileImageUrl ? (
                                <Image
                                    width={200}
                                    height={200}
                                    src={offer.contributor.profileImageUrl}
                                    alt={offer.contributor.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="bg-[#F7C8D5] text-[#B85B80] text-3xl font-semibold flex items-center justify-center w-full h-full">
                                    {capitalizeFirstLetter(offer.contributor.name)}
                                </div>
                            )
                        }
                    </div>
                </Link>
                <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                        <Link href={`/profile/${offer.contributor.username}`} className="font-bold text-gray-900 text-base hover:underline">
                            {offer.contributor.name}
                        </Link>
                        <span className="flex items-center gap-1 bg-[#FFF0EC] text-primary text-[10px] lg:text-xs font-semibold px-2 py-0.5 rounded-full">
                                  <FaRegUser size={12} /> Awoofer
                                </span>
                    </div>
                    <span className="text-gray-500 text-sm mb-0.5">@{offer.contributor.username}</span>
                    <span className="text-gray-400 text-xs">Awoofer since {format(new Date(offer.contributor.createdAt || "2023-01-01"), "MMMM yyyy")}</span>
                </div>
            </div>
        )
    }

    return (
        <Link href={`/profile/${offer.contributor.username}`} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold text-sm overflow-hidden">
                {
                    offer.contributor.profileImageUrl ? (
                        <Image
                            width={50}
                            height={50}
                            src={offer.contributor.profileImageUrl}
                            alt={offer.contributor.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        capitalizeFirstLetter(`${offer.contributor.name}`)
                    )
                }
            </div>
            <span className="text-orange-500 text-sm font-bold hover:underline">
                @{offer.contributor.username}
            </span>
        </Link>
    )
}
