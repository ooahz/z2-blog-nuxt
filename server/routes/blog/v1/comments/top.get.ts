import {success, topComments} from "~~/server/utils/mock";

export default defineEventHandler(() => success(topComments));
