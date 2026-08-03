import {friends, success} from "~~/server/utils/mock";

export default defineEventHandler(() => success(friends));
