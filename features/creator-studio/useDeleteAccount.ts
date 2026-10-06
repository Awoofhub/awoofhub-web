"use client"
import CreatorStudioService from "@/services/creator-studio-service";
import { useMutation, useQueryClient } from '@tanstack/react-query';

type deleteAccountOptions = {
    id: string;
};

export const DeleteAccount = async ({ id }: deleteAccountOptions): Promise<any> => {
    const result = await CreatorStudioService.deleteAccount(id);
    return result.data
};

export const useDeleteAccount = ({ id }: deleteAccountOptions) => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: () => DeleteAccount({ id }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['payout', 'account'] });
        },
    });

    return { deleteAccount: mutate, isPending };
};
