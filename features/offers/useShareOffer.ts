"use client"
import OfferService from "@/services/offer-service";
import { User } from '@/types/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type shareOfferOptions = {
    id: string;
    onSuccess?: (user: User) => void;
};

export const ShareOffer = async ({ id }: shareOfferOptions): Promise<any> => {
    const result = await OfferService.share(id);
    return result.data
};

export const useShareOffer = ({ id, onSuccess = () => {} }: shareOfferOptions) => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: () => ShareOffer({ id }),
        onSuccess: (data) => {
            queryClient.setQueryData(['share', id], data);
            onSuccess?.(data);
        },
    });

    return { shareOffer: mutate, isPending };
};
