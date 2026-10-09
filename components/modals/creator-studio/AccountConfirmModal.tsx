'use client';

import { Button } from "@/components/button/Button";
import { useSavePayoutAccount } from '@/features/creator-studio/useSavePayoutAccount';
import { VerifiedAccount } from '@/types/creator-studio';
import { Check } from 'lucide-react';

interface EnrichedAccount extends VerifiedAccount {
    bank_name: string;
}

interface Props {
    account: EnrichedAccount;
    isOpen: boolean;
    onClose: () => void;
    onBack: () => void;
}

export default function AccountConfirmModal({ account, isOpen, onClose, onBack }: Props) {

    const { submit, isPending, } = useSavePayoutAccount({
        onSuccess: () => {
            onClose();
        },
    });

    if (!isOpen) return null;

    const handleClose = () => {
        if (isPending) return;

        onClose();
    };


    const onSubmit = () => {
        submit({ accountNumber: account.account_number, bankCode: account.bank_code });
    };


    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={handleClose}>
            <div className="bg-white rounded-xl px-6 py-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                <div className="w-16 h-16 bg-[#00B67A] rounded-full flex items-center justify-center mb-4 shadow-md mx-auto">
                    <Check className="w-8 h-8 text-white stroke-[3]" />
                </div>

                <h3 className="font-bold text-2xl sm:text-2xl text-gray-900 mb-8 text-center">Bank account valid</h3>

                <div className="w-full grid grid-cols-[auto_1fr] gap-x-6 gap-y-4 mb-8 text-base items-start">
                    <span className="text-neutral-400 font-medium">Account Name</span>
                    <span className="text-neutral-900 font-semibold">{account.account_name}</span>

                    <span className="text-neutral-400 font-medium">Account Number</span>
                    <span className="text-neutral-900 font-semibold">{account.account_number}</span>

                    <span className="text-neutral-400 font-medium">Bank Name</span>
                    <span className="text-neutral-900 font-semibold">{account.bank_name}</span>
                </div>

                <div className="w-full grid grid-cols-2 gap-4">
                    <button
                        type="button"
                        onClick={onBack}
                        disabled={isPending}
                        className="w-full py-2 px-4 bg-[#FFDCD0] hover:bg-[#ffccbc] text-[#E65100] font-baloo font-semibold rounded-lg transition-colors duration-200"
                    >
                        Not you
                    </button>

                    <Button
                        onClick={onSubmit}
                        isLoading={isPending}
                        isDisabled={isPending}
                        className="font-semibold rounded-lg "
                    >
                        Save
                    </Button>

                </div>
            </div>
        </div>
    );
}