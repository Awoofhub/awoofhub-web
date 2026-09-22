import Image from "next/image";
import Link from "next/link";

interface Props {
    price: string;
    isOpen: boolean;
    offerId: string;
}

export default function BoostPaymentSuccessModal({ price, isOpen, offerId }: Props) {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-xl w-[90vw] xs:w-[500px] lg:w-[600px] p-6 flex flex-col items-center text-center">
                <Image
                    src="/EditSuccess.svg"
                    alt="success-img"
                    unoptimized
                    width={150}
                    height={150}
                    className="mb-2"
                />
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                    Payment successful!
                </h2>
                <p className="text-muted text-sm md:text-lg mb-6">
                    {`Your payment of ${price} was successful Your promotion is now live and running`}
                </p>
                <div className="flex items-center gap-3 w-full">
                    <Link
                        href={"/my-offers?tab=boosted"}
                        className="w-full block text-center text-xs md:text-sm lg:text-base font-baloo text-primary py-2 rounded-md font-semibold hover:bg-primary/10 border border-primary cursor-pointer"
                    >
                        Back to My Offers
                    </Link>

                    <Link
                        href={`/my-offers/boost/${offerId}/analytics`}
                        className="w-full block text-center text-xs md:text-sm lg:text-base font-baloo bg-primary text-white py-2 rounded-md font-semibold hover:bg-orange-700 transition-colors border border-primary cursor-pointer"
                    >
                        View Promotion Performance
                    </Link>
                </div>

            </div>
        </div>
    );
}
