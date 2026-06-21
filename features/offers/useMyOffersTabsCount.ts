'use client'
import OfferService from '@/services/offer-service';
import { MyOffersTabsCount } from '@/types/offer';
import { useQuery } from '@tanstack/react-query';

export const useMyOffersTabsCount = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['offers', 'mine', 'tabs-count'],
        queryFn: async (): Promise<MyOffersTabsCount> => {
            const res = await OfferService.myOffersTabsCount();
            return res.data;
        },
    });

    return { data, isLoading };
};