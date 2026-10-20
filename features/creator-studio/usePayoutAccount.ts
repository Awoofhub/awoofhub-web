import CreatorStudioService from '@/services/creator-studio-service';
import { BankAccount } from '@/types/creator-studio';
import { useQuery } from '@tanstack/react-query';

export const getAccount = async (): Promise<BankAccount> => {
    const result = await CreatorStudioService.getAccount()
    return result.data;
};

export const usePayoutAccount = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['payout', 'account'],
        queryFn: () => getAccount(),
    });

    return { data, isLoading };
};