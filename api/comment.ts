import {useDefaultRequest} from "@/utils/request";
import type {CommentItem, TopCommentItem, Comment} from "@/types/commentInterface";

const BASE_URL = "/comment/v1/comments";

export function listComment(path: string, pagination: number): Promise<CommentItem[]> {
    const params = {
        p: pagination
    }
    return useDefaultRequest.get<CommentItem[]>(BASE_URL + `/${path}`, params);
}

export function topComment(): Promise<TopCommentItem[]> {
    return useDefaultRequest.get<TopCommentItem[]>(BASE_URL + "/top");
}

export function saveComment(comment: Comment) {
    return useDefaultRequest.post(BASE_URL, comment);
}



