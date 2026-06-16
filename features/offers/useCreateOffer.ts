import OfferService from "@/services/offer-service";
import { CreateOfferData, Offer } from "@/types/offer";
import { useMutation, useQueryClient } from '@tanstack/react-query';


export const createOffer = async (data: CreateOfferData): Promise<Offer> => {
    const result = await OfferService.createOffer(data);
    return result.data;
};

type UseCreateOfferOptions = {
    onSuccess?: (offer: Offer) => void;
};

export const useCreateOffer = ({ onSuccess }: UseCreateOfferOptions = {}) => {
    const queryClient = useQueryClient();

    const { mutate: submit, isPending } = useMutation<Offer, Error, CreateOfferData>({
        mutationFn: createOffer,
        onSuccess: (data) => {
            queryClient.setQueryData(['offers', data.id], data);
            queryClient.invalidateQueries({ queryKey: ['offers', "userId", data.contributor.id] });
            onSuccess?.(data);
        },
    });

    return { submit, isPending };
};
