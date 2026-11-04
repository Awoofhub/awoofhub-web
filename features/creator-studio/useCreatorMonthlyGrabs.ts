import CreatorStudioService from '@/services/creator-studio-service';
import { CreatorMonthlyGrabs } from '@/types/creator-studio';
import { useQuery } from '@tanstack/react-query';

export const GetCreatorMonthlyGrabs = async (): Promise<CreatorMonthlyGrabs> => {
    const result = await CreatorStudioService.monthlyGrabs()
    return result.data;
};

export const useCreatorMonthlyGrabs = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['creator', 'grabs', 'chart'],
        queryFn: () => GetCreatorMonthlyGrabs(),
        refetchInterval: 180000,
    });

    return { data, isLoading };
};