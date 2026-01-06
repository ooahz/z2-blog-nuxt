import {useDefaultRequest} from "./request";
import type {CommentItemInterface, TopCommentItemInterface, CommentInterface} from "@/types/commentInterface";

const BASE_URL = "/v1/comments";

export function listFriendApi(path: string, pagination: number): Promise<CommentItemInterface[]> {
    const params = {
        p: pagination
    };
    return useDefaultRequest.get<CommentItemInterface[]>(BASE_URL + `/${path}`, params);
}

export function topCommentApi(): Promise<TopCommentItemInterface[]> {
    return useDefaultRequest.get<TopCommentItemInterface[]>(BASE_URL + "/top");
}

export function saveCommentApi(comment: CommentInterface) {
    return useDefaultRequest.post(BASE_URL, comment);
}



