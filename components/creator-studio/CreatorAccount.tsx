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
      <div className="mb-4">
        <h1 className="text-xl xs:text-2xl font-semibold text-black ">
          Payments Settings
        </h1>
        <p className="text-muted text-base xs:text-lg">Manage the bank account you use to receive payouts</p>
      </div>

      <div className="p-4 xs:px-4 xs:py-6 bg-white  rounded-xl shadow-sm overflow-hidden">
        <div className="flex justify-between items-center bg-[#F3F3F5] rounded-2xl px-4 py-3">
          <h3 className="text-base xs:text-lg uppercase font-semibold text-gray-900">Account</h3>
          <div
            ref={dropdownRef}
            onClick={() => toggleDropdown()}
            className="text-black hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
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

        <div className="mt-4">
          <div >
            <div className="mb-2 grid  grid-cols-[minmax(140px,auto)_1fr] md:grid-cols-[minmax(200px,auto)_1fr] border border-[#59585833] rounded-lg">
              <p className="flex items-center px-4 py-2 bg-[#F3F3F5] text-sm xs:text-base md:text-lg text-gray-900 rounded-lg">Account Name</p>
              <p className="px-4 md:px-12 py-2 text-base xs:text-lg font-semibold text-primary font-baloo">{account.accountName}</p>
            </div>

            <div className="mb-2 grid  grid-cols-[minmax(140px,auto)_1fr] md:grid-cols-[minmax(200px,auto)_1fr] border border-[#59585833] rounded-lg">
              <p className="flex items-center px-4 py-2 bg-[#F3F3F5] text-sm xs:text-base md:text-lg text-gray-900 rounded-lg">Account Number</p>
              <p className="px-4 md:px-12 py-2 text-base xs:text-lg font-semibold text-primary font-baloo">{account.accountNumber}</p></div>

            <div className="mb-2 grid  grid-cols-[minmax(140px,auto)_1fr] md:grid-cols-[minmax(200px,auto)_1fr] border border-[#59585833] rounded-lg">
              <p className="flex items-center px-4 py-2 bg-[#F3F3F5] text-sm xs:text-base md:text-lg text-gray-900 rounded-lg">Bank Name</p>
              <p className="px-4 md:px-12 py-2 text-base xs:text-lg font-semibold text-primary font-baloo">{getBankName(account.bankCode)}</p></div>
            <hr className="mt-6 text-muted/60" />
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

