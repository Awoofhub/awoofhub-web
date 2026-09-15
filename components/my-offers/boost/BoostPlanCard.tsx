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
            className={`bg-white rounded-xl p-5 border cursor-pointer transition-all relative flex flex-col justify-between ${selected ? 'border-orange-500 ring-1 ring-orange-500 shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}
        >
            
                <div className="flex items-center space-x-2.5 mb-3">
                    <input
                        type="radio"
                        readOnly
                        checked={selected}
                        name="boostType"
                        className="h-4 w-4 border-2 border-[#FE4F04]  accent-[#FE4F04]  "
                    />
                    <span className="font-bold text-gray-900 text-sm">{name}</span>
                </div>

                <p className="text-xs text-gray-500 mb-4">{description}</p>

                <div className="text-xl font-black text-gray-900 mb-3">
                    {price}
                </div>

                {/* Features List */}
                <div className="space-y-2.5">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-xs text-gray-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                        </div>
                    ))}
                </div>
        
        </div>
    );

}