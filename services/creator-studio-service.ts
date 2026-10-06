import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { CreatorMonthlyClicks, CreatorStats, CreatorTopOffers, Payout, VerifiedAccount, VerifyAccountData } from "@/types/creator-studio";

async function stats(): Promise<ApiResponse<CreatorStats>> {
  const res: ApiResponse<CreatorStats> = await apiClient.get('/creator-studio/stats')

  return res;
}

async function monthlyClicks(): Promise<ApiResponse<CreatorMonthlyClicks>> {
  const res: ApiResponse<CreatorMonthlyClicks> = await apiClient.get('/creator-studio/monthly-clicks')

  return res;
}

async function topOffers(): Promise<ApiResponse<CreatorTopOffers>> {
  const res: ApiResponse<CreatorTopOffers> = await apiClient.get('/creator-studio/offer-stats')

  return res;
}

async function payouts(): Promise<ApiResponse<Payout>> {
  const res: ApiResponse<Payout> = await apiClient.get('/creator-studio/payouts')

  return res;
}

async function getBanks(): Promise<ApiResponse<Payout>> {
  const res: ApiResponse<Payout> = await apiClient.get('/creator-studio/banks')

  return res;
}


async function verifyAccount(payload: VerifyAccountData): Promise<ApiResponse<VerifiedAccount>> {
  const res: ApiResponse<VerifiedAccount> = await apiClient.post('/creator-studio/payout-accounts/verify', payload);
  return res;
}





const CreatorStudioService = {
  stats,
  monthlyClicks,
  topOffers,
  payouts,
  getBanks,
  verifyAccount,
};

export default CreatorStudioService;
