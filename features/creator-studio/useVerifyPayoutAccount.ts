import CreatorStudioService from "@/services/creator-studio-service";
import { AccountData, VerifiedAccount } from "@/types/creator-studio";
import { useMutation } from '@tanstack/react-query';

type UseVerifyAccountOptions = {
    onSuccess?: (data: VerifiedAccount) => void;
};

export const verifyAccount = async (data: AccountData): Promise<VerifiedAccount> => {
    const result = await CreatorStudioService.verifyAccount(data);
    return result.data;
};

export const useVerifyPayoutAccount = ({ onSuccess }: UseVerifyAccountOptions = {}) => {

    const { mutate: submit, isPending } = useMutation({
        mutationFn: verifyAccount,
        onSuccess: (data) => {
            onSuccess?.(data);
        },
    });

    return { submit, isPending };
};
