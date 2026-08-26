import { useMyOffersTabsCount } from "@/features/offers/useMyOffersTabsCount";
import { MyOffersTabsCount } from "@/types/offer";

interface Props {
  activeTab: string | undefined;
  onChange: (tab: string | undefined) => void;
  tabs: { value: keyof MyOffersTabsCount | undefined; label: string }[];
}

export default function MyOffersTabs({ tabs, activeTab, onChange }: Props) {
  const { data: counts } = useMyOffersTabsCount();

    console.log("tabs:", tabs);
  console.log("activeTab:", activeTab);
  console.log("counts:", counts);

  return (
    <div className="flex gap-1 xs:gap-2 bg-gray-100 shadow-md md:p-2 rounded-lg overflow-x-auto no-scrollbar">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          onClick={() => onChange(tab.value)}
          className={`px-3 md:px-4 py-2.5 md:py-2 cursor-pointer rounded-xl md:rounded-md text-[10px] md:text-xs lg:text-sm font-semibold whitespace-nowrap transition-colors
            ${activeTab === tab.value ? "bg-primary text-white" : "text-muted hover:bg-gray-100"}`}
        >
          {tab.label} ({tab.value ? counts?.[tab.value] ?? 0 : counts?.all ?? 0})
        </button>
      ))}
    </div>
  );
}