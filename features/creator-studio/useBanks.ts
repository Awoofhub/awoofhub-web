import CreatorStudioService from '@/services/creator-studio-service';
import { Bank } from '@/types/creator-studio';
import { useQuery } from '@tanstack/react-query';

export const getBanks = async (): Promise<Bank[]> => {
    const result = await CreatorStudioService.getBanks();
    return result.data;
};

export const useBanks = () => {
    const { data, isFetching, isFetched } = useQuery({
        queryKey: ['banks'],
        queryFn: () => getBanks(),
        initialData: []
    });

    return {
        data,
        isFetching,
        isFetched
    };
};

