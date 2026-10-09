'use client';

import { useDeleteAccount } from '@/features/creator-studio/useDeleteAccount';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

interface Props {
    accountId: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function DeleteAccountModal({ accountId, isOpen, onClose }: Props) {

    const { deleteAccount, isPending } = useDeleteAccount({
        id: accountId,
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
        deleteAccount();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={handleClose}>
            <div className="bg-white rounded-xl px-6 py-10 max-w-md w-full text-center" onClick={(e) => e.stopPropagation()}>
                <Image src="/reject.png" width={200} height={200} alt='' priority className="mx-auto w-[150px]" />

                <h3 className="font-bold text-xl xs:text-2xl text-gray-900 mb-4">Confirm that you are about to delete this account</h3>

                <button
                    type="submit"
                    disabled={isPending}
                    onClick={onSubmit}
                    className="w-full cursor-pointer bg-red-600 text-white text-base xs:text-lg rounded-sm font-baloo py-1 font-semibold  hover:bg-red-500 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {isPending ? (
                        <>
                            <Loader2 className="animate-spin" size={18} />
                            Deleting...
                        </>
                    ) : (
                        'Delete'
                    )}
                </button>

                <button
                    type="button"
                    onClick={handleClose}
                    disabled={isPending}
                    className="w-full border cursor-pointer border-black text-base xs:text-lg rounded-sm py-1 font-semibold font-baloo mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Cancel
                </button>

            </div>
        </div>
    );
}