
interface Props {
    activeTab: string | undefined;
    onChange: (tab: string) => void;
    tabs: { label: string; value: string; }[];
}

export default function CreatorStatsTabs({ tabs, activeTab, onChange }: Props) {
    return (
        <div className="bg-gray-100 p-1.5 rounded-2xl flex max-w-xl">
            {tabs.map((tab) => {
                const isActive = activeTab === tab.value;
                return (
                    <button
                        key={tab.value}
                        onClick={() => onChange(tab.value)}
                        className={`flex-1 py-2 text-sm font-medium rounded-xl transition-all ${isActive
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
}