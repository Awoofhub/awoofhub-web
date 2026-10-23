import AuthService from "@/services/auth-service";
import { EmailData } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

export const resendVerificationEmail = async (data: EmailData): Promise<any> => {
  const result = await AuthService.resendVerificationEmail(data);
  return result.data;
};

type UseResendOptions = {
  onSuccess?: () => void;
};

export const useResendVerification = ({ onSuccess }: UseResendOptions = {}) => {
  
  const { mutate: submit, isPending } = useMutation({
    mutationFn: resendVerificationEmail,
    onSuccess: () => {
      onSuccess?.();
    },
  });

  return { submit, isPending };
};