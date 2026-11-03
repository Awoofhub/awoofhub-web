"use client";

import CreatorNotSubscribed from "@/components/creator-studio/CreatorNotSubscribed";
import CreatorSubscribed from "@/components/creator-studio/CreatorSubscribed";
import Loading from "@/components/loading/Loading";
import { useSubscription } from "@/features/subscription/useSubscription";

export default function ContributorPage() {
  const { data: subscription, isLoading } = useSubscription();

  if (isLoading) return <Loading />;

  return (
    <div className="pt-6 px-4 md:px-6 lg:px-8 xl:px-12 max-w-[1440px] mx-auto mb-24 lg:mb-10">
      {subscription?.status === 'active' ? (
        <CreatorSubscribed />
      ) : (
        <CreatorNotSubscribed />
      )}
    </div>
  );
}

