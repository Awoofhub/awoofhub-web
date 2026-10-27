import { Button } from "@/components/button/Button";
import BoostPaymentSuccessModal from "@/components/modals/boost/BoostPaymentSuccessModal";
import { useBoostOffer } from "@/features/boost/useBoostOffer";
import { openPayment } from "@/lib/paystack";
import { useState } from "react";
import BoostPlanCard from "./BoostPlanCard";

const packages = [
    {
        id: 'standard',
        name: 'Standard',
        price: 5000,
        duration: '14 days',
        description: 'Great for trying out',
        features: [
            '14 days duration',
            'Boost your visibility',
            'Basic targeting'
        ]
    },
    {
        id: 'turbo',
        name: 'Turbo',
        price: 10000,
        duration: '1 month',
        description: 'More reach, better results',
        features: [
            '14 days duration',
            'Boost your visibility',
            'Advanced targeting'
        ]
    },
    {
        id: 'apex',
        name: 'Apex',
        price: 20000,
        duration: '3 months',
        description: 'Maximum visibility',
        features: [
            '3 months duration',
            'Boost your visibility',
            'Advanced targeting + priority support'
        ]
    }
];


interface Props {
    offerId: string;
}

export default function BoostPlanList({ offerId }: Props) {

    const [selectedId, setSelectedId] = useState('standard');
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const boostOffer = useBoostOffer({
        id: offerId,
        onSuccess: (data) => {
            const accessCode = data.accessCode;

            openPayment(accessCode, {
                onSuccess: () => {
                    setIsPaymentModalOpen(true)
                },
            });
        }
    });

    const selectedPackage = packages.find((pkg) => pkg.id === selectedId);

    const formattedPrice = selectedPackage ? `₦${selectedPackage.price.toLocaleString()}` : '₦0';

    const onSubmit = () => {
        boostOffer.submit({ packageType: selectedId });
    };

    return (
        <>
            <div className="mt-1">
                <h1 className="text-xl font-semibold leading-tight text-black">
                    Choose a promotion package <span className="text-primary">*</span>
                </h1>
                <p className="text-sm md:text-base leading-tight text-muted">
                    Packages are designed to help you reach more people
                </p>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3">
                {packages.map((pkg) => (
                    <BoostPlanCard
                        key={pkg.id}
                        name={pkg.name}
                        price={`₦${pkg.price.toLocaleString()}`}
                        description={pkg.description}
                        features={pkg.features}
                        selected={selectedId === pkg.id}
                        onSelect={() => setSelectedId(pkg.id)}
                    />
                ))}
            </div>
            <hr className="text-muted/30" />

            <div className="bg-[#D9D9D966] flex flex-col xs:flex-row xs:items-center justify-between rounded-xl">
                <div className="p-5">
                    <span className="block text-xl font-baloo font-semibold leading-tight text-gray-900">
                        {selectedPackage?.name} package
                    </span>
                    <span className="block text-sm lg:text-base leading-tight text-muted">
                        {selectedPackage?.description}
                    </span>
                </div>

                <div className="bg-white p-5 flex items-center justify-between gap-6 rounded-b-lg xs:rounded-lg">
                    <div>
                        <span className="text-sm lg:text-base text-muted block">
                            Total for {selectedPackage?.duration}:
                        </span>
                        <span className="text-xl font-baloo font-bold text-gray-900">
                            {formattedPrice}
                        </span>
                    </div>

                    <Button
                        isLoading={boostOffer.isPending}
                        onClick={onSubmit}
                        isDisabled={boostOffer.isPending}
                        className="!w-[150px] md:!w-[140px] lg:!w-[200px] !mx-0 text-sm"
                    >
                        Continue to pay
                    </Button>
                </div>
            </div>
            <hr className="text-muted/30" />

            <BoostPaymentSuccessModal offerId={offerId} isOpen={isPaymentModalOpen} price={formattedPrice} />
        </>

    )
}