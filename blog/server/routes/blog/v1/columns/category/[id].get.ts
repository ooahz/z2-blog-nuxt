import {columns, success} from "~~/server/utils/mock";

export default defineEventHandler(event => {
    const categoryId = getRouterParam(event, "id");
    const list = columns.filter(c => c.categoryList?.some(cat => cat.id === categoryId));
    return success(list.length ? list : columns);
});
