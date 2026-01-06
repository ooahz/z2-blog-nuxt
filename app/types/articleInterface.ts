import type {ColumnMapInterface} from "@/types/columnInterface";
import type {CategoryMapInterface} from "@/types/categoryInterface";

export interface PreviewArticleInterface {
    readonly id: string;
    readonly path: string;
    title: string;
    description?: string;
    thumbnail?: string;
    createdDate?: string;
    updatedDate?: string;
    columnList?: Array<ColumnMapInterface>;
    categoryMap?: CategoryMapInterface
}

export interface ArticleInterface {
    readonly id: string;
    readonly path: string;
    title: string;
    description?: string;
    content: string;
    thumbnail?: string;
    createdDate: string;
    updatedDate: string;
    style: string;
    columnList?: Array<ColumnMapInterface>;
    category?: CategoryMapInterface
}
