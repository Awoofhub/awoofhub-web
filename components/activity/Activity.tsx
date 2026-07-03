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
            return `/offers/${entityId}`
        case 'offer_pending':
            return `/offers/${entityId}`
        case 'offer_alert':
            return "/"
        case 'offer_approved':
            return "/"
        case 'offer_rejected':
            return "/"
        case 'offer_suspended':
            return "/"
        case 'offer_expiring':
            return "/"
        case 'offer_expired':
            return "/"

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