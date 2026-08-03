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
    columnList?: ColumnMapInterface[];
    categoryMap?: CategoryMapInterface
}

export interface ArticleInterface {
    path: string;
    title: string;
    description?: string;
    content: string;
    thumbnail?: string;
    createdDate: string;
    updatedDate: string;
    style: string;
    columnList?: ColumnMapInterface[];
    category?: CategoryMapInterface
}

export interface ArchiveArticleInterface {
    readonly id: string;
    readonly path: string;
    title: string;
    createdDate?: string;
}
