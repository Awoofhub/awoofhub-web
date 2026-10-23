import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import Loading from "@/components/loading/Loading";
import { Suspense } from "react";

type FilterParams = {
  token?: string;
};

interface FilterProps {
  searchParams: Promise<FilterParams>;
}

export default function Page({ searchParams }: FilterProps) {
 return (
    <Suspense fallback={<Loading />}>
      <ResetPasswordForm searchParams={searchParams} />
    </Suspense>
  );
}
