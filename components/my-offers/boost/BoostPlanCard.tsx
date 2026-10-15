import { CheckCircle2 } from "lucide-react";

interface Props {
    name: string;
    price: string;
    description: string;
    features: string[];
    selected: boolean;
    onSelect: () => void;
}

export default function BoostPlanCard({ name, price, description, features, selected, onSelect, }: Props) {

    return (
        <div
            onClick={onSelect}
            className={`bg-white rounded-xl p-5 border cursor-pointer transition-all relative flex flex-col justify-between ${selected ? 'border-orange-500 ring-1 ring-orange-500 shadow-sm' : 'shadow-sm border-gray-200 hover:border-gray-300'}`}
        >

            <div className="flex items-start mb-2 space-x-2.5">
                <input
                    type="radio"
                    readOnly
                    checked={selected}
                    name="boostType"
                    className="h-4 w-4 mt-1 border-2 border-[#FE4F04]  accent-[#FE4F04]"
                />
                <div className="flex flex-col">
                    <span className="font-semibold text-gray-900 text-sm">{name}</span>
                    <p className="text-xs text-muted">{description}</p>
                </div>
            </div>

            <div className="font-semibold text-2xl font-baloo text-gray-900 mb-2">
                {price}
            </div>

            {/* Features List */}
            <div className="space-y-2.5">
                {features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-xs text-muted">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2CAB2C] mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                    </div>
                ))}
            </div>

        </div>
    );

}