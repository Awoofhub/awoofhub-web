
interface Props {
    activeTab: string | undefined;
    onChange: (tab: string) => void;
    tabs: { label: string; value: string; }[];
}

export default function CreatorStatsTabs({ tabs, activeTab, onChange }: Props) {
    return (
        <div className="overflow-hidden rounded-2xl bg-gray-100">
            <div className="flex max-w-xl">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.value;
                    return (
                        <button
                            key={tab.value}
                            onClick={() => onChange(tab.value)}
                            className={`relative flex-1 cursor-pointer py-3 text-sm font-medium text-gray-500 transition-colors duration-200 ${isActive ? "text-gray-900" : ""
                                }`}
                        >
                            {tab.label}

                            <span
                                className={`absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-primary transition-all duration-200 ${isActive
                                        ? "scale-x-100 opacity-100"
                                        : "scale-x-0 opacity-0"
                                    }`}
                            />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}