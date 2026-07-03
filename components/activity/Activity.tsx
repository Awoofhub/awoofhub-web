"use client"
import { useActivityMarkAsRead } from "@/features/activity/useActivityMarkAsRead";
import { ActivityData } from '@/types/activity';
import { useRouter } from "next/navigation";
import ActivityCard from "./ActivityCard";
import { ActivityType } from "./ActivityIcon";


interface Props {
    prop: ActivityData;
}

const getNavigationHref = (type: ActivityType, entityId: string): string | null => {
    switch (type) {
        case 'user_suspended':
            return "/";

        case 'offer_alert':
            return `/offers/${entityId}`;
            
        case 'offer_pending':
        case 'offer_approved':
        case 'offer_expiring':
        case 'offer_rejected':
        case 'offer_suspended':
        case 'offer_expired': {
            const tabByType: Partial<Record<ActivityType, string>> = {
                offer_pending: 'pending',
                offer_approved: 'approved',
                offer_expiring: 'approved',
                offer_rejected: 'rejected',
                offer_suspended: 'suspended',
                offer_expired: 'expired',
            };
            return `/my-offers?tab=${tabByType[type]}&offerId=${entityId}`;
        }

       
        default:
            return null;
    }
};

export default function Activity({ prop }: Props) {
    const router = useRouter();
    const { markAsRead } = useActivityMarkAsRead({ id: prop.id });

    const href = getNavigationHref(prop.type, prop.entityId);

    if (!href) return null;

    const navigate = (href: string) => () => {
        router.push(href);

        // Set the notification as read
        if (prop.isRead) return;
        markAsRead();
    };

    return (
        <ActivityCard
            title={prop.title}
            createdAt={prop.createdAt}
            isRead={prop.isRead}
            message={prop.message}
            type={prop.type}
            payload={prop.payload}
            onClick={navigate(href)}
        />
    );
}