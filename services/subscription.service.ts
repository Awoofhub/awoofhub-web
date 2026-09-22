import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { Subscription, SubscriptionData, subscriptionPayload } from "@/types/subscription";

async function subscribe(payload: subscriptionPayload): Promise<ApiResponse<SubscriptionData>> {
  const res: ApiResponse<SubscriptionData> = await apiClient.post('/payments/initialize/subscription', payload);
  return res;
}

export async function get(): Promise<ApiResponse<Subscription>> {
  const res: ApiResponse<Subscription> = await apiClient.get('/payments/subscription')
  
  return res;
}


export async function manage(): Promise<ApiResponse<string>> {
  const res: ApiResponse<string> = await apiClient.get('/payments/subscription/manage')
  
  return res;
}

const SubscriptionService = {
  subscribe,
  get,
  manage
};

export default SubscriptionService;
