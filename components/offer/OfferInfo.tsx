import { Offer } from "@/types/offer";
import Rating from "@mui/material/Rating";
import { MapPin } from "lucide-react";

interface Props {
    offer: Offer;
}

export default function OfferInfo({ offer }: Props) {
    return (
        <>
            <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-red-500 text-xl font-bold">
                        Free!
                    </span>
                    <h1 className="text-2xl xs:text-3xl md:text-3xl font-bold text-gray-900 leading-tight">
                        {offer.title}
                    </h1>
                   
                </div>
            </div>

            <section className="flex flex-col gap-3 mb-2">
                <div className="flex items-center">
                    <Rating
                        name="readonly"
                        className="ml-[-3px]"
                        size="medium"
                        precision={0.1}
                        value={offer.avgRating}
                        readOnly
                        sx={{
                            '& .MuiRating-icon': {
                                marginRight: '-3px',
                            },
                            '& .MuiRating-iconFilled': {
                                color: '#FFC000',
                            },
                            '& .MuiRating-iconEmpty': {
                                color: '#ccc',
                            },
                        }}
                    />
                    <span className="text-gray-500 text-base ml-2 font-medium">({offer.reviewCount}+ reviews)</span>
                </div>
                <div className="flex items-center text-gray-500 text-base gap-4">
                    <div className="flex items-center gap-1">
                        <MapPin size={18} /> {offer.location}
                    </div>
                </div>
            </section>
                                <span className="border-b border-gray-300 w-full mb-2"/>


            <section className="text-base leading-relaxed text-gray-600 mb-2">
                <h3 className="text-gray-900 mb-2 text-base font-bold">Details</h3>
                <p className="mb-4 break-all text-gray-500">
                   {offer.description}
                </p>

                {offer.value && (
                    <div className="inline-block bg-red-50 text-orange-500 text-sm font-bold px-4 py-2 rounded-full mb-4 mt-2">
                        {offer.value}
                    </div>
                )}
            </section>
        </>
    )
}