"use client"
import { Offer } from "@/types/offer";
import Rating from "@mui/material/Rating";

interface Props {
    offer: Offer;
}

export default function ReviewChart({ offer }: Props) {
    const { ratingDistribution, avgRating, reviewCount } = offer;
    const starRatings = [5, 4, 3, 2, 1];
    const chartData = starRatings.map((star) => {
        const count = ratingDistribution[String(star) as keyof typeof ratingDistribution] || 0;
        const percentage = reviewCount > 0 ? (count / reviewCount) * 100 : 0;





        return {
            rating: `${star} star`,
            count,
            percentage: Math.round(percentage),
        };
    });

    return (
        <div className="max-w-[320px] xxs:max-w-[380px]  mx-auto md:mx-0">
            {/* Header Section */}
            <div>
                <h2 className="text-lg lg:text-xl  font-bold mb-1 text-muted">All Rating</h2>
                <div className="flex items-center gap-2">
                    <div className="flex ml-[-5px] text-orange-400">
                        <Rating
                            name="readonly"
                            value={offer.avgRating}
                            precision={0.1}
                            readOnly
                            sx={{
                                '& .MuiRating-icon': {
                                    marginRight: '-7px',
                                },
                                '& .MuiRating-iconFilled': {
                                    color: '#FFC000',
                                },
                                '& .MuiRating-iconEmpty': {
                                    color: '#ccc',
                                },
                            }}
                        />
                    </div>
                    <span className="font-semibold text-xs text-black">{avgRating} out of 5</span>
                </div>
                <p className="text-sm text-gray-500 mt-1 ">
                   <span className="font-bold text-gray-950">{reviewCount.toLocaleString()}</span>  total global rating
                </p>
            </div>

            <div className="mt-6 space-y-3">
                {chartData.map((item) => (
                    <div key={item.rating} className="space-y-2">
                        <div className="flex items-center justify-start gap-2 text-xs font-medium text-gray-700">
                            <span className="w-1/7 md:w-1/5 xl:w-1/8">{item.rating}</span>
                             <div className=" rounded bg-gray-200 overflow-hidden h-[2.2em] w-full box-border border-2 border-gray-300">
                            <div
                                className="h-full rounded bg-[#FFA41C] transition-all duration-300 ease-in-out"
                                style={{ width: `${item.percentage}%` }}
                            />
                        </div>
                            <span>{item.percentage}%</span>
                        </div>
                       
                    </div>
                ))}
            </div>
        </div>
    );
}






