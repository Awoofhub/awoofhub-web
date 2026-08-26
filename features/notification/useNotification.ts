import NotificationService from '@/services/notification-service';
import { ApiResponse } from '@/types/api-response';
import { NotificationData } from '@/types/notification';
import { useInfiniteQuery } from '@tanstack/react-query';


type GetActivityOptions = {
    page?: number,
    limit: number,
};

export const getNotification = ({ page = 1, limit }: GetActivityOptions): Promise<ApiResponse<NotificationData[]>> => {
    return NotificationService.getAllNotifications(page, limit);
};

export const useNotification = ({ limit = 6 }: GetActivityOptions) => {
    const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isError, error } = useInfiniteQuery({
        queryKey: ['notifications'],
        queryFn: ({ pageParam = 1 }) => getNotification({ page: pageParam, limit }),

        getNextPageParam: (lastPage) => {
            if (!lastPage.meta) return undefined;

            const currentPage = Number(lastPage.meta.page);
            const totalPages = Number(lastPage.meta.totalPages);

            return currentPage < totalPages ? currentPage + 1 : undefined;
        },
        initialPageParam: 1,

    });

    return {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        isError, 
        error
    };
};

