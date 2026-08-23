import { NotificationType } from "@/components/notification/NotificationIcon";
import { User } from "@/types/user";

export interface NotificationData {
    id: string;
    user: User;
    type: NotificationType;
    title: string;
    message: string;
    entityType: 'offer' | 'user';
    entityId: string;
    payload: any;
    isRead: boolean;
    createdAt: string;
}; 

