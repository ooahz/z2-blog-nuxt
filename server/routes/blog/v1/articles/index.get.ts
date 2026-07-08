import {getPagination, previewArticles, successList} from "~~/server/utils/mock";

export default defineEventHandler(event => {
    const pagination = getPagination(event);
    return successList(previewArticles, pagination, 10);
});
