import { joinCommunityService } from "@/services/community-service";
import { JoinCommunityData } from "@/types/community";
import { useMutation } from "@tanstack/react-query";

export const joinCommunity = async (
  data: JoinCommunityData
): Promise<any> => {
  const result = await joinCommunityService(data);
  return result.data;
};

type UseJoinCommunityOptions = {
  onSuccess?: () => void;
};

export const useJoinCommunity = ({
  onSuccess,
}: UseJoinCommunityOptions = {}) => {
  const { mutate: submit, isPending, isError, error, reset } = useMutation({
    mutationFn: joinCommunity,
    onSuccess: () => {
      onSuccess?.();
    },
  });

  return { submit, isPending, isError, error, reset };
};