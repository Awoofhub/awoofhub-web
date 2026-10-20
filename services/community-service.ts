import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { Community, JoinCommunityData } from "@/types/community";

export async function join(payload: JoinCommunityData): Promise<ApiResponse<Community>> {
  const res: ApiResponse<Community> = await apiClient.post("/community", payload);
  return res;
}

const CommunityService = {
  join,
};

export default CommunityService;
