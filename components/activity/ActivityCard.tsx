import { cn } from "@/lib/utils";
import { formatTimeAgo } from "@/utils/formatTimeAgo";
import Image from "next/image";
import { ComponentProps } from "react";
import { ActivityIcon, ActivityType } from "./ActivityIcon";

interface ActivityCardProps extends ComponentProps<'div'> {
    title: string;
    type: ActivityType;
    message: string;
    isRead: boolean;
    createdAt: string;
    payload: any;
}

export default function ActivityCard({ type, title, isRead, createdAt, payload, message, ...rest }: ActivityCardProps) {

    return (

        <div
            className={cn(
                "w-full cursor-pointer max-w-full mx-auto border border-gray-100 rounded-2xl py-3 px-2 xs:px-4 lg:py-4 lg:px-6 flex items-center gap-4 transition-colors",
                !isRead ? "bg-[#FFD5C357] border-l-primary border-l-3 hover:border-orange-400" : "bg-white hover:border-orange-300"
            )}
            {...rest}>


            <div className="flex min-w-0 flex-1 flex-col gap-1 xs:gap-2">
                <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex flex-1 flex-row items-center gap-2">

                        <ActivityIcon type={type} />

                        <h3 className="text-sm md:text-base font-bold  text-black">
                            {title}
                        </h3>

                        {!isRead && <div className="bg-primary w-1 h-1 xs:w-1.5 xs:h-1.5 rounded" />}

                    </div>

                    <span className="whitespace-nowrap text-xs text-primary">
                        {formatTimeAgo(createdAt)}
                    </span>
                </div>

                <p className="text-xs xs:text-sm font-medium text-gray-900 xs:mb-2">
                    {message}
                </p>

                <div className="flex items-center gap-2">
                    <div className="flex-shrink-0 w-10 h-10 xs:w-12.5 xs:h-12.5 overflow-hidden rounded-lg border border-gray-100 bg-gray-200 ">
                        {payload?.imageUrl && (
                            <Image
                                src={payload.imageUrl}
                                alt={title}
                                priority
                                width={100}
                                height={100}
                                className="h-full w-full object-fill"
                            />
                        )}

                    </div>
                    {payload?.title && (
                        <p className="text-[10px] xs:text-xs text-muted italic">
                            {payload.title}
                        </p>
                    )}
                </div>
            </div>
        </div>

    )
}