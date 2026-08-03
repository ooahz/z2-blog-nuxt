import {columns, fullArticles, success} from "~~/server/utils/mock";

export default defineEventHandler(event => {
    const articleId = getRouterParam(event, "id");
    const article = fullArticles.find(a => a.id === articleId);
    const list = article?.columnList?.map(col => ({
        ...columns.find(c => c.id === col.id),
        articleList: fullArticles.filter(a => a.columnList?.some(c => c.id === col.id))
    })) || columns;
    return success(list);
});
