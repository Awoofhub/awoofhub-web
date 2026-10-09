import { BankAccount } from "@/types/creator-studio";
import { MoreVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import DeleteAccountModal from "../modals/creator-studio/DeleteAccountModal";


interface Props {
  account: BankAccount;
  getBankName: (code: string) => string;
}


export default function CreatorAccount({ account, getBankName }: Props) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("click", handleClickOutSide);
    return () => {
      window.removeEventListener("click", handleClickOutSide);
    };
  }, []);

  const handleClickOutSide = (e: Event) => {
    const target = e.target;
    if (target instanceof Node && dropdownRef.current?.contains(target)) {
      return;
    }
    setOpen(false);
  };

  const toggleDropdown = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="">

      {/* Page Title & Description */}
      <h1 className="text-sm font-medium text-gray-600 mb-4">
        Payouts will be sent to the account details below.
      </h1>

      <div className="bg-white border border-gray-200 rounded-xl shadow-xs overflow-hidden">
        <div className="bg-gray-100/80 px-6 py-3 border-b border-gray-200">
          <span className="text-sm font-semibold text-gray-700">Account</span>
        </div>

        <div className="p-3 xs:p-6 relative">
          <div className="grid grid-cols-2 md:grid-cols-[minmax(300px,auto)_1fr] gap-x-6 gap-y-3">
            <p className="text-sm text-gray-400 font-medium">Account Name</p>
            <p className="text-sm font-bold text-gray-900">{account.accountName}</p>

            <p className="text-sm text-gray-400 font-medium">Account Number</p>
            <p className="text-sm font-bold text-gray-900 tracking-wider">{account.accountNumber}</p>

            <p className="text-sm text-gray-400 font-medium">Bank Name</p>
            <p className="text-sm font-bold text-gray-900">{getBankName(account.bankCode)}</p>
          </div>


          <div className="absolute -top-10 right-2 md:top-6 md:right-6">
            <div
              ref={dropdownRef}
              onClick={() => toggleDropdown()}
              className="text-gray-500 hover:text-gray-800 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Account Options"
            >
              <MoreVertical size={20} />
              {open && (
                <div onClick={() => setIsDeleteOpen(true)} className="absolute right-0 top-full z-50 mt-1 whitespace-nowrap rounded-xl px-4 py-2 bg-white border border-red-500 text-base font-medium text-red-500 flex items-center gap-1 shadow-sm cursor-pointer">
                  <RiDeleteBinLine /> delete
                </div>
              )}
            </div>
          </div>


          <DeleteAccountModal
            accountId={account.id}
            isOpen={isDeleteOpen}
            onClose={() => setIsDeleteOpen(false)}
          />

        </div >
      </div >
    </div >
  );
}

