'use client'
import OfferService from '@/services/offer-service';
import { ApiResponse } from '@/types/api-response';
import { Offer } from '@/types/offer';
import { useQuery } from '@tanstack/react-query';


type GetOffersByBusinessId = {
    search: string,
    category: string,
    minRating: number,
    createdFrom: string,
    createdTo: string,
    page: number,
    limit: number,
};

export const getOffersByBusiness = ({ search, category, minRating, createdFrom, createdTo, page, limit }: GetOffersByBusinessId): Promise<ApiResponse<Offer[]>> => {
    return OfferService.offersByBusiness(search, category, minRating, createdFrom, createdTo, page, limit);
};

export const useOffersByBusiness = ({ search, category, minRating, createdFrom, createdTo, page, limit = 10 }: GetOffersByBusinessId) => {

    const { data, isFetching, isError, error } = useQuery({
        queryKey: ['offers', "business", search, category, minRating, createdFrom, createdTo, page, limit],
        queryFn: () => getOffersByBusiness({ search, category, minRating, createdFrom, createdTo, page, limit }),
    });

    return {
        data,
        isFetching,
        isError,
        error
    };
};

