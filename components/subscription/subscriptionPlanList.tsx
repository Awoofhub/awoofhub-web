// components/subscription-plan-list.tsx
'use client';

import { useState } from 'react';
import  SubscriptionPlanCard  from '@/components/subscription/subscriptionPlanCard';
import { SubscriptionPlanData,SubscriptionPlan } from '@/types/subscription';


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
      'No ads shown',
      'Blue checkmark',
    ],
  },
  {
    id: 'pro-plan',
    title: 'Pro Plan',
    price: 20000,
    features: [
      'Unlimited wishlist',
      'Set an alert to a deal poster',
      '30 days duration',
      'No ads shown',
      'Can send messages',
      'Blue checkmark',
    ],
  },
];

export function SubscriptionPlanList() {

  
  const [selectedId, setSelectedId] = useState<SubscriptionPlan>('growth');

  return (
    <div className="flex gap-6  justify-center items-start flex-wrap">
      {SUBSCRIPTION_PLANS.map((plan) => (
        <SubscriptionPlanCard
          key={plan.id}
          title={plan.title}
          price={plan.price}
          features={plan.features}
          recommended={plan.recommended}
          selected={selectedId=== plan.id}
          onSelect={() => setSelectedId(plan.id )}
        />
      ))}
    </div>
  );
}