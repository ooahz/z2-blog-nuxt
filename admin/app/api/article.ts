import { http } from "@/utils/http";
import type { Article } from "@/types/article";
import type { Result, ResultList } from "@/types/result";

const BASE_URL = "blog/v1/a/articles";

export const saveArticle = (data: Article, params?: any) => {
  return http.request<Result<Article>>("post", BASE_URL, { data }, params);
};

export const updateArticle = (data: Article) => {
  return http.request<Result<Article>>("put", BASE_URL, { data });
};

export const updateArticlePart = (data: Article) => {
  return http.request<Result<Article>>("post", BASE_URL + "/part", { data });
};

export const deleteArticle = (articleId: string) => {
  return http.request<Result<Article>>("delete", BASE_URL + `/${articleId}`);
};

export const listArticle = (params: any) => {
  return http.request<ResultList<Article>>("get", BASE_URL, { params });
};

export const listRecentArticle = (size: number = 5) => {
  return http.request<ResultList<Article>>("get", BASE_URL + "/recent", { params: { size } });
};

export const getArticleDetail = (articleId: string) => {
  return http.requestAndFormatData<Article>("get", BASE_URL + `/${articleId}`);
};
