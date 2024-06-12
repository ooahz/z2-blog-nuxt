import type {PreviewArticle} from "@/types/articleInterface";
import type {CategoryMap} from "@/types/categoryInterface";

export interface PreviewColumn {
    readonly id: string;
    name: string;
    description: string;
    thumbnail?: string;
    total?: number;
    style?: string;
    articleList?: Array<PreviewArticle>
    categoryList?: Array<CategoryMap>
}

export interface ColumnMap {
    readonly id: string;
    name: string
}
