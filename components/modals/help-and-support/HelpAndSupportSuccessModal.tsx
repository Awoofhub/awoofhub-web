"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  isOpen: boolean
  onClose: () => void;
};

export default function HelpAndSupportSuccessModal({ isOpen, onClose }: Props) {
  const router = useRouter();

  const handleBackHome = () => {
    onClose();
    router.push("/");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-lg max-w-[500px] w-full p-6 relative text-center">
        <div className="flex justify-center mb-4">
          <Image src="/EditSuccess.svg" alt="success-img" width={150} height={150} className="mb-2" />
        </div>

       <p className="font-bold text-xl xs:text-2xl lg:text-3xl font-baloo text-gray-900 mb-2">
         We’ve received your support request!
        </p>
        <p className="text-muted text-sm xs:text-base mb-2">
          Thank you for reaching out. We have received your request and our support team will get back to you via email shortly.
        </p>
        <p className="text-muted text-sm xs:text-base mb-4">
          We typically respond within 24 hours. Be sure to check your ‘Spam’ or ‘Junk’ folder just in case!
        </p>

        <button
          onClick={handleBackHome}
          className="w-full bg-primary text-white font-semibold rounded-md py-2 hover:bg-orange-600 transition-colors"
        >
          Back to homepage
        </button>
      </div>
    </div>
  );
};