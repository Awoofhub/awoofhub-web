import AuthService from '@/services/auth-service';
import { ResetPasswordData } from '@/types/auth';
import { useMutation } from '@tanstack/react-query';

export const resetPassword = async (data: ResetPasswordData): Promise<any> => {
    const result = await AuthService.resetPassword(data);
    return result.data;
};

type UseResetPasswordOptions = {
    onSuccess?: () => void;
    onError?: () => void;
};

export const useResetPassword = ({ onSuccess, onError }: UseResetPasswordOptions = {}) => {
    const { mutate: submit, isPending } = useMutation({
        mutationFn: resetPassword,
        onSuccess: () => {
            onSuccess?.();
        },
        onError: () => {
            onError?.();
        },
    });
    return { submit, isPending };
};

