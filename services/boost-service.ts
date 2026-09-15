import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { BoostData, BoostOfferData } from "@/types/boost";
import { PaymentData } from "@/types/payment";

async function boostOffer(id: string, payload: BoostOfferData): Promise<ApiResponse<PaymentData>> {
  const res: ApiResponse<PaymentData> = await apiClient.post(`/boosts/offer/${id}`, payload);
  return res;
}

async function activeBoost(id: string): Promise<ApiResponse<BoostData>> {
  const res: ApiResponse<BoostData> = await apiClient.get(`/boosts/offer/${id}`)

  return res;
}

async function hasActiveBoost(): Promise<ApiResponse<{ hasActiveBoost: boolean }>> {
  const res: ApiResponse<{ hasActiveBoost: boolean }> = await apiClient.get(`/boosts/active`)

  return res;
}

const BoostService = {
  boostOffer,
  activeBoost,
  hasActiveBoost,
};

export default BoostService;
