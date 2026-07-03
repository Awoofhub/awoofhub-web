"use client"
import { useActivityMarkAsRead } from "@/features/activity/useActivityMarkAsRead";
import { ActivityData } from '@/types/activity';
import { useRouter } from "next/navigation";
import ActivityCard from "./ActivityCard";
import { ActivityType } from "./ActivityIcon";


interface Props {
    prop: ActivityData;
}

const ACTIVITY_TAB_MAP: Partial<Record<ActivityType, string>> = {
    offer_pending: "pending",
    offer_alert: "approved",
    offer_approved: "approved",
    offer_expiring: "approved",
    offer_rejected: "rejected",
    offer_suspended: "suspended",
    offer_expired: "expired",
};

const getNavigationHref = (type: ActivityType, entityId: string): string | null => {
    const tab = ACTIVITY_TAB_MAP[type];
    if (!tab) return null;

    return `/my-offers?tab=${tab}&offerId=${entityId}`;
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