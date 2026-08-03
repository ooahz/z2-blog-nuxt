import { http } from "@/utils/http";
import type { Result } from "@/types/result";
import type { LoginUser, ResetPasswordUser, UserInfo } from "@/types/user";

const BASE_URL = "blog/v1";

export const getLogin = (data: LoginUser) => {
  return http.request<Result<UserInfo>>("post", BASE_URL + "/login", { data });
};

export const logoutUser = (data: UserInfo) => {
  return http.request<Result<UserInfo>>("post", BASE_URL + "/logout", { data });
};

export const resetPassword = (data: ResetPasswordUser) => {
  return http.request<Result<any>>("post", BASE_URL + "/a/users/reset", { data });
};
