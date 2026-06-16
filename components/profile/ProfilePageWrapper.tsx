"use client";

import { useUser } from "@/features/user/useUser";
import { useUserByUsername } from "@/features/user/useUserByUsername";
import { ReactNode } from "react";
import Loading from "../loading/Loading";
import ProfileHeader from "./ProfileHeader";


interface Props {
  username: string;
  children: ReactNode
}

export default function ProfilePageWrapper({ username, children }: Props) {
  const { data: currentUser } = useUser();
  const { data: user, isLoading } = useUserByUsername({ username });

  if (isLoading) {
    return <Loading />
  }

  if (!user) {
    return (
      <section className="pt-14 px-6">
        <p className="text-center text-gray-500">User not found.</p>
      </section>
    );
  }

  const isOwnProfile = currentUser?.id === user.id;
 
  return (
    <>     
      <ProfileHeader
        isOwnProfile={isOwnProfile}
        profile={user}
      />
      {children}
    </>
  );
}