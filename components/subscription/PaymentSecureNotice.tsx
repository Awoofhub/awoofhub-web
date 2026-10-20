import { SlLock } from "react-icons/sl";

export default function PaymentSecureNotice() {
    return (
        <div className="bg-[#FFD5C34D] text-gray-900 rounded-xl flex flex-col items-center text-center p-4 xs:p-6">
            <div className="max-w-150">
                <SlLock size={24} className="text-primary mx-auto mb-2" />
                <h1 className="font-semibold">Your payment is secured</h1>
                <p className="text-xs leading-relaxed">
                    AwoofHub uses industry standard encryption to keep your information
                    save.
                </p>
                <p className="text-xs leading-relaxed">
                    After you click ‘PAY’ you will be redirected to Paystack payment
                    platform to complete this process. Your bank may ask you to complete
                    an additional verification to authorize this transaction. Follow the
                    instructions provided by your bank to complete your payment
                </p>
            </div>
        </div>
    );
}