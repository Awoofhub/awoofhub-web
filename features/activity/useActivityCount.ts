import ActivityService from "@/services/activity-service";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "../user/useUser";

export const getActivityCount = async (): Promise<number> => {
    const result = await ActivityService.getActivityCount();
    return result.data.unread;
};


export const useActivityCount = () => {
    const { data: user } = useUser();

    const { data, isFetching, isFetched } = useQuery({
        queryKey: ['notifications', 'count'],
        queryFn: () => getActivityCount(),
        refetchInterval: 5000,
        enabled: !!user,
    });

    return {
        data,
        isFetching,
        isFetched
    };
};
