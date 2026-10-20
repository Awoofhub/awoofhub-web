import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { HelpAndSupport, HelpAndSupportData } from "@/types/help-and-support";

async function submit(payload: HelpAndSupportData): Promise<ApiResponse<HelpAndSupport>> {
  const res: ApiResponse<HelpAndSupport> = await apiClient.post('/help-and-support/', payload);
  return res;
}

const HelpAndSupportService = {
  submit,
};

export default HelpAndSupportService;
