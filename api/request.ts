import {OuOMessage} from "@ahzoo/ouo";

const BASE_URL = "/api";

type MethodType = "GET" | "POST" | "PUT" | "DELETE";

const request = async (url: string, method: MethodType, params?: any, body?: string) => {
    return useFetch(url, {
        baseURL: BASE_URL,
        method,
        credentials: "include",
        params: {...params},
        body: method === "POST" ? body : undefined,
        onRequest({request, options}) {
        },
        onRequestError({request, options, error}) {
            console.log("request error:", request, error);
            OuOMessage.error("请求出错");
        },
        onResponse({request, response, options}) {
            return response._data;
        },
        onResponseError({request, response, options}) {
            console.log("response error:", response);
            OuOMessage.error("内容获取失败");
        }
    });
};

export const useDefaultRequest = {
    get: async <T>(url: string, params?: any): Promise<T> => {
        const res = await request(url, "GET", params);
        return formatResult(res, true);
    },
    post: async <T>(url: string, body: any, params?: any): Promise<T> => {
        const res = await request(url, "POST", params, JSON.stringify(body));
        return formatResult(res, false);
    },
    getRawData: async <T>(url: string, params?: any): Promise<T> => {
        const res = await request(url, "GET", params);
        return formatResult(res, false);
    }
};

function formatResult<T>(res: any, handle: boolean): T {
    try {
        const {pending, status} = res;
        if (!pending.value) {
            const originData = unref(res.data);
            const {data, state, message} = originData;
            if (state === "success") {
                return handle ? toRaw(data) : toRaw(originData);
            } else {
                OuOMessage.error(message);
                console.log("请求失败,", data);
                return "" as T;
            }
        } else {
            console.log("请求未加载完成，status：：", status.value);
            return "" as T;
        }
        if (!res || !res.data) {
            console.log("未获取到有效数据");
            return "" as T;
        }
    } catch (error: any) {
        console.log("请求错误：" + error.message);
        return "" as T;
    }
}
