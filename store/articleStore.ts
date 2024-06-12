import {defineStore} from "pinia"
import type {TocInterface} from "@/types/tocInterface";
import type {Article} from "@/types/articleInterface";
import type {PreviewColumn} from "@/types/columnInterface";

export const useArticleStore = defineStore("useArticleStoreId", {
    state: () => {
        return {
            path: "",
            selectTitle: "",
            tocList: [] as TocInterface[],
            onClick: false,
            article: {},
            columnList: [] as PreviewColumn[]
        }
    },
    actions: {
        setArticlePath(path: string) {
            this.path = path;
        },
        setArticle(article: Article) {
            this.article = article;
        },
        setColumnList(columnList: PreviewColumn[]) {
            this.columnList = columnList;
        },
        setSelectTitle(title: string) {
            this.selectTitle = title;
        },
        setTocList(tocList: TocInterface[]) {
            this.tocList = tocList;
        },
        setOnClick(click: boolean) {
            this.onClick = click;
        },
    },
})
