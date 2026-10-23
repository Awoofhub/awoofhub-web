import AuthService from '@/services/auth-service';
import { VerifyEmailData } from '@/types/auth';
import { useMutation } from '@tanstack/react-query';

export const verifyEmail = async (data: VerifyEmailData): Promise<any> => {
    const result = await AuthService.verifyEmail(data);
    return result.data;
};

type UseVerifyEmailOptions = {
    onSuccess?: () => void;
    onError?: () => void;
};

export const useVerifyEmail = ({ onSuccess, onError }: UseVerifyEmailOptions = {}) => {
    const { mutate: submit, isPending } = useMutation({
        mutationFn: verifyEmail,
        onSuccess: () => {
            onSuccess?.();
        },
        onError: () => {
            onError?.();
        },
    });
    return { submit, isPending };
};

