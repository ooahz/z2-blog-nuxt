import {useDefaultRequest} from "./request";
import type {ArchiveArticleInterface} from "@/types/articleInterface";
import type {ResultList} from "@/types/resultInterface";

const BASE_URL = "/v1/archives";

export function listArchiveApi(pagination: number): Promise<ResultList<ArchiveArticleInterface[]>> {
    const params = {
        p: pagination
    };
    return useDefaultRequest.getRawData<ResultList<ArchiveArticleInterface[]>>(BASE_URL, params);
}
