'use client';

import { SubscriptionPlan, SubscriptionPlanData } from '@/types/subscription';
import { useState } from 'react';
import SubscriptionPlanCard from './SubscriptionPlanCard';
 

export const SUBSCRIPTION_PLANS: SubscriptionPlanData[] = [
  {
    id: 'starter',
    title: 'Starter',
    price: 5000,
    features: [
      'Up to 100 wishlist slots',
      'Set an alert to a deal poster',
      '30 days duration',
    ],
  },
  {
    id: 'growth',
    title: 'Growth',
    price: 10000,
    recommended: true,
    features: [
      'Up to 1,000 wishlist slots',
      'Set an alert to a deal poster',
      '30 days duration',
      'Blue checkmark',
    ],
  },
  {
    id: 'pro',
    title: 'Pro Plan',
    price: 20000,
    features: [
      'Unlimited wishlist',
      'Set an alert to a deal poster',
      '30 days duration',
      'Blue checkmark',
      'Can send messages',
    ],
  },
];

export function SubscriptionPlanList() {

  const [selectedId, setSelectedId] = useState<SubscriptionPlan>('growth');
  const [loadingId, setLoadingId] = useState<string | null>(null);

  return (
    <div>
      <div className="text-center mt-4 mb-6 gap-2">
        <h1 className="text-[20px] md:text-[40px] font-bold text-[#281812]">
          Choose a premium subscription
        </h1>
        <p className="text-sm md:text-[18px] text-gray-400">
          Packages are designed to help you reach more people
        </p>
      </div>
      <div className="flex gap-6 justify-center items-start flex-wrap">
        {SUBSCRIPTION_PLANS.map((plan) => (
          <SubscriptionPlanCard
            key={plan.id}
            id={plan.id}
            title={plan.title}
            price={plan.price}
            features={plan.features}
            recommended={plan.recommended}
            selected={selectedId === plan.id}
            onSelect={() => setSelectedId(plan.id)}
            isGlobalPending={loadingId !== null}
            isThisCardLoading={loadingId === plan.id}
            onLoadingChange={(isLoading) => setLoadingId(isLoading ? plan.id : null)}
          />
        ))}
      </div>
    </div>
  );
}