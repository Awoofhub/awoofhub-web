import LoginPage from "@/components/auth/LoginPage";
import Loading from "@/components/loading/Loading";
import { Suspense } from "react";

type FilterParams = {
  redirect?: string;
};

interface FilterProps {
  searchParams: Promise<FilterParams>;
}

export default function Page({ searchParams }: FilterProps) {
 return (
    <Suspense fallback={<Loading />}>
      <LoginPage searchParams={searchParams} />
    </Suspense>
  );
}
