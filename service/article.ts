import {useDefaultRequest} from "./request";
import type {ArticleInterface, PreviewArticleInterface} from "@/types/articleInterface";
import type {ResultList} from "@/types/resultInterface";

const BASE_URL = "/v1/articles";

export function listArticleApi(pagination: number): Promise<ResultList<PreviewArticleInterface[]>> {
    const params = {
        p: pagination
    };
    return useDefaultRequest.getRawData<ResultList<PreviewArticleInterface[]>>(BASE_URL, params);
}

export function getArticleDetailApi(path: string): Promise<ArticleInterface> {
    return useDefaultRequest.get<ArticleInterface>(BASE_URL + `/${path}`);
}

export function listArticleByColumnIdApi(columnId: string, pagination: number): Promise<ArticleInterface[]> {
    const params = {
        p: pagination
    };
    return useDefaultRequest.get<ArticleInterface[]>(BASE_URL + `/columns/${columnId}`, params);
}

