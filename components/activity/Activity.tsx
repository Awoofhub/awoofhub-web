"use client"
import { useActivityReadStatus } from "@/features/activity/useActivityReadStatus";
import { ActivityData } from '@/types/activity';
import { useRouter } from "next/navigation";
import ActivityCard from "./ActivityCard";


interface Props {
  prop: ActivityData;
}

function getTabFromType(type: string) {
    const normalized = type.toLowerCase();

    if (normalized.includes('pending')) return 'pending';
    if (normalized.includes('rejected')) return 'rejected';
    if (normalized.includes('suspended')) return 'suspended';
    if (normalized.includes('expired')) return 'expired';
    if (normalized.includes('approved') || normalized.includes('active')) return 'approved';

    return 'all';
}

function isOfferNotification(type: string, entityType?: string) {
    const normalizedType = type.toLowerCase();
    const normalizedEntityType = entityType?.toLowerCase();

    return normalizedType.includes('offer') || normalizedEntityType === 'offer';
}

export default function Activity({ prop }: Props) {
    const router = useRouter();
    const { markAsRead } = useActivityReadStatus({ id: prop.id });

    const navigate = (href: string) => () => {
        router.push(href);

        if (prop.isRead) return;
        markAsRead();
    };

    const offerId = prop.payload?.id || prop.entityId;
    const offerTitle = prop.payload?.title || prop.title || '';

    const actionHref = isOfferNotification(prop.type, prop.entityType)
        ? offerId
            ? (() => {
                const params = new URLSearchParams({
                    tab: getTabFromType(prop.type),
                    offerId,
                });

                if (offerTitle) {
                    params.set('offerTitle', offerTitle);
                }

                return `/my-offers?${params.toString()}`;
            })()
            : undefined
        : '/';

    // Use payload imageUrl if available, fallback to imageUrl
    const displayImageUrl = prop.payload?.imageUrl || prop.imageUrl;

    return (
        <ActivityCard
            title={prop.title}
            createdAt={prop.createdAt}
            isRead={prop.isRead}
            message={prop.message}
            type={prop.type}
            imageUrl={displayImageUrl}
            payloadTitle={prop.payload?.title || prop.title}
            onClick={actionHref ? navigate(actionHref) : undefined}
        />
    );
}