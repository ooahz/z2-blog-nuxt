import {useDefaultRequest} from "./request";
import type {PreviewArticleInterface} from "@/types/articleInterface";

const BASE_URL = "/blog/v1/search";

export async function searchAllApi(params: any): Promise<PreviewArticleInterface[]> {
    return useDefaultRequest.get<PreviewArticleInterface[]>(BASE_URL + "/keyword", params);
}

export async function searchArticleContentApi(params: any): Promise<PreviewArticleInterface[]> {
    return useDefaultRequest.get<PreviewArticleInterface[]>(BASE_URL + "/content", params);
}

export async function searchArticleTitleApi(params: any): Promise<PreviewArticleInterface[]> {
    return useDefaultRequest.get<PreviewArticleInterface[]>(BASE_URL + "/title", params);
}

