import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { BoostOfferData } from "@/types/boost";
import { PaymentData } from "@/types/payment";

async function boostOffer(id: string, payload: BoostOfferData): Promise<ApiResponse<PaymentData>> {
  const res: ApiResponse<PaymentData> = await apiClient.post(`/boosts/offer/${id}`, payload);
  return res;
}

const BoostService = {
  boostOffer,
};

export default BoostService;
