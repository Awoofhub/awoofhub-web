import OfferService from "@/services/offer-service";
import { Offer, UpdateOfferData } from "@/types/offer";
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const updateOffer = async (id: string, payload: UpdateOfferData): Promise<Offer> => {
    const result = await OfferService.updateOffer(id, payload);
    return result.data;
};

type UseUpdateOfferOptions = {
    onSuccess?: (offer: Offer) => void;
};

export const useUpdateOffer = ({ onSuccess }: UseUpdateOfferOptions = {}) => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation<Offer, Error, { id: string; payload: UpdateOfferData }>({
        mutationFn: ({ id, payload }) => updateOffer(id, payload),
        onSuccess: (data) => {
            queryClient.setQueryData(['offers', data.id], data);
            queryClient.invalidateQueries({ queryKey: ['offers', "userId", data.contributor.id] });
            queryClient.invalidateQueries({ queryKey: ['offers', 'mine'] });
            queryClient.invalidateQueries({ queryKey: ['offers', 'mine', 'tabs-count'] });
            onSuccess?.(data);
        },
    });

    return {
        submit: (id: string, payload: UpdateOfferData) => mutate({ id, payload }),
        isPending,
    };
};