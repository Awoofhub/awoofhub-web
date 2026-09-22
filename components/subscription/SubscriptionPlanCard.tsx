"use client";

import { Button } from "@/components/button/Button";
import { useSubscribe } from "@/features/subscription/useSubscribe";
import { openPayment } from "@/lib/paystack";
import { useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import SubscriptionSuccessModal from "../modals/subscription/SubscriptionSuccessModal";

interface Props {
  id: string;
  title: string;
  description?: string;
  price?: number;
  features?: string[];
  recommended?: boolean;
  selected: boolean;
  onSelect: () => void;
  selectLabel?: string;
  isGlobalPending: boolean;
  isThisCardLoading: boolean;
  onLoadingChange: (isLoading: boolean) => void;
}

export default function SubscriptionPlanCard({
  id,
  title,
  description,
  price,
  features = [],
  recommended = false,
  selected,
  onSelect,
  selectLabel = "Select Package",
  isGlobalPending,
  isThisCardLoading,
  onLoadingChange
}: Props) {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const subscribe = useSubscribe({
    onSuccess: (data) => {
      const accessCode = data.accessCode;

      openPayment(accessCode, {
        onSuccess: () => {
          onLoadingChange(false);
          setIsSuccessModalOpen(true);
        },
        onCancel: () => {
          onLoadingChange(false);
        }
      });
    },
  });

  const onSubmit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLoadingChange(true);
    subscribe.submit({ planName: id });
  };

  const handleCardClick = () => {
    if (isGlobalPending) return;
    onSelect();
  };

  const handleContinue = async () => {
    await subscribe.refreshSubscription();
    setIsSuccessModalOpen(false);
  };


  return (
    <>
      <div
        onClick={handleCardClick}
        className={`relative rounded-xl border min-w-[300px] p-6 md:p-10 flex flex-col bg-white
        ${isGlobalPending ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
        ${selected ? "border-[#FE4F04] border-2" : "border-gray-200"}`}
      >
        {selected && recommended && (
          <span className="absolute -top-0 right-0 bg-[#FE4F04] text-white text-xs font-medium px-3 py-1 rounded-bl-lg rounded-tr-lg">
            Recommended
          </span>
        )}

        <input
          type="radio"
          readOnly
          checked={selected}
          disabled={isGlobalPending}
          name="propertyType"
          className="h-4 w-4 border-2 mb-4 border-[#FE4F04]  accent-[#FE4F04]"
        />

        <h3 className="font-semibold text-gray-900">{title}</h3>
        {description && (
          <p className="text-sm text-gray-400 mt-1">{description}</p>
        )}

        {price !== undefined && (
          <p className="text-2xl font-bold text-gray-900 mt-4">
            N{price.toLocaleString()}
          </p>
        )}


        <ul className="mt-4 space-y-4 flex-1">
          {features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2 text-[12px] lg:text-[16px] text-gray-600"
            >
              <FaRegCheckCircle className="h-4 w-4 text-green-500" />
              {feature}
            </li>
          ))}
        </ul>


        <Button
          variant={selected ? "solid" : "outline"}
          isLoading={isThisCardLoading}
          onClick={onSubmit}
          isDisabled={isGlobalPending || !selected}
          className={`${selected ? "" : "!text-primary"} mt-6`}
        >
          {selectLabel}
        </Button>

      </div>

      <SubscriptionSuccessModal plan={title} isOpen={isSuccessModalOpen} onClose={handleContinue} />
    </>
  );
}
