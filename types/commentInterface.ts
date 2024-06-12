export interface Comment {
    articleId: string;
    userName: string;
    userEmail: string;
    userWebsite: string;
    userAvatar: string;
    content: string;
    contentMD: string;
    replyName?: string;
    parentId?: string;
}

export interface CommentItem {
    readonly id: string;
    userName: string;
    userWebsite: string;
    userAvatar: string;
    content: string;
    parentId?: string;
    replyName?: string;
    createTime: string;
    area?: string;
    tag?: string;
    showMore?: boolean;
    child: CommentItem[];
}

export interface TopCommentItem {
    userName: string;
    userWebsite: string;
    userAvatar: string;
    content: string;
    replyName?: string;
}
