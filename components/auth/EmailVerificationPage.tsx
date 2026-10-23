"use client";
import Loading from "@/components/loading/Loading";
import { useVerifyEmail } from "@/features/auth/useVerifyEmail";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";

type FilterParams = {
  token?: string;
};

interface FilterProps {
  searchParams: Promise<FilterParams>;
}

export default function EmailVerificationPage({ searchParams }: FilterProps) {
  const params = use(searchParams);
  const { token } = params;

  const router = useRouter();

  const onSuccess = () => {
    router.push("/");
  };

  const onError = () => {
    router.replace("/signup");
  };

  const { submit } = useVerifyEmail({ onSuccess, onError });

  useEffect(() => {
    if (!token) {
      router.replace("/signup");
      return;
    }

    submit({ token });
  }, [token, router, submit]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loading />
    </div>
  );

}

