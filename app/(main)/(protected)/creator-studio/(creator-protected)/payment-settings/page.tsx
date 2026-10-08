import CreatorAccount from "@/components/creator-studio/CreatorAccount";
import CreatorAccountEmptyState from "@/components/creator-studio/CreatorAccountEmptyState";
import Loading from "@/components/loading/Loading";
import { usePayoutAccount } from "@/features/creator-studio/usePayoutAccount";
import { ChevronLeft } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function PaymentSettingsPage() {
  const router = useRouter();
  const { data: account, isLoading } = usePayoutAccount();
  if (isLoading) return <Loading />;
  return (
    <div className="max-w-[1440px] mx-auto p-2 md:p-6 mb-10">
      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm font-bold hover:text-gray-700"
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </button>

      {account ? (
        <CreatorAccount />
      ) : (
        <CreatorAccountEmptyState />
      )}

    </div>
  );
}
