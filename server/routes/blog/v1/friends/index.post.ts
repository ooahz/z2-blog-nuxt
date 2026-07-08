import {friends, success} from "~~/server/utils/mock";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    friends.unshift(body);
    return success(true);
});
