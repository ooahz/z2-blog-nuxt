export interface Result<T> {
    state: string;
    code: string;
    message: string;
    data: T;
}

export interface ResultList<T> {
    state: string;
    code: string;
    message: string;
    data: T;
    page: PaginationInfo;
}

export interface PaginationInfo {
    count: number;
    pagination: number;
    size: number;
    total: string;
    totalPage?: number;
}
