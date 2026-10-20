'use client';
import { PaymentSuccess } from '@/types/payment';
import PaystackPop from '@paystack/inline-js';

const paystack = new PaystackPop();

interface PaymentCallbacks {
    onSuccess?: (payment: PaymentSuccess) => void;
    onCancel?: () => void;
    onError?: (error: { message: string }) => void
    onLoad?: () => void;
}

export function openPayment(accessCode: string, callbacks?: PaymentCallbacks) {
    return paystack.resumeTransaction(accessCode, callbacks);
};
