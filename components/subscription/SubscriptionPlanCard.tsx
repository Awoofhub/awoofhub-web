"use client";

import { useRouter } from "next/navigation";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";

interface Props {
  id: string;
  title: string;
  description?: string;
  price?: number;
  features?: string[];
  unavailableFeatures?: string[];
  recommended?: boolean;
  selected: boolean;
  onSelect: () => void;
  selectLabel?: string;
}

export default function SubscriptionPlanCard({
  id,
  title,
  description,
  price,
  features = [],
  unavailableFeatures = [],
  recommended = false,
  selected,
  onSelect,
  selectLabel = "Select Package",
}: Props) {
  const router = useRouter();

  const onSubmit = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/premium-user/${id}`);
  };

  return (
    <div
      onClick={onSelect}
      className={`relative rounded-2xl border-2 max-w-95 p-5 md:px-2 md:py-5 lg:p-6 flex flex-col cursor-pointer
      ${selected
          ? "bg-[#FE4F04] border-[#FE4F04] text-white"
          : "bg-white border-gray-200 text-gray-900"}`}
    >
      {selected && recommended && (
        <span className="absolute -top-0.5 -right-0.5 bg-white text-primary text-[10px] md:text-[8px] lg:text-xs font-bold uppercase px-3 py-1.5 rounded-bl-2xl rounded-tr-2xl">
          Recommended
        </span>
      )}

      <div className="flex items-center gap-2 mb-3">
        <input
          type="radio"
          readOnly
          checked={selected}
          name="propertyType"
          className={`h-5 w-5 shrink-0 appearance-none rounded-full border-2
          ${selected
              ? "border-white bg-white shadow-[inset_0_0_0_4px_#FE4F04]"
              : "border-gray-400 bg-transparent"}`}
        />
        <h3 className={`text-xl md:text-base lg:text-2xl font-semibold uppercase ${selected ? "text-white" : "text-primary"}`}>
          {title} Plan
        </h3>
      </div>

      {price !== undefined && (
        <p className="text-3xl md:text-2xl lg:text-4xl font-bold">
          N{price.toLocaleString()}
          <span className="ml-1 text-xs md:text-[10px] lg:text-base font-baloo font-semibold">Per month</span>
        </p>
      )}

      {description && (
        <p className={`text-sm md:text-[10px] font-medium lg:text-sm mt-3 leading-snug ${selected ? "text-white/90" : "text-muted"}`}>
          {description}
        </p>
      )}

      <hr className={`my-6 ${selected ? "border-white/30" : "border-gray-200"}`} />

      <ul className="space-y-4 flex-1">
        {features.map((feature) => (
          <li
            key={feature}
            className={`flex items-center font-medium gap-2 text-sm md:text-xs lg:text-base ${selected ? "text-white" : "text-muted"}`}
          >
            <IoIosCheckmarkCircle className={`h-5 w-5 shrink-0 ${selected ? "text-white" : "text-[#FE4F04]"}`} />
            {feature}
          </li>
        ))}
        {unavailableFeatures.map((feature) => (
          <li
            key={feature}
            className="flex items-center font-medium gap-2 text-sm md:text-xs lg:text-base opacity-50"
          >
            <IoCloseCircle className={`h-5 w-5 shrink-0 ${selected ? "text-white" : "text-[#FE4F04]"}`} />
            {feature}
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onSubmit}
        className={`mt-6 w-full font-baloo rounded-2xl py-3 cursor-pointer text-sm md:text-xs lg:text-lg font-semibold shadow-md transition-opacity hover:opacity-90
          ${selected ? "bg-white text-black" : "bg-primary text-white"}`}
      >
        {selectLabel}
      </button>
    </div>
  );
}