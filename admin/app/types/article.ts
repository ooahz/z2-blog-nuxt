export interface ArticleItem {
  readonly id: string;
  title: string;
  createdDate: string;
  updatedDate: string;
  weight: string;
  status: string;
  keyword?: string;
}

export interface Article {
  readonly id: string;
  path: string;
  title: string;
  thumbnail: string;
  htmlContent: string;
  description: string;
  createdDate: string;
  updatedDate: string;
  weight: number;
  status: number;
  columnIds: string[];
}
