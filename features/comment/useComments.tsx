import CommentService from '@/services/comment-service';
import { ApiResponse } from '@/types/api-response';
import { Comment } from "@/types/comment";
import { useInfiniteQuery } from '@tanstack/react-query';

type GetCommentsOptions = {
    id: string;
    page?: number,
    limit: number,
};

export const getComments = ({ id, page = 1, limit }: GetCommentsOptions): Promise<ApiResponse<Comment[]>> => {
    return CommentService.getCommentsForOffer(id, page, limit);
};

export const useComments = ({ id, limit = 8 }: GetCommentsOptions) => {
    const { data, isFetched, isFetchingNextPage, isLoading, isFetching, fetchNextPage, hasNextPage, isError, error } = useInfiniteQuery({
        queryKey: ['comment', limit],
        queryFn: ({ pageParam = 1 }) => getComments({ id, page: pageParam, limit }),

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
        isFetched,
        isFetching,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isError,
        error
    };
};

