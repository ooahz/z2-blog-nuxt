import {comments, success} from "~~/server/utils/mock";

export default defineEventHandler(() => success(comments));
