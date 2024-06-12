import {useDefaultRequest} from "@/utils/request";
import type {Article, PreviewArticle} from "@/types/articleInterface";
import type {ResultList} from "@/types/resultInterface";

const BASE_URL = "/blog/v1/articles";

export function listArticle(pagination: number): Promise<ResultList<PreviewArticle[]>> {
    const params = {
        p: pagination
    }
    return useDefaultRequest.getRawData<ResultList<PreviewArticle[]>>(BASE_URL + "/list", params);
}

export function getArticleDetail(path: string): Promise<Article> {
    return useDefaultRequest.get<Article>(BASE_URL + `/detail/${path}`);
}

export function listArticleByColumnId(columnId: string, pagination: number): Promise<Article[]> {
    const params = {
        p: pagination
    }
    return useDefaultRequest.get<Article[]>(BASE_URL + `/column/list/${columnId}`, params);
}

