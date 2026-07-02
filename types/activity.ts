import { ActivityType } from "@/components/activity/ActivityIcon";
import { User } from "@/types/user";

export interface ActivityData {
    id: string;
    user: User;
    type: ActivityType;
    title: string;
    message: string;
    entityType: 'offer' | 'user';
    entityId: string;
    payload: any;
    isRead: boolean;
    createdAt: string;
}; 

