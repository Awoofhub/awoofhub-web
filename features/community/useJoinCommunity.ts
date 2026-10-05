import CommunityService from "@/services/community-service";
import { Community, JoinCommunityData } from "@/types/community";
import { useMutation } from "@tanstack/react-query";

export const joinCommunity = async (data: JoinCommunityData): Promise<Community> => {
  const result = await CommunityService.join(data);
  return result.data;
};

type UseJoinCommunityOptions = {
  onSuccess?: (data: Community) => void;
};

export const useJoinCommunity = ({ onSuccess }: UseJoinCommunityOptions = {}) => {
  const { mutate: submit, isPending, isError, error, reset } = useMutation({
    mutationFn: joinCommunity,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
  });

  return { submit, isPending, isError, error, reset };
};