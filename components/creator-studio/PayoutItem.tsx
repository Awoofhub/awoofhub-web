import { Payout } from "@/types/creator-studio";
import { formatDateMonthBeforeDay } from "@/utils/formatDate";
import { PiMoneyWavyBold } from "react-icons/pi";

interface Props {
    payout: Payout;
    getBankName: (code: string) => string;
    isLoading: boolean;
}

export default function PayoutItem({ payout, getBankName, isLoading }: Props) {

    const renderBankName = () => {
        if (isLoading) return "Loading...";
        return getBankName(payout.payoutAccount.bankCode);
    };

    const isActive = payout.payoutAccount.isActive;

    return (
        <div className="flex items-center justify-between gap-4 border-b border-gray-200 py-4 xs:py-5">
            <div className="flex min-w-0 items-center gap-2">
                <PiMoneyWavyBold className="mt-1 h-4 w-4 shrink-0 text-primary" />

                <div className="min-w-0 space-y-0.5">
                    <p className="text-sm xs:text-base font-medium text-black">
                        {formatDateMonthBeforeDay(payout.createdAt)}
                    </p>

                    <p className={`text-xs xs:text-sm font-medium ${isActive ? "text-[#43A047]" : "text-muted"}`}>
                        {payout.payoutAccount.accountNumber}
                    </p>

                    <p className="text-xs xs:text-sm text-muted font-medium">
                        {renderBankName()}
                        {isActive && (
                            <span className="ml-1 text-[10px] italic font-normal xs:text-xs text-[#43A047]">
                                • This account is active
                            </span>
                        )}
                    </p>
                </div>
            </div>

            <span className="shrink-0 text-sm xs:text-base font-semibold text-primary">
                {`₦${(payout.amount / 100).toFixed(2)}`}
            </span>
        </div>
    );
}