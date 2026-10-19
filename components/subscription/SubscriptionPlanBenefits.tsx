import { CircleCheckBig } from "lucide-react";
import { PiCrown } from "react-icons/pi";

interface Props {
    title: string;
    features: { name: string; description: string; }[];
    listClassName?: string;
    heading?: string;
}

export default function SubscriptionPlanBenefits({
    title,
    features,
    listClassName,
    heading,
}: Props) {
    return (
        <div className="rounded-xl border border-[#00A95D] bg-white p-4 md:p-5 lg:p-6">
            {heading ? (
                <h1 className="text-base xs:text-lg font-semibold text-black">
                    {heading}
                </h1>
            ) : (
                <h1 className="bg-[#FE4F041A] px-2.5 py-1  rounded-lg max-w-25 flex items-center gap-1 text-sm  font-semibold text-primary">
                    <div className="bg-primary text-[10px] rounded-full flex mx-auto justify-center items-center w-4 h-4">
                        <PiCrown className="text-white" />
                    </div>
                    Premium
                </h1>
            )}
            <h2 className={`mb-4 text-base xs:text-lg ${heading ? "font-normal text-muted" : "mt-2 font-semibold text-black"}`}>
                Here’s what you get with your {title} Plan.
            </h2>

            <ul className={`p-1 xs:p-3 grid gap-6 xs:gap-8 ${listClassName ?? "grid-cols-1 xs:grid-cols-2 lg:grid-cols-3"}`}>
                {features.map((feature) => (
                    <li key={feature.name} className="flex items-start gap-2">
                        <CircleCheckBig className="mt-1 h-4 w-4 shrink-0 text-[#00A95D]" />
                        <div>
                            <h2 className="text-base xs:text-lg font-semibold text-black">{feature.name}</h2>
                            <p className="text-xs xs:text-sm text-muted">{feature.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}