interface Props {
    activeTab: string;
    onChange: (tab: string) => void;
    tabs: { label: string; value: string; }[];
}

export default function CreatorStatsTabs({ tabs, activeTab, onChange }: Props) {
    return (
        <div className="w-full overflow-x-auto rounded-2xl bg-[#59585814] px-2 py-1.5 no-scrollbar">
            <div className="flex min-w-max gap-2 md:min-w-0">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.value;
                    return (
                        <button
                            key={tab.value}
                            type="button"
                            onClick={() => onChange(tab.value)}
                            className={`min-w-[110px] shrink-0 cursor-pointer whitespace-nowrap rounded-xl px-4 py-2 lg:py-3 font-semibold transition-colors duration-200 md:min-w-0 md:flex-1 ${isActive
                                ? "bg-white text-primary shadow-sm"
                                : "text-muted hover:text-black"
                                }`}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}