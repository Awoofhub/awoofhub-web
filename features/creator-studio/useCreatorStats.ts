import CreatorStudioService from '@/services/creator-studio-service';
import { CreatorStats } from '@/types/creator-studio';
import { useQuery } from '@tanstack/react-query';


type GetCreatorStatsOption = {
    dateFilter?: string
};


export const GetCreatorStats = async ({ dateFilter }: GetCreatorStatsOption): Promise<CreatorStats> => {
    const result = await CreatorStudioService.stats(dateFilter)
    return result.data;
};

export const useCreatorStats = ({ dateFilter }: GetCreatorStatsOption = {}) => {
    const { data, isLoading } = useQuery({
        queryKey: ['creator', 'stats', dateFilter],
        queryFn: () => GetCreatorStats({ dateFilter }),
        refetchInterval: 180000,
    });

    return { data, isLoading };
};
