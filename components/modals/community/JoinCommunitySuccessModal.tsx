"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

type JoinCommunitySuccessModalProps = {
  onClose: () => void;
};

export const JoinCommunitySuccessModal = ({
  onClose,
}: JoinCommunitySuccessModalProps) => {
  const router = useRouter();

  const handleBackHome = () => {
    onClose();
    router.push("/");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-xl shadow-lg max-w-[500px] w-full p-6 relative text-center">
        <div className="flex justify-center mb-4">
          <Image src="/EditSuccess.svg" alt="success-img" width={150} height={150} className="mb-2"/>
        </div>

        <p className="font-bold text-xl  xs:text-2xl lg:text-3xl font-baloo text-gray-900 mb-2">
          You’re on the list!
        </p>
        <p className="text-muted text-sm xs:text-base lg:text-lg mb-4">
          We've received your details. Keep an eye on your inbox, we'll send you an invitation link to join the AwoofHub Community soon.
        </p>
        <p className="text-muted text-sm xs:text-base lg:text-lg mb-6">
         If you don't see our email, be sure to check your ‘Spam’ or ‘Junk’ folder.
        </p>

        <button
          onClick={handleBackHome}
          className="w-full bg-primary text-white font-semibold rounded-md py-3 hover:bg-orange-600 transition-colors"
        >
          Back to homepage
        </button>
      </div>
    </div>
  );
};