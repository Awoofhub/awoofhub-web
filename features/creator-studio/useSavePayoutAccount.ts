import CreatorStudioService from "@/services/creator-studio-service";
import { AccountData, BankAccount } from "@/types/creator-studio";
import { useMutation, useQueryClient } from '@tanstack/react-query';

type UseSaveAccountOptions = {
    onSuccess?: (data: BankAccount) => void;
};

export const saveAccount = async (data: AccountData): Promise<BankAccount> => {
    const result = await CreatorStudioService.saveAccount(data);
    return result.data;
};


export const useSavePayoutAccount = ({ onSuccess }: UseSaveAccountOptions = {}) => {
    const queryClient = useQueryClient();

    const { mutate: submit, isPending } = useMutation({
        mutationFn: saveAccount,
        onSuccess: (data) => {
            queryClient.setQueryData(['payout', 'account'], data);
            onSuccess?.(data);
        },
    });

    return { submit, isPending };
};
