export interface CommentInterface {
    articleId: string;
    userName: string;
    userEmail: string;
    userWebsite: string;
    userAvatar: string;
    content: string;
    contentText: string;
    replyName?: string;
    parentId?: string;
    website?: string;
}

export interface CommentItemInterface {
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
    child: CommentItemInterface[];
}

export interface TopCommentItemInterface {
    userName: string;
    website: string;
    userAvatar: string;
    content: string;
    replyName?: string;
}
