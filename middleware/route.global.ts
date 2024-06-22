import {setAttribute} from "@ahzoo/utils";

export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path === from.path) {
        return;
    }
    try {
        if (process.client) {
            const {$viewport} = useNuxtApp();
            if ($viewport.isLessThan('tablet')) {
                setAttribute("scroll", "scroll");
                return;
            }
            const primary = document.getElementById("primary");
            primary!.scrollTop = 0;
            if (to.name === "p-id" || to.name === "column-name") {
                setAttribute("scroll", "primary");
            } else {
                setAttribute("scroll", "top");
            }
        }
    } catch (e) {
        console.log(e);
    }

})
