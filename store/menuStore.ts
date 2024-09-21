import {defineStore} from "pinia";
import type {Menu} from "@/types/menuInterface";

export const useMenuStore = defineStore("menuStoreId", {
    state: () => {
        return {
            menu: [{
                title: "置顶",
                icon: "ArrowUpCircleIcon"
            }, {
                title: "主题",
                icon: "SparklesIcon"
            } as Menu]
        };
    },
    actions: {
        setWithComment() {
            this.menu = [
                {
                    title: "置顶",
                    icon: "ArrowUpCircleIcon"
                }, {
                    title: "评论区",
                    icon: "ChatBubbleOvalLeftEllipsisIcon"
                }, {
                    title: "主题",
                    icon: "SparklesIcon"
                }
            ]
        },
        setWithoutComment() {
            this.menu = [
                {
                    title: "置顶",
                    icon: "ArrowUpCircleIcon"
                }, {
                    title: "主题",
                    icon: "SparklesIcon"
                }
            ]
        }
    }
})
