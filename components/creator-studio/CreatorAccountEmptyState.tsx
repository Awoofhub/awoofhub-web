import { CreditCard } from "lucide-react";
import { useState } from "react";
import AddAccountModal from "../modals/creator-studio/AddAccountModal";

interface Props {
    getBankName: (code: string) => string;
}

export default function CreatorAccountEmptyState({ getBankName }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <section className="flex min-h-[60vh] w-full items-center justify-center px-4 py-16">
            <div className="flex w-full max-w-[650px] flex-col items-center text-center">
                <CreditCard className="size-12 text-primary" />

                <h2 className="mt-4 text-xl lg:text-2xl font-bold text-[#14142B] md:text-[28px]">
                    No Bank Account yet
                </h2>

                <p className="mt-1 max-w-[420px] text-base text-muted xs:text-lg">
                    Add your bank account so you can receive your earnings
                </p>

                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="mt-6 flex py-2 w-full items-center font-baloo justify-center rounded-md bg-[#FF5003] text-base xs:text-lg font-semibold text-white transition hover:bg-[#e04500] md:text-lg"
                >
                    Add an account
                </button>
            </div>

            <AddAccountModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                getBankName={getBankName}
            />
        </section>
    );
}