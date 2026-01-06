import {defineStore} from "pinia";
import type {TocInterface} from "@/types/tocInterface";

export const useArticleStore = defineStore("useArticleStoreId", {
    state: () => {
        return {
            selectTitle: "",
            tocList: [] as TocInterface[],
            onClick: false
        };
    },
    actions: {
        setSelectTitle(title: string) {
            this.selectTitle = title;
        },
        setTocList(tocList: TocInterface[]) {
            this.tocList = tocList;
        },
        setOnClick(click: boolean) {
            this.onClick = click;
        }
    }
})
