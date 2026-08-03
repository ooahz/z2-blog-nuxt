import {useDefaultRequest} from "./request";
import type {CategoryMapInterface} from "@/types/categoryInterface";

const BASE_URL = "/v1/categories";

export function listCategoryApi(): Promise<CategoryMapInterface[]>  {
    return useDefaultRequest.get<CategoryMapInterface[]>(BASE_URL);
}
