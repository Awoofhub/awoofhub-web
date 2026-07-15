import OfferService from '@/services/offer-service';
import { ApiResponse } from '@/types/api-response';
import { Offer } from '@/types/offer';
import { useInfiniteQuery } from '@tanstack/react-query';


type GetSearchOffersOptions = {
    search: string,
    category: string,
    minRating: number,
    createdFrom: string,
    createdTo: string,
    page?: number,
    limit: number,
    dealType: string,
    location: string
};

export const getOffers = ({ search, category, minRating, createdFrom, createdTo, page = 1, limit, dealType, location }: GetSearchOffersOptions): Promise<ApiResponse<Offer[]>> => {
    return OfferService.offers(search, category, minRating, createdFrom, createdTo, page, limit, dealType, location);
};

export const useOffers = ({ search, category, minRating, createdFrom, createdTo, limit = 8, dealType, location }: GetSearchOffersOptions) => {
    const { data, isFetched, isFetchingNextPage, isLoading, isFetching, fetchNextPage, hasNextPage, isError, error } = useInfiniteQuery({
        queryKey: ['offers', search, category, minRating, createdFrom, createdTo, limit, dealType, location],
        queryFn: ({ pageParam = 1 }) => getOffers({ search, category, minRating, createdFrom, createdTo, page: pageParam, limit, dealType ,location }),

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

