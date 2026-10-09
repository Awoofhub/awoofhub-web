import CreatorStudioService from '@/services/creator-studio-service';
import { CreatorTopOffers } from '@/types/creator-studio';
import { useQuery } from '@tanstack/react-query';

export const GetCreatorTopOffers = async (): Promise<CreatorTopOffers> => {
    const result = await CreatorStudioService.topOffers()
    return result.data;
};

export const useCreatorTopOffers = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['creator', 'top', 'offers'],
        queryFn: () => GetCreatorTopOffers(),
    });

    return { data, isLoading };
};