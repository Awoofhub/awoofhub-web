import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { CreateOfferData, Offer } from "@/types/offer";

async function createOffer(payload: CreateOfferData): Promise<ApiResponse<Offer>> {
  const res: ApiResponse<Offer> = await apiClient.post('/offers/', payload);
  return res;
}

const HelpAndSupportService = {
  createOffer,
};

export default HelpAndSupportService ;
