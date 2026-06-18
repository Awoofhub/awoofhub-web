"use client";
import { useAlert } from "@/features/alert/useAlert";

interface Props {
  contributorId: string;
}

export default function AlertButton({ contributorId }: Props) {
  const { isSubscribed, toggleAlert } = useAlert(contributorId);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isSubscribed}
      onClick={toggleAlert}
      className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors ${
        isSubscribed ? "bg-primary" : "bg-[#CCCCCC]"
      }`}
    >
      <span
        className={`inline-block h-4 w-5 transform rounded-full border border-[#F7D9CC] bg-white shadow transition-transform ${
          isSubscribed ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  );
}