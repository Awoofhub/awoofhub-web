import SubscriptionService from '@/services/subscription.service';
import { useMutation } from '@tanstack/react-query';

export const ManageSubscription = async (): Promise<string> => {
    const result = await SubscriptionService.manage();
    return result.data;
};

export const useManageSubscription = () => {
    const { mutate, isPending } = useMutation({
        mutationFn: ManageSubscription,
        onSuccess: (link) => {
            window.location.href = link;
        },
    });

    return {
        manage: mutate,
        isLoading: isPending,
    };
};