'use client'
import { useLogout } from '@/features/auth/useLogout';
import { useRouter } from 'next/navigation';
import { IoClose } from 'react-icons/io5';
import Link from 'next/link';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function LogoutModal({ isOpen, onClose }: Props) {
  const router = useRouter();

  const { submit: logout } = useLogout({
    onSuccess: () => {
      onClose();
      router.push('/login');
    },
  });

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-100"
        role="button"
        tabIndex={-1}
        onClick={onClose}
        onKeyDown={onClose}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-200 w-[90%] max-w-lg bg-white rounded-2xl p-8 shadow-xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black hover:text-gray-500 transition-colors"
        >
          <IoClose size={24} />
        </button>

        {/* Content */}
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold text-black mb-2">
            Want to Logout?
          </h2>
          <p className="text-[#7E8492] text-lg font-montserrat">Come back soon!</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => logout()}
            className="w-full py-2 bg-primary text-white font-semibold text-lg rounded-md hover:bg-orange-600 transition-colors"
          >
            Logout
          </button>
          <Link
            href="/"
            onClick={onClose}
            className="w-full py-2 border border-primary text-primary font-semibold text-lg rounded-md hover:bg-orange-50 transition-colors text-center"
          >
            Back to Homepage
          </Link>
        </div>

      </div>
    </>
  );
}