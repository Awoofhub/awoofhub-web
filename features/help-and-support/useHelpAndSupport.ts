import HelpAndSupportService from "@/services/help-and-support-service";
import { HelpAndSupport, HelpAndSupportData } from "@/types/help-and-support";
import { useMutation } from "@tanstack/react-query";

export const helpAndSuport = async (data: HelpAndSupportData): Promise<HelpAndSupport> => {
  const result = await HelpAndSupportService.submit(data);
  return result.data;
};

type UseHelpAndSupportOptions = {
  onSuccess?: (data: HelpAndSupportData) => void;
};

export const useHelpAndSupport = ({ onSuccess }: UseHelpAndSupportOptions = {}) => {
  const { mutate: submit, isPending, isError, error, } = useMutation({
    mutationFn: helpAndSuport,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
  });

  return { submit, isPending, isError, error };
};