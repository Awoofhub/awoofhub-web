import { useManageSubscription } from "@/features/subscription/useManageSubscription";

export default function SubscriptionPaymentFailed() {

    const { manage, isLoading } = useManageSubscription();

    return (
        <div>
            <div className="text-center mt-4 mb-6 gap-2">
                <h1 className="text-[20px] md:text-[40px] font-bold text-[#281812]">
                    Payment Failed
                </h1>
                <p className="text-sm md:text-[18px] text-gray-400">
                    Packages are designed to help you reach more people
                </p>
            </div>
            <div className="flex gap-6 justify-center items-start flex-wrap text-red-500">
                <button
                    onClick={() => manage()}
                    disabled={isLoading}
                    className="w-50 bg-white hover:bg-gray-50 text-orange-600 border border-orange-200 font-medium text-sm py-2.5 px-4 rounded-xl transition">
                    {isLoading ? "Loading..." : " Manage Payment"}
                </button>
            </div>
        </div>

    );
};