import { MyOffersTabsCount } from "@/types/offer";

interface Props {
  activeTab: string;
  onChange: (tab: string) => void;
  counts?: MyOffersTabsCount;
}

export default function MyOffersTabs({ activeTab, onChange, counts }: Props) {
  const tabs = [
    { key: "all", label: "All" },
    { key: "approved", label: "Active" },
    { key: "pending", label: "Pending" },
    { key: "rejected", label: "Rejected" },
    { key: "suspended", label: "Suspended" },
    { key: "expired", label: "Expired" },
  ];

  return (
    <div className="flex xxs:gap-2 bg-gray-100 shadow-md md:p-2 rounded-lg overflow-x-auto scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`px-2 md:px-4 py-2 cursor-pointer rounded-lg md:rounded-md text-[8px] xs:text-[10px] md:text-xs lg:text-sm font-semibold whitespace-nowrap transition-colors
            ${activeTab === tab.key ? "bg-primary text-white" : "text-muted hover:bg-gray-100"}`}
        >
          {tab.label} ({counts?.[tab.key as keyof MyOffersTabsCount] ?? 0})
        </button>
      ))}
    </div>
  );
}