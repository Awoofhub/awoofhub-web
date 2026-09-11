"use client";


import { FaRegCheckCircle } from "react-icons/fa";

interface Props {
  title: string;
  description?: string;
  price?: number;
  features?: string[];
  recommended?: boolean;
  selected: boolean;
  onSelect: () => void;
  selectLabel?: string;
}

export default function SubscriptionPlanCard({
  title,
  description,
  price,
  features = [],
  recommended = false,
  selected,
  onSelect,
  
  selectLabel = "Select Package",
}: Props) {
  return (
    <div
    onClick={onSelect}
      className={`relative rounded-xl border min-w-[300px] p-6 md:p-10 flex flex-col bg-white ${
        selected ? "border-[#FE4F04] border-2" : "border-gray-200"
      }`}
    >
      {selected && recommended &&  (
        <span className="absolute -top-0 right-0 bg-[#FE4F04] text-white text-xs font-medium px-3 py-1 rounded-bl-lg rounded-tr-lg">
          Recommended
        </span>
      )}

     

      <input
        type="radio"
        readOnly
        checked={selected}
        name="propertyType"
        className="h-4 w-4 border-2 mb-4 border-[#FE4F04]  accent-[#FE4F04]  "
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

       
        <ul className="mt-4 space-y-4 flex-1   ">
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
      

      <button
        type="button"
        onClick={onSelect}
        className={`mt-6 w-full rounded-lg py-2 text-sm font-medium transition-colors ${
          selected
            ? "bg-[#FE4F04] text-white"
            : "border border-[#FE4F04] text-[#FE4F04]"
        }`}
      >
        {selectLabel}
      </button>
    </div>
  );
}
