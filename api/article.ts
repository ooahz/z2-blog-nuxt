import {useDefaultRequest} from "@/api/request";
import type {Article, PreviewArticle} from "@/types/articleInterface";
import type {ResultList} from "@/types/resultInterface";

const BASE_URL = "/v1/articles";

export function listArticleApi(pagination: number): Promise<ResultList<PreviewArticle[]>> {
    const params = {
        p: pagination
    };
    return useDefaultRequest.getRawData<ResultList<PreviewArticle[]>>(BASE_URL, params);
}

export function getArticleDetailApi(path: string): Promise<Article> {
    return useDefaultRequest.get<Article>(BASE_URL + `/${path}`);
}

export function listArticleByColumnIdApi(columnId: string, pagination: number): Promise<Article[]> {
    const params = {
        p: pagination
    };
    return useDefaultRequest.get<Article[]>(BASE_URL + `/columns/${columnId}`, params);
}

