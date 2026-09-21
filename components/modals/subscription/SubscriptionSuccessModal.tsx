import Image from "next/image";

interface Props {
    plan: string
    isOpen: boolean;
    onClose: () => void;
}

export default function SubscriptionSuccessModal({ plan, isOpen, onClose }: Props) {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-xl w-[90vw] xs:w-[500px] lg:w-[600px] p-6 flex flex-col items-center text-center">
                <Image
                    src="/EditSuccess.svg"
                    alt="success-img"
                    priority
                    unoptimized
                    width={150}
                    height={150}
                    className="mb-2"
                />
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                    Payment successful!
                </h2>
                <p className="text-muted text-sm md:text-lg mb-6">
                    {`Your premium subscription for the ${plan} package has  been activated.`}
                </p>
                <button onClick={onClose}  className="text-center text-xs md:text-sm lg:text-base font-baloo text-primary py-1 px-3 rounded-md font-bold hover:bg-primary/10 border border-primary cursor-pointer">
                    Continue
                </button>
            </div>
        </div>
    );
}
