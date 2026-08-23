import NotificationService from "@/services/notification-service";
import { ApiResponse } from "@/types/api-response";
import { NotificationData } from "@/types/notification";
import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";

type NotificationOptions = {
    id: string;
};

export const markAsRead = async ({ id }: NotificationOptions): Promise<{}> => {
    const result = await NotificationService.markAsRead(id);
    return result.data
};

export function useNotificationMarkAsRead({ id }: NotificationOptions) {
    const queryClient = useQueryClient();
    const queryKey = ['notifications']

    const { mutate } = useMutation({
        mutationFn: () => markAsRead({ id }),
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey });
            const previousNotifications = queryClient.getQueryData(queryKey);

            queryClient.setQueryData<InfiniteData<ApiResponse<NotificationData[]>>>(queryKey, (oldData) => {
                if (!oldData) return oldData

                return {
                    ...oldData,
                    pages: oldData.pages.map((page) => ({
                        ...page,
                        data: page.data.map((activity) =>
                            activity.id === id
                                ? { ...activity, isRead: true }
                                : activity
                        ),
                    })),
                };
            });
            return { previousNotifications };
        },

        onError: (err, variables, context) => {
            queryClient.setQueryData(queryKey, context?.previousNotifications);
        },
    });

    return { markAsRead: mutate };

}



