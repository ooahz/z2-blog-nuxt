import {success} from "~~/server/utils/mock";

export default defineEventHandler(async event => {
    await readBody(event);
    return success(true);
});
