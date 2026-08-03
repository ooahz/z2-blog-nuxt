import {useDefaultRequest} from "~~/service/request";
import type {PreviewColumnInterface} from "@/types/columnInterface";

const BASE_URL = "/v1/columns";

export async function getColumnInfoApi(columnId: string): Promise<PreviewColumnInterface> {
    return useDefaultRequest.get<PreviewColumnInterface>(BASE_URL + `/info/${columnId}`);
}

export async function listAllColumnApi(): Promise<PreviewColumnInterface[]> {
    return useDefaultRequest.get<PreviewColumnInterface[]>(BASE_URL + "/all");
}

export async function listColumnByCategoryIdApi(categoryId: string, pagination: number): Promise<PreviewColumnInterface[]> {
    const params = {
        p: pagination
    };
    return useDefaultRequest.get<PreviewColumnInterface[]>(BASE_URL + `/category/${categoryId}`, params);
}

export async function listColumnByArticleIdApi(articleId: string): Promise<PreviewColumnInterface[]> {
    return useDefaultRequest.get<PreviewColumnInterface[]>(BASE_URL + `/articles/${articleId}`);
}

