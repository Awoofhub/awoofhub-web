import BoostService from "@/services/boost-service";
import { useQuery } from '@tanstack/react-query';


export const hasActiveBoost = async (): Promise<boolean> => {
    const result = await BoostService.hasActiveBoost();
    return result.data.hasActiveBoost;
};

export const useHasActiveBoost = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['boost', 'active'],
        queryFn: () => hasActiveBoost(),
    })

    return { data, isLoading };
};
