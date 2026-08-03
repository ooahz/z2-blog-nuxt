import { http } from "@/utils/http";
import type { Category } from "@/types/category";
import type { Result, ResultList } from "@/types/result";

const BASE_URL = "blog/v1/a/categories";

export const listCategory = (params?: any) => {
  return http.request<ResultList<Category>>("get", BASE_URL, { params });
};

export const saveCategory = (data: Category) => {
  return http.request<Result<Category>>("post", BASE_URL, { data });
};

export const updateCategory = (data: Category) => {
  return http.request<Result<Category>>("put", BASE_URL, { data });
};

export const deleteCategory = (categoryId: string) => {
  return http.request<Result<Category>>("delete", BASE_URL + `/${categoryId}`);
};
