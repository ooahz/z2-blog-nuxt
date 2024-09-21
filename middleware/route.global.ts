import {setAttribute} from "@ahzoo/utils";

export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path === from.path) {
        return;
    }
    try {
        if (process.client) {
            const primary = document.getElementById("ahzoo");
            primary!.scrollTop = 0;
            const {$viewport} = useNuxtApp();
            if ($viewport.isLessThan("mobile")) {
                setAttribute("scroll", "scroll");
                return;
            }
            if (to.name === "p-id" || to.name === "column-name" || to.name === "index") {
                setAttribute("scroll", "primary");
            } else {
                setAttribute("scroll", "top");
            }
        }
    } catch (e) {
        console.log(e);
    }

})
