import EmailVerificationPage from "@/components/auth/EmailVerificationPage";
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
      <EmailVerificationPage searchParams={searchParams} />
    </Suspense>
  );
}
