import { resendVerificationService } from "@/services/auth-service";
import { EmailData } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

export const resendVerification = async (data: EmailData): Promise<any> => {
  const result = await resendVerificationService(data);
  return result.data;
};

export const useResendVerification = () => {
  const { mutate: submit, isPending } = useMutation({
    mutationFn: resendVerification,
  });
  return { submit, isPending };
};