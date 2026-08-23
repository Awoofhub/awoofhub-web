"use client"
import { useNotificationMarkAsRead } from "@/features/notification/useNotificationMarkAsRead";
import { NotificationData } from '@/types/notification';
import { useRouter } from "next/navigation";
import NotificationCard from './NotificationCard';
import { NotificationType } from "./NotificationIcon";


interface Props {
    prop: NotificationData;
}

const getNavigationHref = (type: NotificationType, entityId: string): string | null => {
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
            const tabByType: Partial<Record<NotificationType, string>> = {
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

export default function Notification({ prop }: Props) {
    const router = useRouter();
    const { markAsRead } = useNotificationMarkAsRead({ id: prop.id });

    const href = getNavigationHref(prop.type, prop.entityId);

    if (!href) return null;

    const navigate = (href: string) => () => {
        router.push(href);

        // Set the notification as read
        if (prop.isRead) return;
        markAsRead();
    };

    return (
        <NotificationCard
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