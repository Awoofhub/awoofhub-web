/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { UpdateUserData, User } from "@/types/user";

export async function getUserByUsernameService(
  username: string,
): Promise<ApiResponse<User>> {
  const res: ApiResponse<User> = await apiClient.get(
    `/users/username/${username}`,
  );

  return res;
}

export async function updateUserService(
  payload: UpdateUserData,
): Promise<ApiResponse<User>> {
  const res: ApiResponse<User> = await apiClient.patch(
    "/users/update/",
    payload,
  );

  return res;
}

export async function getUserService(): Promise<ApiResponse<User>> {
  const res: ApiResponse<User> = await apiClient.get("/users/me");

  return res;
}

export async function updateUsernameService(
  username: string,
): Promise<ApiResponse<User>> {
  const res: ApiResponse<User> = await apiClient.patch(
    "/users/update/username",
    { username },
  );
  return res;
}

export async function checkUsernameAvailability(
  username: string,
): Promise<boolean> {
  try {
    const res: any = await apiClient.get(`/users/username/${username}`);

    if (!res.data) {
      return true; // Available!
    }

    // If res.data has an object, the user exists
    return false; // Taken!
  } catch (error: any) {
    if (error.response?.status === 404 || error?.status === 404) {
      return true;
    }
    throw error;
  }
}
