"use client";

import { useUser } from "@/features/user/useUser";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type BlockBusinessProps = {
  children: ReactNode;
};

export default function BlockBusiness({ children }: BlockBusinessProps) {
  const { data, isLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && data?.role === "business") {
      let targetPath = pathname === "/" ? "/business/dashboard" : `/business${pathname}`;
      router.replace(targetPath);
    }
  }, [data, isLoading, pathname, router]);

  if (data?.role === "business") {
    return null;
  }

  return <>{children}</>;
}