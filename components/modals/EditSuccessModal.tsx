import Image from "next/image";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditSuccessModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-[500px] p-6 md:p-10 flex flex-col items-center text-center">
        <Image src="/EditSuccess.svg" alt="success-img" width={150} height={150} className="mb-2"/>
        <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Success!</h2>
        <p className="text-gray-500 text-sm lg:text-lg mb-8">Changes saved successfully.</p>
        <button
          onClick={onClose}
          className="w-full font-baloo text-sm lg:text-base bg-primary text-white py-3 rounded-md font-semibold hover:bg-orange-700 transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
}