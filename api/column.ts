import {useDefaultRequest} from "@/utils/request";
import type {PreviewColumn} from "@/types/columnInterface";

const BASE_URL = "/blog/v1/columns";

export async function getColumnInfo(columnId: string): Promise<PreviewColumn> {
    return useDefaultRequest.get<PreviewColumn>(BASE_URL + `/info/${columnId}`);
}

export async function listColumnByCategoryId(categoryId: string, pagination: number): Promise<PreviewColumn[]> {
    const params = {
        p: pagination
    }
    return useDefaultRequest.get<PreviewColumn[]>(BASE_URL + `/list/${categoryId}`, params);
}

export async function listColumnByArticleId(articleId: string): Promise<PreviewColumn[]> {
    return useDefaultRequest.get<PreviewColumn[]>(BASE_URL + `/article/list/${articleId}`);
}

