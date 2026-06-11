import { IconType } from "react-icons";


interface Props {
    field: string;
    value: string | null;
    Icon: IconType;
}

export function AboutItem({ field, value, Icon }: Props) {
    return (
        <div className="flex items-start">
            <div className="flex items-center gap-2 rounded-l-3xl bg-gray-300 p-2 sm:gap-3">
                <Icon className="h-5 w-5 stroke-gray-800" />
                <p className="font-medium text-gray-800 text-sm lg:text-base">{field}</p>
            </div>
            <p className="flex flex-1 items-center self-stretch rounded-r-3xl border border-gray-300 px-4 break-all">
                <span className="font-semibold text-foreground text-sm lg:text-base">{value || 'Not set'}</span>
            </p>
        </div>
    );
}