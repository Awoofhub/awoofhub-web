'use client'
import OfferService from '@/services/offer-service';
import { ApiResponse } from '@/types/api-response';
import { Offer } from '@/types/offer';
import { useInfiniteQuery } from '@tanstack/react-query';

type GetMyOffersOptions = {
    search: string,
    category: string,
    minRating: number,
    createdFrom: string,
    createdTo: string,
    page?: number,
    limit: number,
    tab?: string,
};

export const getMyOffers = ({ search, category, minRating, createdFrom, createdTo, page = 1, limit, tab = "all" }: GetMyOffersOptions): Promise<ApiResponse<Offer[]>> => {
    return OfferService.myOffers(search, category, minRating, createdFrom, createdTo, page, limit, tab);
};

export const useMyOffers = ({ search, category, minRating, createdFrom, createdTo, limit = 8, tab = "all" }: GetMyOffersOptions) => {
    const { data, isFetched, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage, isError, error } = useInfiniteQuery({
        queryKey: ['offers', 'mine', search, category, minRating, createdFrom, createdTo, limit, tab],
        queryFn: ({ pageParam = 1 }) => getMyOffers({ search, category, minRating, createdFrom, createdTo, page: pageParam, limit, tab }),

        getNextPageParam: (lastPage) => {
            if (!lastPage.meta) return undefined;
            const currentPage = Number(lastPage.meta.page);
            const totalPages = Number(lastPage.meta.totalPages);
            return currentPage < totalPages ? currentPage + 1 : undefined;
        },
        initialPageParam: 1,
    });

    return { data, isFetched, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage, isError, error };
};