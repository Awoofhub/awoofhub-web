import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Community",
  description: "Join the AwoofHub community to share deals, discover freebies, and connect with deal lovers.",
};

export default function CommunityLayout({ children }: { children: ReactNode }) {
    return <>{children}</>
}