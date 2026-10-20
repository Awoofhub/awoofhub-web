import BoostService from "@/services/boost-service";
import { BoostOfferData } from "@/types/boost";
import { PaymentData } from "@/types/payment";
import { useMutation, useQueryClient } from '@tanstack/react-query';


type UseBoostOfferOptions = {
    id: string,
    onSuccess?: (payment: PaymentData) => void;
};


export const boostOffer = async ({ id }: UseBoostOfferOptions, payload: BoostOfferData): Promise<PaymentData> => {
    const result = await BoostService.boostOffer(id, payload);
    return result.data;
};

export const useBoostOffer = ({ id, onSuccess }: UseBoostOfferOptions) => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: BoostOfferData) => boostOffer({ id }, payload),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['offers'] });
            onSuccess?.(data);
        },
    });

    return {
        submit: mutate,
        isPending,
    };
};