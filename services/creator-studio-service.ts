import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { AccountData, Bank, BankAccount, CreatorMonthlyGrabs, CreatorStats, CreatorTopOffers, Payout, VerifiedAccount } from "@/types/creator-studio";

async function stats(dateFilter?: string): Promise<ApiResponse<CreatorStats>> {
  const res: ApiResponse<CreatorStats> = await apiClient.get('/creator-studio/stats', {
    params: { dateFilter },
  })

  return res;
}

async function monthlyGrabs(): Promise<ApiResponse<CreatorMonthlyGrabs>> {
  const res: ApiResponse<CreatorMonthlyGrabs> = await apiClient.get('/creator-studio/monthly-grabs')

  return res;
}

async function topOffers(): Promise<ApiResponse<CreatorTopOffers>> {
  const res: ApiResponse<CreatorTopOffers> = await apiClient.get('/creator-studio/offer-stats')

  return res;
}

async function payouts(): Promise<ApiResponse<Payout[]>> {
  const res: ApiResponse<Payout[]> = await apiClient.get('/creator-studio/payouts')

  return res;
}

async function getBanks(): Promise<ApiResponse<Bank[]>> {
  const res: ApiResponse<Bank[]> = await apiClient.get('/creator-studio/banks')

  return res;
}

async function verifyAccount(payload: AccountData): Promise<ApiResponse<VerifiedAccount>> {
  const res: ApiResponse<VerifiedAccount> = await apiClient.post('/creator-studio/payout-accounts/verify', payload);

  return res;
}

async function saveAccount(payload: AccountData): Promise<ApiResponse<BankAccount>> {
  const res: ApiResponse<BankAccount> = await apiClient.post('/creator-studio/payout-accounts', payload);

  return res;
}

async function getAccount(): Promise<ApiResponse<BankAccount>> {
  const res: ApiResponse<BankAccount> = await apiClient.get('/creator-studio/payout-accounts')

  return res;
}

async function deleteAccount(id: string): Promise<ApiResponse<any>> {
  const res: ApiResponse<any> = await apiClient.delete(`/creator-studio/payout-accounts/${id}`);

  return res;
};

const CreatorStudioService = {
  stats,
  monthlyGrabs,
  topOffers,
  payouts,
  getBanks,
  verifyAccount,
  saveAccount,
  getAccount,
  deleteAccount,
};

export default CreatorStudioService;
