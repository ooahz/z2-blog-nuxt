import {fullArticles, getPagination, successList} from "~~/server/utils/mock";

export default defineEventHandler(event => {
    const pagination = getPagination(event);
    const archives = fullArticles.map(({id, path, title, createdDate}) => ({id, path, title, createdDate}));
    return successList(archives, pagination, 10);
});
