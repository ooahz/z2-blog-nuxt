import {setAttribute} from "@ahzoo/utils";

export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path === from.path) {
        return;
    }
    try {
        if (process.client) {
            const {$viewport} = useNuxtApp();
            if ($viewport.isLessThan("lg")) {
                setAttribute("scroll", "scroll");
                return;
            }
            setAttribute("scroll", "top");
        }
    } catch (e) {
        console.log(e);
    }
})
