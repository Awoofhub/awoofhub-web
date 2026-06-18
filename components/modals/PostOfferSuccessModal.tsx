"use client";

import Image from "next/image";
import IMG from "../../public/Success.png"



type SuccessModalProps = {
    onDone: () => void;
};

export const PostOfferSuccessModal = ({ onDone }: SuccessModalProps) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

        <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-lg px-8 py-10 flex flex-col items-center text-center">

            <div className="relative mb-6">
                <Image src={IMG} alt="sucessimage" />
            </div>


            <h2 className="font-baloo text-2xl font-bold text-gray-900 mb-2">
                Submitted!
            </h2>
            <p className="font-baloo text-base text-gray-500 leading-relaxed">
                We&apos;re reviewing your post.<br />
                You&apos;ll receive an update within 24 hours.
            </p>
            <button
                onClick={onDone}
                className="mt-7 w-full h-12 rounded-lg pointer bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all text-white font-baloo text-lg font-semibold shadow-md"
            >
                Done
            </button>
        </div>
    </div>
);
