"use client";

import { default as CreatorNotSubscribed, default as CreatorSubscribed } from "@/components/creator-studio/CreatorNotSubscribed";
import Loading from "@/components/loading/Loading";
import { useSubscription } from "@/features/subscription/useSubscription";

export default function ContributorPage() {
  const { data: subscription, isLoading } = useSubscription();

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-[1440px] mx-auto p-2 md:p-6 mb-10">
      {subscription?.status === 'active' ? (
        <CreatorSubscribed />
      ) : (
        <CreatorNotSubscribed />
      )}
    </div>
  );
}

