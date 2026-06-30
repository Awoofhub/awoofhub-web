"use client";
import { useUser } from "@/features/user/useUser";
import { useUserByUsername } from "@/features/user/useUserByUsername";
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
  const { data: user, isLoading: userLoading } = useUserByUsername({
    username,
  });

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
    <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 xl:px-12 py-6">
      <div className="flex flex-col xs:flex-row gap-4 lg:gap-6 items-start">
        <ProfileCard isOwnProfile={isOwnProfile} profile={user} />
        <ProfileDeals  isOwnProfile={isOwnProfile} profile={user} />
      </div>
    </div>
  );
}
