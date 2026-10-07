import { Payout } from "@/types/creator-studio";
import { PiMoneyWavyLight } from "react-icons/pi";


interface Props {
    payout: Payout;
}

export default function PayoutItem({ payout }: Props) {

    return (
        <div className="py-5 flex items-center justify-between transition-colors hover:bg-gray-50/50 px-2 rounded-lg">
            <div className="flex items-center space-x-4">
                <div className="mt-1 text-gray-800">
                    <PiMoneyWavyLight className="w-6 h-6 stroke-[1.5]" />
                </div>

                <div>
                    <h3 className="text-base font-normal text-gray-900">
                        {payout.createdAt}
                    </h3>

                    <div className="flex items-center space-x-2 text-sm mt-0.5">
                        <span className="text-gray-500">
                            {payout.payoutAccount.accountNumber}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="text-gray-500">{payout.payoutAccount.bankCode}</span>

                        {payout.payoutAccount.isActive && (
                            <span className="text-xs ml-1 text-orange-500 italic">
                                • This account is active
                            </span>
                        )}
                    </div>
                </div>
            </div>


            <div className="text-right">
                <span className="text-base font-medium text-gray-900">
                      ₦{(payout.amount / 100).toFixed(2)}
                </span>
            </div>
        </div>

    );
}

