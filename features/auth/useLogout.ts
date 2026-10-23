"use client"
import AuthService from "@/services/auth-service";
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const logout = async (): Promise<any> => {
  const result = await AuthService.logout();
  return result.data;
};

type UseLogoutOptions = {
  onSuccess?: () => void;
};

export const useLogout = ({ onSuccess }: UseLogoutOptions = {}) => {
  const queryClient = useQueryClient();

  const { mutate: submit, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear()
      onSuccess?.();
    },
  });

  return { submit, isPending };
};
