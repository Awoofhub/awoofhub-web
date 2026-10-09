'use client';

import { Button } from "@/components/button/Button";
import { BankSearch } from '@/components/form/BankSearch';
import { InputField } from '@/components/form/InputField';
import { useVerifyPayoutAccount } from '@/features/creator-studio/useVerifyPayoutAccount';
import { AccountData } from '@/types/creator-studio';
import { useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import AccountConfirmModal from "./AccountConfirmModal";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    getBankName: (code: string) => string;
}


export default function AddAccountModal({ isOpen, onClose, getBankName }: Props) {

    const [verifiedAccount, setVerifiedAccount] = useState<any>(null);
    const [isDone, setIsDone] = useState(false);

    const { submit, isPending, } = useVerifyPayoutAccount({
        onSuccess: (data) => {
            const enrichedAccount = {
                ...data,
                bank_name: getBankName(data.bank_code), 
            };

            setVerifiedAccount(enrichedAccount);
            setIsDone(true);
        },
    });

    const { register, handleSubmit, formState, control, reset: resetForm } = useForm<AccountData>();

    if (!isOpen) return null;

    const handleClose = () => {
        if (isPending) return;

        resetForm();
        setIsDone(false);
        onClose();
    };


    const onSubmit = (data: AccountData) => {
        submit({ accountNumber: data.accountNumber, bankCode: data.bankCode, });
    };


    return (
        <>
            {!isDone && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={handleClose}>
                    <div className="bg-white rounded-xl px-6 py-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>

                        <h3 className="font-bold text-lg text-gray-900 mb-4 text-center">Verify Bank Account</h3>

                        <form onSubmit={handleSubmit(onSubmit)}>

                            <Controller
                                name="bankCode"
                                control={control}
                                rules={{ required: "Please select a bank" }}
                                render={({ field, fieldState }) => (
                                    <BankSearch
                                        label="Select Bank"
                                        compulsory={true}
                                        placeholder="Search for your bank..."
                                        value={field.value}
                                        onBankSelect={(code) => field.onChange(code)}
                                        error={fieldState.error}
                                    />
                                )}
                            />

                            <InputField
                                label="Account Number"
                                placeholder="0123456789"
                                compulsory={true}
                                type="text"
                                {...register("accountNumber", {
                                    required: "Account Number is required",
                                    validate: (value) =>
                                        value.length === 10 || "Account Number must be exactly 10 characters long"
                                })}
                                error={formState.errors.accountNumber}
                            />

                            <div className="mt-6">
                                <Button
                                    isLoading={isPending}
                                    isDisabled={isPending}
                                    type="submit"
                                >
                                    Verify
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <AccountConfirmModal
                account={verifiedAccount}
                isOpen={isDone}
                onClose={handleClose}
                onBack={() => {
                    setVerifiedAccount(null);
                    setIsDone(false);
                }}
            />
        </>

    );
}