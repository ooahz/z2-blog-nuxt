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
    page: Page;
}

export interface Page {
    count: number;
    pagination: number;
    size: number;
    total: string;
}

export interface Pagination extends Page{
    totalPage?: number;
}
