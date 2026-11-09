"use client";

import PayoutItem from "@/components/creator-studio/PayoutItem";
import Loading from "@/components/loading/Loading";
import { useBankName } from "@/features/creator-studio/useBankName";
import { usePayouts } from "@/features/creator-studio/usePayouts";
import { ChevronLeft, List } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PayoutPage() {
  const router = useRouter();

  const { data: payouts, isLoading: isPayoutsLoading } = usePayouts();

  const { getBankName, isLoading: isBanksLoading } = useBankName();

  if (isPayoutsLoading || isBanksLoading) return <Loading />;

  const hasPayouts = Boolean(payouts && payouts.length > 0);

  return (
    <section className="py-4 xs:py-6 px-4 md:px-6 lg:px-8 xl:px-12 max-w-[1440px] mx-auto mb-24 lg:mb-10">
      <button
        type="button"
        onClick={() => router.back()}
        className="flex cursor-pointer items-center gap-1 text-sm xs:text-base font-bold hover:text-gray-700"
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </button>

      {hasPayouts ? (
        <>
          <div className="mt-4">
            <h1 className="text-xl xs:text-2xl font-semibold text-black">
              Total Payouts
            </h1>
            <p className="text-sm xs:text-base text-muted">
              Keep track of your payout earnings over time.
            </p>
          </div>

          <div className="mt-6 rounded-xl bg-white px-4 xs:px-6 lg:px-8 shadow-sm">
            {payouts?.map((payout) => (
              <PayoutItem
                key={payout.id}
                payout={payout}
                getBankName={getBankName}
                isLoading={isBanksLoading}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <List className="mb-2 h-8 w-8 xs:h-10 xs:w-10 text-primary" />
          <h2 className="text-lg xs:text-2xl font-semibold text-black">
            No payouts yet
          </h2>
          <p className="mt-1 max-w-sm xs:max-w-md text-sm xs:text-base lg:text-lg text-muted">
            Your payout history will appear here once your first transfer is processed.
          </p>
        </div>
      )}
    </section>
  );
}