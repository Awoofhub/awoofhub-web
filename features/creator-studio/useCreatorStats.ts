import CreatorStudioService from '@/services/creator-studio-service';
import { CreatorStats } from '@/types/creator-studio';
import { useQuery } from '@tanstack/react-query';

export const GetCreatorStats = async (): Promise<CreatorStats> => {
    const result = await CreatorStudioService.stats()
    return result.data;
};

export const useCreatorMonthlyClicks = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['creator', 'stats'],
        queryFn: () => GetCreatorStats(),
        refetchInterval: 180000,
    });

    return { data, isLoading };
};