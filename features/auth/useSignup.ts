import AuthService from "@/services/auth-service";
import { SignupData } from '@/types/auth';
import { useMutation } from '@tanstack/react-query';

export const signup = async (data: SignupData): Promise<any> => {
    const result = await AuthService.signup(data);
    return result.data;
};

type UseSignupOptions = {
    onSuccess?: (email: string) => void;
};

export const useSignup = ({ onSuccess }: UseSignupOptions = {}) => {
    const { mutate: submit, isPending } = useMutation({
        mutationFn: signup,
        onSuccess: (_data, variables) => {
            onSuccess?.(variables.email);
        },

    });
    return { submit, isPending };
};

