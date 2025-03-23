import {useDefaultRequest} from "@/api/request";
import type {CommentItem, TopCommentItem, Comment} from "@/types/commentInterface";

const BASE_URL = "/v1/comments";

export function listFriendApi(path: string, pagination: number): Promise<CommentItem[]> {
    const params = {
        p: pagination
    };
    return useDefaultRequest.get<CommentItem[]>(BASE_URL + `/${path}`, params);
}

export function topCommentApi(): Promise<TopCommentItem[]> {
    return useDefaultRequest.get<TopCommentItem[]>(BASE_URL + "/top");
}

export function saveCommentApi(comment: Comment) {
    return useDefaultRequest.post(BASE_URL, comment);
}



