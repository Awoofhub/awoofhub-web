'use client'
import OfferService from '@/services/offer-service';
import { Offer } from '@/types/offer';
import { useQuery } from '@tanstack/react-query';

type GetTrendingOffersOptions = {
    page: number,
    limit: number,
};

export const getTrendingOffers = async ({ page, limit }: GetTrendingOffersOptions): Promise<Offer[]> => {
    const result = await OfferService.trendingOffers(page, limit);
    return result.data;
};

export const useTrendingOffers = ({ page = 1, limit = 8 }: GetTrendingOffersOptions) => {
    const { data, isFetching, isFetched } = useQuery({
        queryKey: ["trendingOffers"],
        queryFn: () => getTrendingOffers({ page, limit }),
        initialData: []
    });

    return {
        data,
        isFetching,
        isFetched
    };
};