'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { SubscriptionPlanList } from '@/components/subscription/subscriptionPlanList';

 export default function SubscriptionPage() {
  const router = useRouter();

  return (
    <div className="max-w-[1440px] mx-auto px-2 py-10 md:px-6">
      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm font-bold hover:text-gray-700"
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </button>

      <div className="text-center mt-8 mb-10">
        <h1 className="text-[20px] md:text-[40px] font-bold text-[#281812]">
          Choose a premium subscription
        </h1>
        <p className="text-sm md:text-[18px] text-gray-400 mt-2">
          Packages are designed to help you reach more people
        </p>
      </div>

      <SubscriptionPlanList />
    </div>
  );
}