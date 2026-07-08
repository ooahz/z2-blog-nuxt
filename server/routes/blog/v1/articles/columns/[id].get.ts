import {fullArticles, success} from "~~/server/utils/mock";

export default defineEventHandler(event => {
    const columnId = getRouterParam(event, "id");
    const list = fullArticles.filter(a => a.columnList?.some(c => c.id === columnId));
    return success(list.length ? list : fullArticles.slice(0, 4));
});
