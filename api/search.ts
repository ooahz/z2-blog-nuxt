import {useDefaultRequest} from "@/api/request";
import type {PreviewArticle} from "@/types/articleInterface";

const BASE_URL = "/blog/v1/search";

export async function searchAll(params: any): Promise<PreviewArticle[]> {
    return useDefaultRequest.get<PreviewArticle[]>(BASE_URL + "/keyword", params);
}

export async function searchArticleContent(params: any): Promise<PreviewArticle[]> {
    return useDefaultRequest.get<PreviewArticle[]>(BASE_URL + "/content", params);
}

export async function searchArticleTitle(params: any): Promise<PreviewArticle[]> {
    return useDefaultRequest.get<PreviewArticle[]>(BASE_URL + "/title", params);
}

