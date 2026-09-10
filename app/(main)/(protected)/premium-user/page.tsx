"use client";

import { openPayment } from "@/lib/paystack";

export default function PremiumUserPage() {

    const accessCode = 'x8qbkzwt2euyzl8';

    const handlePayment = () => {
        openPayment(accessCode, {
            onSuccess: () => {
                alert('Payment successful');
            },
        });
    };

    return (
        <section className="max-w-[1440px] mx-auto pt-6 pb-20 lg:py-8 px-4 md:px-6 lg:px-8 xl:px-12">

            <button
                type="button"
                onClick={handlePayment}
                className="rounded-lg bg-black px-6 py-3 text-white"
            >
                Pay Now
            </button>

        </section>
    );
}
