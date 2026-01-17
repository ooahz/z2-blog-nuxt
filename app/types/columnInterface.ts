import type {PreviewArticleInterface} from "@/types/articleInterface";
import type {CategoryMapInterface} from "@/types/categoryInterface";

export interface PreviewColumnInterface {
    readonly id: string;
    name: string;
    description: string;
    thumbnail?: string;
    total?: number;
    style?: string;
    articleList?: PreviewArticleInterface[];
    categoryList?: CategoryMapInterface[];
}

export interface ColumnMapInterface {
    readonly id: string;
    name: string
}
