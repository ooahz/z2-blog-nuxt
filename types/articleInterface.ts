import type {ColumnMap} from "@/types/columnInterface";
import type {CategoryMap} from "@/types/categoryInterface";

export interface PreviewArticle {
    readonly id: string;
    readonly path: string;
    title: string;
    description?: string;
    thumbnail?: string;
    createdDate?: string;
    updatedDate?: string;
    columnList?: Array<ColumnMap>;
    categoryMap?: CategoryMap
}

export interface Article {
    readonly id: string;
    readonly path: string;
    title: string;
    description?: string;
    content: string;
    thumbnail?: string;
    createdDate: string;
    updatedDate: string;
    style: string;
    columnList?: Array<ColumnMap>;
    category?: CategoryMap
}
