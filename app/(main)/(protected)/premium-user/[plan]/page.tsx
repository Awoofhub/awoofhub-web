'use client';

import SubscriptionSuccessModal from '@/components/modals/subscription/SubscriptionSuccessModal';
import PaymentSecureNotice from '@/components/subscription/PaymentSecureNotice';
import SubscriptionCheckoutSummary from '@/components/subscription/SubscriptionCheckoutSummary';
import SubscriptionPlanBenefits from '@/components/subscription/SubscriptionPlanBenefits';
import { SUBSCRIPTION_PLANS } from '@/components/subscription/SubscriptionPlanList';
import { useSubscribe } from '@/features/subscription/useSubscribe';
import { openPayment } from '@/lib/paystack';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { use, useState } from 'react';

interface Props {
    params: Promise<{ plan: string }>;
}

export default function SubscriptionCheckoutPage({ params }: Props) {
    const { plan: planId } = use(params);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const subscribe = useSubscribe({
        onSuccess: (data) => {
            openPayment(data.accessCode, {
                onSuccess: () => {
                    setIsLoading(false);
                    setIsSuccessModalOpen(true);
                },
                onCancel: () => {
                    setIsLoading(false);
                },
            });
        },
    });

    const plan = SUBSCRIPTION_PLANS.find((p) => p.id === planId);

    if (!plan) {
        return (
            <section className="pt-14 px-4">
                <p className="text-center text-muted">Plan not found.</p>
            </section>
        );
    }

    const formattedPrice = `N${plan.price.toLocaleString()}`;

    const onSubmit = () => {
        setIsLoading(true);
        subscribe.submit({ planName: plan.id });
    };

    const handleContinue = async () => {
        await subscribe.refreshSubscription();
        setIsSuccessModalOpen(false);
        router.replace('/premium-user');
    };

    return (
        <div className="py-4 xs:py-6 px-4 md:px-6 lg:px-8 xl:px-12 max-w-[1440px] mx-auto mb-24 lg:mb-10 flex flex-col gap-6">
            <button
                type="button"
                onClick={() => router.back()}
                className="flex cursor-pointer items-center gap-1 text-sm xs:text-base font-bold hover:text-gray-700"
            >
                <ChevronLeft className="h-4 w-4" />
                Back
            </button>

            <SubscriptionCheckoutSummary
                title={plan.title}
                price={formattedPrice}
                isLoading={isLoading}
                onSubmit={onSubmit}
            />

            <SubscriptionPlanBenefits
                title={plan.title}
                features={plan.features}
                unavailableFeatures={plan.unavailableFeatures}
            />

            <PaymentSecureNotice />

            <SubscriptionSuccessModal
                plan={plan.title}
                isOpen={isSuccessModalOpen}
                onClose={handleContinue}
            />
        </div>
    );
}