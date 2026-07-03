import ActivityService from "@/services/activity-service";
import { ActivityData } from "@/types/activity";
import { ApiResponse } from "@/types/api-response";
import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";

export const markAllAsRead = async (): Promise<{}> => {
    const result = await ActivityService.markAllAsRead();
    return result.data
};


export function useActivityMarkAllAsRead() {
    const queryClient = useQueryClient();
    const queryKey = ['notifications'];

    const { mutate, isPending } = useMutation({
        mutationFn: () => markAllAsRead(), 
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey });
            const previousNotifications = queryClient.getQueryData(queryKey);

            queryClient.setQueryData<InfiniteData<ApiResponse<ActivityData[]>>>(queryKey, (oldData) => {
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