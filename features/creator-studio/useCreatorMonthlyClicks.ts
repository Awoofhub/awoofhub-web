import CreatorStudioService from '@/services/creator-studio-service';
import { CreatorMonthlyClicks } from '@/types/creator-studio';
import { useQuery } from '@tanstack/react-query';

export const GetCreatorMonthlyClicks = async (): Promise<CreatorMonthlyClicks> => {
    const result = await CreatorStudioService.monthlyClicks()
    return result.data;
};

export const useCreatorMonthlyClicks = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['creator', 'clicks', 'chart'],
        queryFn: () => GetCreatorMonthlyClicks(),
        refetchInterval: 180000,
    });

    return { data, isLoading };
};