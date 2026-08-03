import { http } from "@/utils/http";
import type { Result, ResultList } from "@/types/result";
import type { Friend } from "@/types/friend";

const BASE_URL = "blog/v1/a/friends";

export const listFriend = (params?: any) => {
  return http.request<ResultList<Friend>>("get", BASE_URL, { params });
};

export const saveFriend = (data: Friend) => {
  return http.request<Result<Friend>>("post", BASE_URL, { data });
};

export const updateFriend = (data: Friend) => {
  return http.request<Result<Friend>>("put", BASE_URL, { data });
};

export const deleteFriend = (friendId: string) => {
  return http.request<Result<Friend>>("delete", BASE_URL + `/${friendId}`);
};
