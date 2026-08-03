import {columns, fullArticles, success} from "~~/server/utils/mock";

export default defineEventHandler(event => {
    const name = getRouterParam(event, "name");
    let column = columns.find(c => c.name === name);
    if (!column) {
        column = {...columns[0], name: name || "unknown"};
    }
    const articleList = fullArticles.filter(a => a.columnList?.some(c => c.id === column!.id));
    return success({...column, articleList});
});
