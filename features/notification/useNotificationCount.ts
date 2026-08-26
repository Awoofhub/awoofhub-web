import ActivityService from "@/services/notification-service";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "../user/useUser";

export const getNotificationCount = async (): Promise<number> => {
    const result = await ActivityService.getActivityCount();
    return result.data.unread;
};


export const useNotificationCount = () => {
    const { data: user } = useUser();

    const { data, isFetching, isFetched } = useQuery({
        queryKey: ['notifications', 'count'],
        queryFn: () => getNotificationCount(),
        refetchInterval: 5000,
        enabled: !!user,
    });

    return {
        data,
        isFetching,
        isFetched
    };
};
