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
    imageUrl?: string;
    payloadTitle?: string;
    onClick?: () => void;
}

const statusTextMap: Record<string, string> = {
    OFFER_SUSPENDED: 'offerSuspended',
    USER_SUSPENDED: 'userSuspended',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    EXPIRED: 'expired',
    PENDING: 'pending',
    EXPIRING: 'expiring',
};

export default function ActivityCard({
    type,
    title,
    isRead,
    createdAt,
    message,
    imageUrl,
    payloadTitle,
    onClick,
    ...rest
}: ActivityCardProps) {
    const statusLabel = statusTextMap[type] ?? title;
    const statusIconMap: Record<string, string> = {
        approved: '/active.svg',
        pending: '/pending.svg',
        rejected: '/rejected.svg',
        expired: '/expired.svg',
        suspended: '/suspended.svg',
    };
    const statusIcon = statusIconMap[statusLabel.toLowerCase()] ?? null;

    return (
        <div
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            className={cn(
                "w-full cursor-pointer max-w-full mx-auto border border-gray-100 rounded-xl py-3 px-4 sm:py-4 sm:px-6 flex items-center gap-4 transition-colors ",
                !isRead ? "bg-orange-100 border-l-red-600 border-l-2 hover:border-orange-200" : "bg-white hover:border-orange-300"
            )}
            {...rest}>


            <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                       
<h2 className="flex flex-row gap-3 items-center mt-3 text-lg sm:text-lg font-semibold text-gray-900 truncate transition-normal ease-in-out transition">
                            <span className="flex items-center gap-2">
                                
                                {statusIcon ? (
                                    <span className="inline-flex h-5 w-5 items-center justify-center shrink-0">
                                        <Image src={statusIcon} alt={statusLabel} width={20} height={20} />
                                    </span>
                                ) : null}{title}
                            </span>
                            {!isRead ? ( <div className="bg-orange-600 w-1.5 h-1.5 rounded" />) : ( <div className="hidden"/>) }
                        </h2>
                        
                         <p className="text-sm font-semibold text-gray-600 leading-relaxed line-clamp-2">
                    {message}
                </p>
                    
                    </div>

                    <span className="whitespace-nowrap text-xs sm:text-sm font-semibold text-orange-500">
                        {formatTimeAgo(createdAt)}
                    </span>
                </div>
                
                <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-14 h-14 overflow-hidden rounded-lg border border-gray-100 bg-gray-50 ">
                {imageUrl ? (
                    <img
                    src={imageUrl}
                    alt={title}
                    className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-orange-50">
                        <ActivityIcon type={type} />
                    </div>
                )}

                 
            </div>
               {payloadTitle ? (
                            <p className=" text-sm text-gray-600 line-clamp-1">
                                {payloadTitle}
                            </p>
                        ): (
                        null

                        )}
                </div> 

               
            </div>
        </div>
    );
}