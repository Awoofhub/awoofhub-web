'use client';

import { SubscriptionPlan, SubscriptionPlanConfig } from '@/types/subscription';
import { useState } from 'react';
import SubscriptionPlanCard from './SubscriptionPlanCard';


export const SUBSCRIPTION_PLANS: SubscriptionPlanConfig[] = [
  {
    id: 'starter',
    title: 'Starter',
    price: 5000,
    description: 'Get the basic premium features. Packages are designed to help you reach more people',
    features: [
      {
        name: 'Up to 100 wishlist slots',
        description: 'Save up to 100 items to your wishlist at any given time.'
      },
      {
        name: 'Set an alert to deal posters',
        description: 'Get instant notifications whenever new deal posters are published.'
      },
      {
        name: '30 days duration',
        description: 'Your plan benefits stay active for a full 30 days from purchase.'
      },
    ],
    unavailableFeatures: [
      'Blue check mark',
      'No ads shown',
      'Open direct messages (DMs)',
    ],
  },
  {
    id: 'growth',
    title: 'Growth',
    price: 10000,
    recommended: true,
    description: 'More reach, better results. Packages are designed to help you reach more people',
    features: [
      {
        name: 'Up to 1,000 wishlist slots',
        description: 'Expand your saved items limit to keep track of up to 1,000 favorites.',
      },
      {
        name: 'Set an alert to deal posters',
        description: 'Get notified instantly when your favorite deal posters drop new content.',
      },
      {
        name: '30 days duration',
        description: 'Enjoy your premium benefits for a full 30 days before renewal.',
      },
      {
        name: 'Blue check mark',
        description: 'Stand out with a verified badge next to your profile name.',
      },
      {
        name: 'No ads shown',
        description: 'Browse and shop without any interruptions or advertisements.',
      },
    ],
    unavailableFeatures: [
      'Open direct messages (DMs)',
    ],
  },
  {
    id: 'pro',
    title: 'Professional',
    price: 20000,
    description: 'Get full access to all creators tools. Packages are designed to help you reach more people',
    features: [
      {
        name: 'Unlimited wishlist',
        description: 'Save as many items as you want to your wishlist without any restrictions.',
      },
      {
        name: 'Set an alert to deal posters',
        description: 'Get instant notifications whenever your favorite deal posters publish new offers.',
      },
      {
        name: '30 days duration',
        description: 'Your premium benefits stay active for a full 30 days from purchase.',
      },
      {
        name: 'Blue check mark',
        description: 'Get a verified check mark on your profile to build trust with buyers and sellers.',
      },
      {
        name: 'No ads shown',
        description: 'Enjoy a seamless, ad-free browsing experience across the platform.',
      },
      {
        name: 'Open direct messages (DMs)',
        description: 'Send and receive direct messages with anyone on the platform without restrictions.',
      },
    ],
  },
];

export function SubscriptionPlanList() {

  const [selectedId, setSelectedId] = useState<SubscriptionPlan>('growth');

  return (
    <div>
      <div className="bg-[#D9D9D9]/20 rounded-lg p-4 md:p-6 lg:p-8 mt-4 mb-4 xs:mb-6 lg:mb-10">
        <h2 className="text-xl xs:text-2xl lg:text-3xl  font-semibold text-black">
          Why <span className="text-primary">Premium subscription?</span>
        </h2>
        <p className="text-sm xs:text-lg lg:text-xl text-gray-900 mt-1">
          Premium members gets exclusive features built to help you grow faster and connect deeper.
        </p>
      </div>

      <div className="text-center mb-4 xs:mb-6 lg:mb-10">
        <h1 className="text-xl xs:text-2xl lg:text-3xl font-semibold text-gray-900">
          Our Pricing Plans
        </h1>
        <p className="text-sm xs:text-lg lg:text-xl text-muted max-w-3xl xs:px-6 lg:px-0 mx-auto mt-1">
          Simple, transparent pricing designed for every one. Packages are designed to help you reach more people
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-2">
        {SUBSCRIPTION_PLANS.map((plan) => (
          <SubscriptionPlanCard
            key={plan.id}
            id={plan.id}
            title={plan.title}
            description={plan.description}
            price={plan.price}
            features={plan.features}
            unavailableFeatures={plan.unavailableFeatures}
            recommended={plan.recommended}
            selected={selectedId === plan.id}
            onSelect={() => setSelectedId(plan.id)}
            selectLabel={`Get ${plan.id.toUpperCase()} Plan`}
          />
        ))}
      </div>
    </div>
  );
}