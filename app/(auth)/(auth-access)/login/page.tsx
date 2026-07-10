"use client";
import { LoginForm } from "@/components/login/LoginForm";
import { Seo } from "@/components/seo/Seo";
import Spinner from "@/components/loading/Loading";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/features/user/useUser";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showLoading, setShowLoading] = useState(false);
  const { data: user, isLoading: isCheckingUser } = useUser();

  useEffect(() => {
    if (!isCheckingUser && user) {
      router.replace("/");
    }
  }, [isCheckingUser, user, router]);

  const onSuccess = () => {
    setShowLoading(true);
    setTimeout(() => {
      const redirect = searchParams.get("redirect") || "/";
      router.push(redirect);
    }, 2500);
  };

  if (isCheckingUser || user) {
    return (
      <div className="fixed inset-0 z-50 bg-white">
        <Spinner />
      </div>
    );
  }

  if (showLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-white ">
        <Seo title="Welcome back!" />
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen  px-4 md:px-0">
      <Seo title="Sign In" />
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

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <Login />
    </Suspense>
  );
}