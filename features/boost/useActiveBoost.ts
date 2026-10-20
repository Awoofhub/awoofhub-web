import BoostService from "@/services/boost-service";
import { BoostData } from "@/types/boost";
import { useQuery } from '@tanstack/react-query';


type GetActiveBoostOptions = {
    id: string;
};

export const activeBoost = async ({ id }: GetActiveBoostOptions): Promise<BoostData> => {
    const result = await BoostService.activeBoost(id);
    return result.data;
};

export const useActiveBoost = ({ id }: GetActiveBoostOptions) => {
    const { data, isLoading } = useQuery({
        queryKey: ['boost', 'offer', id],
        queryFn: () => activeBoost({ id }),
    })

    return { data, isLoading };
};
