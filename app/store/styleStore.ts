import {defineStore} from "pinia"

export const useStyleStore = defineStore("styleStoreId", {
    state: () => {
        return {
            device: "pc"
        }
    },
    actions: {
        setDevice(device: string) {
            this.device = device
        },
    },
})
