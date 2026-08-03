import { http } from "@/utils/http";
import type { ResultList } from "@/types/result";
import type { Article } from "@/types/article";

const BASE_URL = "blog/v1/search";

export const searchByKeyword = (params?: any) => {
  return http.request<ResultList<Article>>("get", BASE_URL, { params });
};
