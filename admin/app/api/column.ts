import { http } from "@/utils/http";
import type { Result, ResultList } from "@/types/result";
import type { Column } from "@/types/column";

const BASE_URL = "blog/v1/a/columns";

export const listColumn = (params?: any) => {
  return http.request<ResultList<Column>>("get", BASE_URL, { params });
};

export const listAllColumn = () => {
  return http.requestAndFormatData<Column[]>("get", BASE_URL + "/all");
};

export const saveColumn = (data: Column) => {
  return http.request<Result<Column>>("post", BASE_URL, { data });
};

export const updateColumn = (data: Column) => {
  return http.request<Result<Column>>("put", BASE_URL, { data });
};

export const deleteColumn = (columnId: string) => {
  return http.request<Result<Column>>("delete", BASE_URL + `/${columnId}`);
};
