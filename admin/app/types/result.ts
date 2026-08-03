// 后端统一返回结构
// state: "success" 表示成功，"error" 表示失败（真实后端取值，非 mock 的 "ok"）
export interface Result<T> {
  readonly state: string;
  readonly code: string;
  readonly message: string;
  readonly data: T;
}

export interface ResultList<T> extends Result<T[]> {
  readonly page: Page;
}

export interface Page {
  readonly total: string;
  readonly count: number;
  readonly size: number;
  readonly pagination: number;
}
