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
                "w-full cursor-pointer max-w-full mx-auto border border-gray-100 rounded-xl py-3 px-4 sm:py-4 sm:px-6 flex items-center gap-4 transition-colors ",
                !isRead ? "bg-orange-100 border-l-red-600 border-l-2 hover:border-orange-200" : "bg-white hover:border-orange-300"
            )}
            {...rest}>


            <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex flex-1 flex-row items-center gap-3">

                        <ActivityIcon type={type} />

                        <p className="text-sm font-semibold text-gray-600 leading-relaxed line-clamp-2">
                            {title}
                        </p>

                        {!isRead && <div className="bg-orange-600 w-1.5 h-1.5 rounded" />}

                    </div>

                    <span className="whitespace-nowrap text-xs sm:text-sm font-semibold text-orange-500">
                        {formatTimeAgo(createdAt)}
                    </span>
                </div>

                <p className="text-sm font-semibold text-gray-600 leading-relaxed line-clamp-2">
                    {message}
                </p>

                <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-14 h-14 overflow-hidden rounded-lg border border-gray-100 bg-gray-50 ">
                        {payload?.imageUrl && (
                            <Image
                                src={payload.imageUrl}
                                alt={title}
                                priority
                                width={100}
                                height={100}
                                className="h-full w-full object-cover"
                            />
                        )}

                    </div>
                    {payload?.title && (
                        <p className=" text-sm text-gray-600 line-clamp-1">
                            {payload.title}
                        </p>
                    )}
                </div>
            </div>
        </div>

    )
}