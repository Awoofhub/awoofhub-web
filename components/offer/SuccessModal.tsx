"use client";

import Image from "next/image";
import Success from "./Success.png"

type SuccessModalProps = {
    onDone: () => void;
};

export const SuccessModal = ({ onDone }: SuccessModalProps) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

        <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-sm px-8 py-10 flex flex-col items-center text-center">

            <div className=" relative z-99">
                <Image src={Success} alt={"success image"} />

            </div>


            <h2 className="font-baloo text-2xl font-bold text-gray-900 mb-2">
                Submitted!
            </h2>
            <p className="font-baloo text-base text-gray-500 leading-relaxed">
                Thanks for sharing! Your post is being <br />
                reviewed, we&apos;ll keep you posted every step of the way.

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
