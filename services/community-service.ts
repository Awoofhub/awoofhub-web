import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { JoinCommunityData } from "@/types/community";

export async function joinCommunityService(
  payload: JoinCommunityData
): Promise<ApiResponse<any>> {
  const res: ApiResponse<any> = await apiClient.post(
    "/community",
    payload
  );
  return res;
}