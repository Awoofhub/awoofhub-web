"use client";
import { LoginForm } from "@/components/auth/LoginForm";
import Spinner from "@/components/loading/Loading";
import { useUser } from "@/features/user/useUser";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";

type FilterParams = {
  redirect?: string;
};

interface FilterProps {
  searchParams: Promise<FilterParams>;
}

export default function LoginPage({ searchParams }: FilterProps) {
   const params = use(searchParams);
    const redirectUrl = params.redirect || "/";

  const router = useRouter();
  
  const { data: user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && user?.role === "user") {
      router.replace(redirectUrl);
    }
  }, [isLoading, user, router, redirectUrl]);

  const onSuccess = () => {
    router.push(redirectUrl);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-white">
        <Spinner />
      </div>
    );
  }

  if (user?.role === "user") {
    return null; 
  }

  return (
    <div className="w-full min-h-screen  px-4 md:px-0">
      <div className="px-20 pt-10 pb-6 flex justify-center lg:justify-start items-center">
        <Link href="/">
          <Image
            src="/LogoWhite.png"
            width={200}
            height={100}
            className="w-[120px] xs:w-[200px]"
            alt="logo"
            priority
          />
        </Link>
      </div>
      <div className="w-full pb-10 flex flex-col items-center justify-center">
        <LoginForm onSuccess={onSuccess} />
      </div>
    </div>
  );
}
