import { Button } from "@/components/button/Button";
import { useBoostOffer } from "@/features/boost/useBoostOffer";
import { openPayment } from "@/lib/paystack";
import { useState } from "react";
import BoostPlanCard from "./BoostPlanCard";

const packages = [
    {
        id: 'standard',
        name: 'Standard',
        price: 5000,
        description: 'Great for trying out',
        features: [
            '2 weeks duration',
            '7 days duration',
            'Basic targeting'
        ]
    },
    {
        id: 'turbo',
        name: 'Turbo',
        price: 10000,
        description: 'More reach, better results',
        features: [
            '1 month duration',
            '14 days duration',
            'Advanced targeting'
        ]
    },
    {
        id: 'apex',
        name: 'Apex',
        price: 20000,
        description: 'Maximum visibility',
        features: [
            '30,000 - 50,000 impressions',
            '3 month duration',
            'Advanced targeting + priority support'
        ]
    }
];


interface Props {
    offerId: string;
}

export default function BoostPlanList({ offerId }: Props) {

    const [selectedId, setSelectedId] = useState('standard');
    const boostOffer = useBoostOffer({
        id: offerId,
        onSuccess: (data) => {
            const accessCode = data.accessCode;

            openPayment(accessCode, {
                onSuccess: () => {
                    alert('Payment successful');
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
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

            <div className="bg-gray-100 p-4 flex items-center justify-between gap-4">
                <div>
                    <span className="text-xs text-gray-500 block">Total to pay:</span>
                    <span className="text-lg font-bold text-gray-900">
                        {formattedPrice}
                    </span>
                </div>

                <Button isLoading={boostOffer.isPending} onClick={onSubmit} isDisabled={boostOffer.isPending} className="!w-[280px] !mx-0 text-sm">
                    Continue
                </Button>
            </div>
        </>

    )
}