import {getQuery} from "h3";
import {previewArticles, success} from "~~/server/utils/mock";

export default defineEventHandler(event => {
    const query = getQuery(event);
    const keyword = String(query.k || "").toLowerCase();
    const list = keyword
        ? previewArticles.filter(a =>
            a.title.toLowerCase().includes(keyword) ||
            (a.description && a.description.toLowerCase().includes(keyword))
        )
        : previewArticles;
    return success(list);
});
