import Image from 'next/image';

interface Props {
    label: string;
    value: number | string;
    iconSrc: string;
    iconBg: string;
}

export default function BoostStatsCard({
    label,
    value,
    iconSrc,
    iconBg
}: Props) {
    return (
        <div className="bg-white px-4 py-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-2 xs:gap-4">
            <div className="flex justify-between items-end gap-3">
                <p className="text-muted font-baloo text-sm uppercase font-medium">{label}</p>
                <div className={`p-2 rounded-xl flex items-center justify-center  ${iconBg}`}>
                    <Image src={iconSrc} alt="" width={30} height={30} className="w-5 h-5" />
                </div>
            </div>
            <div className="font-baloo text-xl xs:text-2xl lg:text-3xl font-bold text-gray-900">{value}</div>
        </div>
    );
}