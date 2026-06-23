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
    <div className="flex gap-2 bg-[#F3F3F5] shadow-sm p-2 rounded-lg overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`px-4 py-2 cursor-pointer rounded-md text-sm font-semibold whitespace-nowrap transition-colors
            ${activeTab === tab.key ? "bg-primary text-white" : "text-muted hover:bg-gray-100"}`}
        >
          {tab.label} ({counts?.[tab.key as keyof MyOffersTabsCount] ?? 0})
        </button>
      ))}
    </div>
  );
}