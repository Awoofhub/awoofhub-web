import { Button } from "@/components/button/Button";
import { PiCrown } from "react-icons/pi";

interface Props {
    title: string;
    price: string;
    isLoading: boolean;
    onSubmit: () => void;
}

export default function SubscriptionCheckoutSummary({ title, price, isLoading, onSubmit }: Props) {
    return (
        <div className="bg-[#D9D9D966] flex flex-col xs:flex-row xs:items-center justify-between rounded-xl">
            <div className="p-4">
                <h1 className="flex items-center gap-2 text-xl xs:text-2xl font-semibold text-black">
                    <div className="bg-primary text-base md:text-lg rounded-full flex justify-center items-center w-6 h-6 xs:w-7.5 xs:h-7.5">
                        <PiCrown className="text-white" />
                    </div>
                    {title} Package
                </h1>
                <p className="text-base xs:text-lg text-muted mt-0.5">
                    Proceed to complete your premium subscription. Automatically renews every month, and you can cancel at any time before your next renewal charge.
                </p>
            </div>

            <div className="bg-white p-4 text-center md:text-start lg:p-5 flex flex-col lg:flex-row  lg:items-center justify-between gap-2 lg:gap-6 rounded-b-lg xs:rounded-lg">
                <div>
                    <span className="text-sm lg:text-base text-muted block">Total for 30 days:</span>
                    <span className="text-xl font-baloo font-bold text-gray-900">{price}</span>
                </div>
                <Button
                    isLoading={isLoading}
                    onClick={onSubmit}
                    isDisabled={isLoading}
                    className="!w-full xs:!w-[160px] lg:!w-[200px] !mx-0 text-sm"
                >
                    Continue to pay
                </Button>
            </div>
        </div>
    );
}