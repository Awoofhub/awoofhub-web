'use client';

import Loading from '@/components/loading/Loading';
import SubscriptionDashboard from '@/components/subscription/SubscriptionDashboard';
import SubscriptionPaymentFailed from '@/components/subscription/SubscriptionPaymentFailed';
import { SubscriptionPlanList } from '@/components/subscription/SubscriptionPlanList';
import { useSubscription } from '@/features/subscription/useSubscription';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SubscriptionPage() {
  const router = useRouter();
  const { data: subscription, isLoading } = useSubscription();

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-[1440px] mx-auto p-2 md:p-6 mb-10">
      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm font-bold hover:text-gray-700"
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </button>

      {(!subscription || subscription.subscriptionStatus !== 'active') && (
        <SubscriptionPlanList />
      )}

      {subscription?.status === 'paid' &&
        subscription?.subscriptionStatus === 'active' && (
          <SubscriptionDashboard subscription={subscription} />
        )}

      {subscription?.status === 'not paid' &&
        subscription?.subscriptionStatus === 'active' && (
          <SubscriptionPaymentFailed />
        )}

    </div>
  );
}