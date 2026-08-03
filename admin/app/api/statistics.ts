import { http } from "@/utils/http";
import type { Result } from "@/types/result";
import type { HomeStatistics } from "@/types/statistics";

const BASE_URL = "blog/v1/a";

export const getStatistics = () => {
  return http.request<Result<HomeStatistics>>("get", BASE_URL + "/statistics");
};
