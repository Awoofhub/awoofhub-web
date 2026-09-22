import SubscriptionService from "@/services/subscription.service";
import { SubscriptionData, subscriptionPayload } from "@/types/subscription";
import { useMutation, useQueryClient } from '@tanstack/react-query';

type UseSubscribeOptions = {
    onSuccess?: (subscription: SubscriptionData) => void;
};

export const subscribe = async (payload: subscriptionPayload): Promise<SubscriptionData> => {
    const result = await SubscriptionService.subscribe(payload);
    return result.data;
};

export const useSubscribe = ({ onSuccess }: UseSubscribeOptions = {}) => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: subscribe,
        onSuccess: (data) => {
            onSuccess?.(data);
        },
    });

    const refreshSubscription = async () => {
        await queryClient.refetchQueries({
            queryKey: ["subscription"],
        });
    };

    return {
        submit: mutate,
        isPending,
        refreshSubscription,
    };
};