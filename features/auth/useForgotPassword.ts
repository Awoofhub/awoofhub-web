import AuthService from "@/services/auth-service";
import { EmailData } from '@/types/auth';
import { useMutation } from '@tanstack/react-query';

export const forgotPassword = async (data: EmailData): Promise<any> => {
    const result = await AuthService.forgotPassword(data);
    return result.data;
};

type UseForgotPasswordOptions = {
    onSuccess?: (email: string) => void;
};

export const useForgotPassword = ({ onSuccess }: UseForgotPasswordOptions = {}) => {
    const { mutate: submit, isPending } = useMutation({
        mutationFn: forgotPassword,
        onSuccess: (_data, variables) => {
            onSuccess?.(variables.email);
        },
    });
    return { submit, isPending };
};

