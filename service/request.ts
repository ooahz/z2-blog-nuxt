import {OuOMessage} from "@ahzoo/ouo";
import {logger} from "@/utils/logger";

type MethodType = "GET" | "POST" | "PUT" | "DELETE";

interface ApiResponse<T = any> {
    data: T;
    state: "success" | "error";
    message?: string;
    code?: string;
}

const request = async (url: string, method: MethodType, params?: Record<string, any>, body?: string) => {
    const config = useRuntimeConfig();
    logger.log("url:", config.public.apiBase);
    return useFetch(url, {
        baseURL: config.public.apiBase,
        method,
        credentials: "include",
        params: {...params},
        body: method === "POST" ? body : undefined,
        onRequestError({request, options, error}) {
            logger.error("Request error:", request, error);
        },
        onResponse({request, response, options}) {
            return response._data;
        },
        onResponseError({request, response, options}) {
            logger.error("Response error:", response);
            OuOMessage.error("内容获取失败");
        }
    });
};

export const useDefaultRequest = {
    get: async <T>(url: string, params?: Record<string, any>): Promise<T> => {
        const res = await request(url, "GET", params);
        return formatResult<T>(res, true);
    },
    post: async <T>(url: string, body: any, params?: Record<string, any>): Promise<T> => {
        const res = await request(url, "POST", params, JSON.stringify(body));
        return formatResult<T>(res, false);
    },
    getRawData: async <T>(url: string, params?: Record<string, any>): Promise<T> => {
        const res = await request(url, "GET", params);
        return formatResult<T>(res, false);
    }
};

function formatResult<T>(res: ReturnType<typeof useFetch>, handleData: boolean): T {
    try {
        const {pending, status, data} = res;

        // 如果请求还在进行中，返回空值
        if (pending.value) {
            logger.warn("Request still pending, status:", status.value);
            return "" as T;
        }

        // 检查响应数据是否存在
        const originData = unref(data);
        if (!originData) {
            logger.error("No valid data received");
            return "" as T;
        }

        // 处理 API 响应格式
        const {data: responseData, state, message} = originData as ApiResponse;

        if (state === "success") {
            return handleData ? toRaw(responseData) : toRaw(originData);
        } else {
            const errorMessage = message || "请求失败";
            OuOMessage.error(errorMessage);
            logger.error("Request failed:", responseData);
            return "" as T;
        }
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        logger.error("Request error:", errorMessage, error);
        return "" as T;
    }
}
