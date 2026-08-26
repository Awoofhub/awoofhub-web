'use client'
import OfferService from '@/services/offer-service';
import { MyOffersTabsCount } from '@/types/offer';
import { useQuery } from '@tanstack/react-query';


export const getMyOffersTabsCount = async (): Promise<MyOffersTabsCount> => {
    const result = await OfferService.myOffersTabsCount();
    return result.data;
};


export const useMyOffersTabsCount = () => {
    const { data, isFetching, isFetched } = useQuery({
        queryKey: ['offers', 'mine', 'tabs-count'],
        queryFn: () => getMyOffersTabsCount(),
        refetchInterval: 60_000,
        refetchOnWindowFocus: true,
    });

    return { data, isFetching, isFetched };
};

