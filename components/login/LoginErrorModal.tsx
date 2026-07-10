"use client";
import { X } from "lucide-react";
import { GoAlertFill } from "react-icons/go";

type LoginErrorModalProps = {
  message: string;
  onClose: () => void;
  onReset: () => void;
};

export const LoginErrorModal = ({
  onClose,
  onReset,
}: LoginErrorModalProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 px-4 flex items-center justify-center lg:items-start lg:justify-end lg:pt-16 lg:pr-16">
      <div className="bg-white rounded-xl shadow-lg max-w-[350px] xs:max-w-[400px] w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="flex items-start gap-3 mb-6">
          <GoAlertFill size={25} className="text-[#BA1A1A] mt-1 shrink-0" />
          <div>
            <p className="font-bold text-base xs:text-xl font-baloo text-gray-900">
              Couldn't log into your account!
            </p>
            <p className="text-sm xs:text-lg font-medium text-[#BA1A1A]">
              Incorrect password combination
            </p>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end gap-3">
          <button
            className="cursor-pointer font-baloo w-1/2 md:w-[90px] border-primary border rounded-md py-1"
            onClick={onReset}
          >
            Reset
          </button>
          <button
            className="cursor-pointer font-baloo w-1/2 md:w-[90px] text-white bg-primary rounded-md py-1"
            onClick={onClose}
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
};