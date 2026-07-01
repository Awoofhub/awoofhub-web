import { User } from "@/types/user";

export interface NotificationPayload {
    id: string;
    title: string;
    imageUrl?: string;
}

export interface ActivityData {
    id: string;
    user: User;
    type: string;
    title: string;
    message: string;
    entityId: string;
    entityType?: string;
    isRead: boolean;
    createdAt: string;
    imageUrl?: string;
    payload?: NotificationPayload;
}; 

