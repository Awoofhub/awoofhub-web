"use client";
import CreatorAccount from "@/components/creator-studio/CreatorAccount";
import CreatorAccountEmptyState from "@/components/creator-studio/CreatorAccountEmptyState";
import Loading from "@/components/loading/Loading";
import { useBankName } from "@/features/creator-studio/useBankName";
import { usePayoutAccount } from "@/features/creator-studio/usePayoutAccount";

import { ChevronLeft } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function PaymentSettingsPage() {
  const router = useRouter();
  const { getBankName, isLoading: isBanksLoading } = useBankName();
  const { data: account, isLoading } = usePayoutAccount();

  if (isLoading || isBanksLoading) return <Loading />;
  return (
    <div className="pt-6 px-4 md:px-6 lg:px-8 xl:px-12 max-w-[1440px] mx-auto mb-24 lg:mb-10">
      <div className="flex gap-2 items-start ">
        <button
          type="button"
          onClick={() => router.back()}
          className="cursor-pointer flex items-center text-black font-baloo font-semibold hover:text-gray-800 mb-2 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-2" /> Back
        </button>
      </div>

      {account ? (
        <CreatorAccount account={account} getBankName={getBankName} />
      ) : (
        <CreatorAccountEmptyState getBankName={getBankName} />
      )}

    </div>
  );
}
