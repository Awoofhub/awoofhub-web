"use client"
import BoostService from "@/services/boost-service";
import { useMutation, useQueryClient } from '@tanstack/react-query';

type CreateImpressionOptions = {
    id: string;
    onSuccess?: () => void;
};

export const CreateImpression = async ({ id }: CreateImpressionOptions): Promise<any> => {
    const result = await BoostService.createImpression(id);
    return result.data
};

export const useCreateImpression = ({ id, onSuccess = () => {} }: CreateImpressionOptions) => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: () => CreateImpression({ id }),
        onSuccess: (data) => {
            queryClient.setQueryData(['impression', id], data);
            onSuccess?.();
        },
    });

    return { createImpression: mutate, isPending };
};
