"use client";

import PayoutItem from "@/components/creator-studio/PayoutItem";
import Loading from "@/components/loading/Loading";
import { useBankName } from "@/features/creator-studio/useBankName";
import { usePayouts } from "@/features/creator-studio/usePayouts";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PayoutPage() {
  const router = useRouter();

  const { data: payouts, isLoading: isPayoutsLoading } = usePayouts();

  const { getBankName, isLoading: isBanksLoading } = useBankName();

  if (isPayoutsLoading || isBanksLoading) return <Loading />;

  return (
    <section className="bg-white">
      <div className="max-w-[1440px] mx-auto p-2 md:p-6 pb-10">
        <div className="relative flex items-center justify-between mb-12">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-700 hover:text-black transition-colors text-sm font-medium"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back
          </button>

          <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl font-semibold tracking-tight text-gray-900">
            Total Payouts
          </h1>
        </div>

        <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
          {!payouts || payouts.length === 0 ? (
            <section className="py-14 px-6">
              <p className="text-center text-gray-500">No payouts</p>
            </section>
          ) : (
            payouts.map((payout) => (
              <PayoutItem
                key={payout.id}
                payout={payout}
                getBankName={getBankName}
                isLoading={isBanksLoading}
              />
            ))
          )}
        </div>

      </div>
    </section>
  );
}