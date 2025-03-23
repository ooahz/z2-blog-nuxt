import {useDefaultRequest} from "@/api/request";
import type {PreviewColumn} from "@/types/columnInterface";

const BASE_URL = "/v1/columns";

export async function getColumnInfoApi(columnId: string): Promise<PreviewColumn> {
    return useDefaultRequest.get<PreviewColumn>(BASE_URL + `/info/${columnId}`);
}

export async function listAllColumnApi(): Promise<PreviewColumn[]> {
    return useDefaultRequest.get<PreviewColumn[]>(BASE_URL + "/all");
}

export async function listColumnByCategoryIdApi(categoryId: string, pagination: number): Promise<PreviewColumn[]> {
    const params = {
        p: pagination
    };
    return useDefaultRequest.get<PreviewColumn[]>(BASE_URL + `/${categoryId}`, params);
}

export async function listColumnByArticleIdApi(articleId: string): Promise<PreviewColumn[]> {
    return useDefaultRequest.get<PreviewColumn[]>(BASE_URL + `/articles/${articleId}`);
}

