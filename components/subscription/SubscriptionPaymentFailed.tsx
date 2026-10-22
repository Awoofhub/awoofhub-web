import { Button } from "@/components/button/Button";
import { useManageSubscription } from "@/features/subscription/useManageSubscription";
import { FolderX } from "lucide-react";

export default function SubscriptionPaymentFailed() {

    const { manage, isLoading } = useManageSubscription();

    return (
        <div className="py-20 px-3 flex flex-col items-center text-center">
            <FolderX className="text-primary w-8 h-8 xs:w-10 xs:h-10 mb-3" />

            <h1 className="font-semibold text-xl xs:text-2xl lg:text-2xl text-black">
                Payment failed
            </h1>

            <p className="text-muted text-base xs:text-lg max-w-md leading-tight mt-2 mb-6">
               We couldn't process your payment. Please update your payment method and try again to continue enjoying your subscription.
            </p>

            <Button
                isLoading={isLoading}
                onClick={() => manage()}
                isDisabled={isLoading}
                className="!w-[200px] !mx-0 text-sm"
            >
                Manage payment
            </Button>
        </div>
    );
};