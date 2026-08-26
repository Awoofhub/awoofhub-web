import NotificationService from "@/services/notification-service";
import { ApiResponse } from "@/types/api-response";
import { NotificationData } from "@/types/notification";
import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";

export const markAllAsRead = async (): Promise<{}> => {
    const result = await NotificationService.markAllAsRead();
    return result.data
};


export function useNotificationMarkAllAsRead() {
    const queryClient = useQueryClient();
    const queryKey = ['notifications'];

    const { mutate, isPending } = useMutation({
        mutationFn: () => markAllAsRead(), 
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey });
            const previousNotifications = queryClient.getQueryData(queryKey);

            queryClient.setQueryData<InfiniteData<ApiResponse<NotificationData[]>>>(queryKey, (oldData) => {
                if (!oldData) return oldData;

                return {
                    ...oldData,
                    pages: oldData.pages.map((page) => ({
                        ...page,
                        data: page.data.map((activity) => ({
                            ...activity,
                            isRead: true
                        })),
                    })),
                };
            });

            return { previousNotifications };
        },

        onError: (err, variables, context) => {
            queryClient.setQueryData(queryKey, context?.previousNotifications);
        },
        
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey });
        }
    });

    return { markAllAsRead: mutate, isPending };

}