import { Bell, Clock } from 'lucide-react';

function DefaultNotificationIcon() {
    return <Bell className="w-6 h-6 text-orange-600" />;
}

function OfferPendingIcon() {
    return <Clock className="w-6 h-6 text-amber-600" />;
}

const ActivityIcons: Record<string, () => TSX.Element> = {
    OFFER_CREATED: () => <DefaultNotificationIcon />,
    offer_pending: () => <OfferPendingIcon />,
    POST_LIKE: () => <DefaultNotificationIcon />,
};

export type ActivityType = string;

export function ActivityIcon({ type }: { type: ActivityType }) {
    const Icon = ActivityIcons[type] ?? DefaultNotificationIcon;

    return (
        <div className="bg-orange-50 rounded-full p-2">
            <Icon />
        </div>
    );
}