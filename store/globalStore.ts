import {defineStore} from "pinia"

export const useGlobalStore = defineStore("globalStoreId", {
    state: () => {
        return {
            showSearch: false,
            showComment: false,
            showFriendForm: false,
        }
    },
    actions: {
        setShowSearch(showSearch: boolean) {
            this.showSearch = showSearch;
        },
        setShowComment(showComment: boolean) {
            this.showComment = showComment;
        },
        setShowFriendForm(showFriendForm: boolean) {
            this.showFriendForm = showFriendForm;
        },
    },
})
