import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { EmailData, LoginData, LoginResponse, ResetPasswordData, SignupData, VerifyEmailData } from "@/types/auth";


async function login(payload: LoginData): Promise<ApiResponse<LoginResponse>> {
  const res: ApiResponse<LoginResponse> = await apiClient.post('/auth/login/', payload)

  return res;
}

async function signup(payload: SignupData): Promise<ApiResponse<any>> {
  const res: ApiResponse<any> = await apiClient.post('/auth/signup/', payload)
  
  return res;
}


async function forgotPassword(payload: EmailData): Promise<ApiResponse<any>> {
  const res: ApiResponse<any> = await apiClient.post('/auth/forgot-password/', payload)
  
  return res;
}


async function resetPassword(payload: ResetPasswordData): Promise<ApiResponse<any>> {
  const res: ApiResponse<any> = await apiClient.post('/auth/reset-password/', payload)
  
  return res;
}

async function verifyEmail(payload: VerifyEmailData): Promise<ApiResponse<any>> {
  const res: ApiResponse<any> = await apiClient.post('/auth/verify-email/', payload)
  
  return res;
}

async function resendVerificationEmail(payload: EmailData): Promise<ApiResponse<any>> {
  const res: ApiResponse<any> = await apiClient.post('/auth/resend-verification/', payload)

  return res;
}

async function refreshToken(): Promise<ApiResponse<any>> {
  const res: ApiResponse<any> = await apiClient.post('/auth/refresh/')
  
  return res;
}

async function logout(): Promise<ApiResponse<any>> {
  const res: ApiResponse<any> = await apiClient.post('/auth/logout/')
  
  return res;
}

const AuthService = {
  login,
  signup,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerificationEmail,
  refreshToken,
  logout 
};

export default AuthService;
