import CreatorStudioService from '@/services/creator-studio-service';
import { Payout } from '@/types/creator-studio';
import { useQuery } from '@tanstack/react-query';

export const getPayouts = async (): Promise<Payout[]> => {
    const result = await CreatorStudioService.payouts();
    return result.data;
};

export const usePayouts = () => {
    const { data, isFetching, isFetched } = useQuery({
        queryKey: ['payouts'],
        queryFn: () => getPayouts(),
        initialData: []
    });

    return {
        data,
        isFetching,
        isFetched
    };
};

