import {useDefaultRequest} from "./request";
import type {PreviewArticleInterface} from "@/types/articleInterface";

const BASE_URL = "/v1/search";

export async function searchAllApi(params: any): Promise<PreviewArticleInterface[]> {
    return useDefaultRequest.get<PreviewArticleInterface[]>(BASE_URL, params);
}
