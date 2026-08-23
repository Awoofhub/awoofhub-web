import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { NotificationData } from "@/types/notification";


async function getAllNotifications(page: number, limit: number): Promise<ApiResponse<NotificationData[]>> {
    const res: ApiResponse<NotificationData[]> = await apiClient.get('/notifications/', {
        params: { page, limit },
    })

    return res;
}

async function getActivityCount(): Promise<ApiResponse<{unread: number}>> {
    const res: ApiResponse<{unread: number}> = await apiClient.get("/notifications/unread/")
    return res;
}

async function markAsRead(id: string): Promise<ApiResponse<{}>> {
    const res: ApiResponse<{}> = await apiClient.patch(`/notifications/${id}/read`)
    return res;
}


async function markAllAsRead(): Promise<ApiResponse<{}>> {
    const res: ApiResponse<{}> = await apiClient.patch('/notifications/read-all');
    return res;
}


const NotificationService = {
    getAllNotifications,
    getActivityCount,
    markAsRead,
    markAllAsRead
};

export default NotificationService;
