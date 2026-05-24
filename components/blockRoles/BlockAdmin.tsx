"use client";

import { useUser } from "@/features/user/useUser";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type BlockBusinessProps = {
  children: ReactNode;
};

export default function BlockAdmin({ children }: BlockBusinessProps) {
  const { data, isLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && data?.role === "admin") {
      router.replace(`/login?redirect=${pathname}`);
    }
  }, [data, isLoading, pathname, router]);

  if (data?.role === "admin") {
    return null;
  }

  return <>{children}</>;
}