import {defineStore} from "pinia"

export const useSearchStore = defineStore("searchStoreId", {
    state: () => {
        return {
            type: "all",
            keyword: "",
            marking: ""
        }
    },
    actions: {
        init(keyword: string, type: string) {
            this.type = type;
            this.keyword = keyword;
        },
        setMarking(keyword: string) {
            this.marking = keyword;
        }
    },
})
