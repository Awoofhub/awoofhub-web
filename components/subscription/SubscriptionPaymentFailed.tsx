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
                Packages are designed to help you reach more people
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