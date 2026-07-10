import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { EmailData, LoginData, LoginResponse, ResetPasswordData, SignupData, VerifyEmailData } from "@/types/auth";


// Login
export async function loginService(payload: LoginData): Promise<ApiResponse<LoginResponse>> {
  const res: ApiResponse<LoginResponse> = await apiClient.post('/auth/login/', payload)

  return res;
}

// Register
export async function signupService(payload: SignupData): Promise<ApiResponse<any>> {
  const res: ApiResponse<any> = await apiClient.post('/auth/signup/', payload)
  
  return res;
}


export async function forgotPasswordService(payload: EmailData): Promise<ApiResponse<any>> {
  const res: ApiResponse<any> = await apiClient.post('/auth/forgot-password/', payload)
  
  return res;
}


export async function resetPasswordService(payload: ResetPasswordData): Promise<ApiResponse<any>> {
  const res: ApiResponse<any> = await apiClient.post('/auth/reset-password/', payload)
  
  return res;
}

export async function verifyEmailService(payload: VerifyEmailData): Promise<ApiResponse<any>> {
  const res: ApiResponse<any> = await apiClient.post('/auth/verify-email/', payload)
  
  return res;
}

export async function resendVerificationService(payload: EmailData): Promise<ApiResponse<any>> {
  const res: ApiResponse<any> = await apiClient.post('/auth/resend-verification/', payload)
  return res;
}

export async function refreshTokenService(): Promise<ApiResponse<{}>> {
  const res: ApiResponse<{}> = await apiClient.post('/auth/refresh/')
  
  return res;
}

// Logout
export async function logoutService(): Promise<ApiResponse<{}>> {
  const res: ApiResponse<{}> = await apiClient.post('/auth/logout/')
  
  return res;
}
