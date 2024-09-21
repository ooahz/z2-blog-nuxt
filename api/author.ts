import {useDefaultRequest} from "@/api/request";
import type {AuthorInterface} from "@/types/authorInterface";

const BASE_URL = "/blog/v1/author";

export function getAuthorInfoDetail(): Promise<AuthorInterface> {
    return useDefaultRequest.get<AuthorInterface>(BASE_URL);
}
