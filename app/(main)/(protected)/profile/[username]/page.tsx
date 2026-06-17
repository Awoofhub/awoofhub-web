"use client";
import { useUser } from "@/features/user/useUser";
import { useUserByUsername } from "@/features/user/useUserByUsername";
import { useOffersByUsername } from "@/features/offers/useOffersByUsername";
import { useMemo } from "react";
import Loading from "@/components/loading/Loading";
import ProfileCard from "@/components/profile/ProfileCard";
import ProfileDeals from "@/components/profile/ProfileDeals";
import { use } from "react";

interface Props {
  params: Promise<{ username: string }>;
}

export default function ProfilePage({ params }: Props) {
  const { username } = use(params);
  const { data: currentUser } = useUser();
  const { data: user, isLoading: userLoading } = useUserByUsername({ username });

  const { data, isFetching, hasNextPage, isFetchingNextPage, fetchNextPage } = useOffersByUsername({
    username: user?.username ?? "",
    search: "",
    category: "",
    minRating: 0,
    createdFrom: "",
    createdTo: "",
    limit: 20,
  });

  const offers = useMemo(() => data?.pages.flatMap((page) => page.data) ?? [], [data]);

  if (userLoading) return <Loading />;

  if (!user) {
    return (
      <section className="pt-14 px-6">
        <p className="text-center text-gray-500">User not found.</p>
      </section>
    );
  }

  const isOwnProfile = currentUser?.id === user.id;

  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-6">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <ProfileCard isOwnProfile={isOwnProfile} profile={user} offers={offers} />
        <ProfileDeals
          isOwnProfile={isOwnProfile}
          offers={offers}
          isLoading={isFetching}
          hasNextPage={!!hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      </div>
    </div>
  );
}