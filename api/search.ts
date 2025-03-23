import {useDefaultRequest} from "@/api/request";
import type {PreviewArticle} from "@/types/articleInterface";

const BASE_URL = "/blog/v1/search";

export async function searchAllApi(params: any): Promise<PreviewArticle[]> {
    return useDefaultRequest.get<PreviewArticle[]>(BASE_URL + "/keyword", params);
}

export async function searchArticleContentApi(params: any): Promise<PreviewArticle[]> {
    return useDefaultRequest.get<PreviewArticle[]>(BASE_URL + "/content", params);
}

export async function searchArticleTitleApi(params: any): Promise<PreviewArticle[]> {
    return useDefaultRequest.get<PreviewArticle[]>(BASE_URL + "/title", params);
}

