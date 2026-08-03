import {fullArticles, success} from "~~/server/utils/mock";

export default defineEventHandler(event => {
    const path = getRouterParam(event, "path");
    const article = fullArticles.find(a => a.path === path) || fullArticles[0];
    return success(article);
});
