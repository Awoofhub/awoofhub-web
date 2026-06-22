"use client";
import { EditProfileForm } from "@/components/profile/EditProfileForm";
import EditSuccessModal from "./EditSuccessModal";
import { FiX } from "react-icons/fi";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditProfileModal({ isOpen, onClose }: Props) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [redirectUsername, setRedirectUsername] = useState<string | null>(null);
  const router = useRouter();

  if (!isOpen && !showSuccess) return null;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 px-4">
          <div className="max-w-200 bg-white rounded-2xl w-full max-h-[100vh] overflow-y-auto p-8 lg:py-10 lg:px-20 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <FiX size={20} />
            </button>

            <EditProfileForm
              onSuccess={(updatedUser) => {
                onClose();
                setShowSuccess(true);

                if (updatedUser.username) {
                  setRedirectUsername(updatedUser.username);
                }
              }}
            />
          </div>
        </div>
      )}
      <EditSuccessModal
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false);

          if (redirectUsername) {
            router.replace(`/profile/${redirectUsername}`);
            setRedirectUsername(null);
          }
        }}
      />
    </>
  );
}
