import OfferService from "@/services/offer-service";
import { Offer, UpdateOfferData } from "@/types/offer";
import { useMutation, useQueryClient } from '@tanstack/react-query';


type UseUpdateOfferOptions = {
    id: string,
    onSuccess?: (offer: Offer) => void;
};


export const updateOffer = async ({ id }: UseUpdateOfferOptions, payload: UpdateOfferData): Promise<Offer> => {
    const result = await OfferService.updateOffer(id, payload);
    return result.data;
};

export const useUpdateOffer = ({ id, onSuccess }: UseUpdateOfferOptions) => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: UpdateOfferData) => updateOffer({ id }, payload),
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