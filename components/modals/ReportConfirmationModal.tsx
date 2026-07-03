"use client";

import Image from "next/image";

interface Props {
  isOpen: boolean;
  onDone: () => void;
}

export default function ReportConfirmationModal({ isOpen, onDone }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
       <div className="bg-white rounded-2xl w-full max-w-[400px] lg:max-w-[500px] p-6  flex flex-col items-center text-center">
         <Image
           src="/EditSuccess.svg"
           alt="success-img"
           width={150}
           height={150}
           className="mb-2"
         />
         <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
           Report successful!
         </h2>
         <p className="text-muted text-sm md:text-lg lg:text-xl mb-6">
          Your report is well received and our support team will look into it
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
}