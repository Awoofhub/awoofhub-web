"use client";

import Image from "next/image";

type SuccessModalProps = {
  onDone: () => void;
};

export const PostOfferSuccessModal = ({ onDone }: SuccessModalProps) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
    <div className="bg-white rounded-2xl w-full max-w-[400px] lg:max-w-[500px] p-6  flex flex-col items-center text-center">
      <Image
        src="/EditSuccess.svg"
        alt="success-img"
        width={150}
        height={150}
        className="mb-2"
      />
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
        Success!
      </h2>
      <p className="text-gray-500 text-sm md:text-lg lg:text-xl mb-6">
        Thanks for sharing! Your post is being reviewed, we’ll keep you posted
        every step of the way.
      </p>
      <button
        onClick={onDone}
        className="w-full font-baloo text-sm lg:text-base bg-primary text-white py-3 rounded-md font-semibold hover:bg-orange-700 transition-colors"
      >
        Done
      </button>
    </div>
  </div>
);
