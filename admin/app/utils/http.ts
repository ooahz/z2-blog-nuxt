import type { Result, ResultList, Page } from "@/types/result";
import type { UserInfo } from "@/types/user";
import type { Article } from "@/types/article";
import type { Category } from "@/types/category";
import type { Column } from "@/types/column";
import type { Friend } from "@/types/friend";
import {
  mockArticles,
  mockCategories,
  mockColumns,
  mockFriends,
  mockStatistics,
  mockUserInfo,
} from "@/mock/data";
import { toast } from "vue-sonner";

/**
 * HTTP 客户端
 *
 * 通过 runtimeConfig.public.mockEnabled 在「真实后端」与「内存 Mock」之间切换：
 * - mockEnabled = false（默认）：走真实 $fetch，请求经 nitro.devProxy 转发到后端 (localhost:8080)
 * - mockEnabled = true：走内存 Mock，基于 app/mock/data.ts 进行 CRUD，无需后端即可运行前端
 *
 * 开启 Mock：设置环境变量 NUXT_PUBLIC_MOCK_ENABLED=true
 */

interface RequestConfig {
  params?: Record<string, any>;
  data?: any;
}

interface HttpLike {
  request<T>(method: string, url: string, config?: RequestConfig, extraParams?: any): Promise<T>;
  requestAndFormatData<T>(method: string, url: string, config?: RequestConfig): Promise<T>;
}

// 过滤掉值为 undefined/null/空字符串 的查询参数，避免发送无意义参数
function cleanParams(params: Record<string, any> = {}): Record<string, any> {
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      result[key] = value;
    }
  }
  return result;
}

// ==================== 真实 HTTP 客户端 ====================
/**
 * 基于 Nuxt 的 $fetch 发起请求，请求地址经开发代理转发到后端 (localhost:8080)。
 * - 自动附带 Authorization: Bearer <token>
 * - 自动从响应头捕获登录返回的 token
 * - 401 响应：清除登录态并跳转登录页
 */
class HttpClient implements HttpLike {
  /**
   * 发起请求，返回完整 Result 包装
   */
  async request<T>(
    method: string,
    url: string,
    config: RequestConfig = {},
    extraParams?: any,
  ): Promise<T> {
    const { params = {}, data } = config;
    // 合并 extraParams（兼容部分 API 传参方式，如 saveArticle 的第 4 个参数）
    const mergedParams = cleanParams({ ...params, ...(extraParams || {}) });

    // 规范化 URL，确保以 / 开头，便于 devProxy 匹配 /blog/v1 前缀
    const normalizedUrl = url.startsWith("/") ? url : `/${url}`;

    // 在 Nuxt 上下文内读取 token cookie（同步调用，避免跨 await 丢失上下文）
    const tokenCookie = useCookie<string | null>("auth-token", {
      default: () => null,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });

    const headers: Record<string, string> = {};
    if (tokenCookie.value) {
      headers.Authorization = `Bearer ${tokenCookie.value}`;
    }

    try {
      const response = await $fetch<any>(normalizedUrl, {
        method: method.toUpperCase() as any,
        params: mergedParams,
        body: data,
        headers,
        // 自动捕获后端在响应头中下发的 token（常见于登录接口）
        onResponse({ response: res }) {
          const authHeader =
            res.headers.get("authorization") || res.headers.get("token");
          if (authHeader) {
            const token = authHeader.replace(/^Bearer\s+/i, "").trim();
            if (token) tokenCookie.value = token;
          }
        },
      });

      // 后端返回错误状态：统一弹出错误提示并抛出，中断调用方 try 块
      if (response?.state === "error") {
        // token 无效，清除登录态并跳转登录页
        if (response?.code == 200403) {
          this.clearAuthAndRedirect();
        } else if (response?.message) {
          toast.error(response.message);
        }
        const err = new Error(response?.message || "请求失败");
        (err as any).handled = true;
        throw err;
      }

      return response as T;
    } catch (error: any) {
      const status = error?.response?.status || error?.statusCode;

      // 401 未授权：清除登录态并跳转登录页
      if (status === 401) {
        this.clearAuthAndRedirect();
      }

      // 网络错误等未被处理的异常，统一弹出提示
      if (!error?.handled && import.meta.client) {
        toast.error("网络异常，请稍后重试");
      }

      throw error;
    }
  }

  /**
   * 发起请求并直接返回 data 字段（去掉 Result 包装）
   */
  async requestAndFormatData<T>(
    method: string,
    url: string,
    config: RequestConfig = {},
  ): Promise<T> {
    const result = await this.request<Result<T>>(method, url, config);
    return result.data;
  }

  private clearAuthAndRedirect() {
    try {
      const userCookie = useCookie<UserInfo | null>("auth-user");
      const tokenCookie = useCookie<string | null>("auth-token");
      userCookie.value = null;
      tokenCookie.value = null;
      if (import.meta.client) {
        navigateTo("/login");
      }
    } catch {
      // 上下文丢失时回退到客户端跳转
      if (import.meta.client) {
        window.location.href = "/login";
      }
    }
  }
}

// ==================== Mock HTTP 客户端 ====================
/**
 * 模拟后端请求，使用内存中的 mock 数据进行 CRUD 操作。
 * 成功态使用 state: "success"，与真实后端返回结构保持一致（见 types/result.ts）。
 */
const db = {
  articles: [...mockArticles] as Article[],
  categories: [...mockCategories] as Category[],
  columns: [...mockColumns] as Column[],
  friends: [...mockFriends] as Friend[],
};

let idCounter = 1000;
function genId(prefix: string): string {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

function delay(ms = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function ok<T>(data: T, message = "操作成功"): Result<T> {
  return { state: "success", code: "200", message, data };
}

function listOk<T>(data: T[], page: Page, message = "查询成功"): ResultList<T> {
  return { state: "success", code: "200", message, data, page };
}

function paginate<T>(list: T[], params: Record<string, any>): ResultList<T> {
  const page = Number(params.pagination || params.page || 1);
  const size = Number(params.size || 10);
  const total = list.length;
  const start = (page - 1) * size;
  const data = list.slice(start, start + size);
  return listOk(data, {
    total: String(total),
    count: data.length,
    size,
    pagination: page,
  });
}

class MockHttp implements HttpLike {
  async request<T>(
    method: string,
    url: string,
    config: RequestConfig = {},
    extraParams?: any,
  ): Promise<T> {
    await delay();
    const m = method.toLowerCase();
    const { params = {}, data } = config;
    const mergedParams = cleanParams({ ...params, ...(extraParams || {}) });
    return this.route<T>(m, url, mergedParams, data) as T;
  }

  async requestAndFormatData<T>(
    method: string,
    url: string,
    config: RequestConfig = {},
  ): Promise<T> {
    const result = await this.request<Result<T>>(method, url, config);
    return result.data;
  }

  private route<T>(
    method: string,
    url: string,
    params: Record<string, any>,
    data: any,
  ): T {
    // 统一去掉前导 /，便于匹配（api 模块传入的 url 不带前导 /）
    const u = url.replace(/^\/+/, "");

    // ---------- 用户相关 ----------
    if (u === "blog/v1/login" && method === "post") {
      return ok(mockUserInfo, "登录成功") as unknown as T;
    }
    if (u === "blog/v1/logout" && method === "post") {
      return ok(null, "已退出登录") as unknown as T;
    }
    if (u === "blog/v1/a/users/reset" && method === "post") {
      return ok(null, "密码重置成功") as unknown as T;
    }

    // ---------- 统计 ----------
    if (u === "blog/v1/a/statistics" && method === "get") {
      return ok(mockStatistics, "查询成功") as unknown as T;
    }

    // ---------- 文章 ----------
    if (u === "blog/v1/a/articles/recent" && method === "get") {
      const size = Number(params.size || 5);
      const recent = db.articles.filter((a) => a.status === 1).slice(0, size);
      return paginate(recent, params) as unknown as T;
    }
    if (u === "blog/v1/a/articles") {
      if (method === "get") return this.listArticles(params) as unknown as T;
      if (method === "post") return this.saveArticle(data) as unknown as T;
      if (method === "put") return this.updateArticle(data) as unknown as T;
    }
    if (u === "blog/v1/a/articles/part" && method === "post") {
      return this.updateArticle(data) as unknown as T;
    }
    if (u.startsWith("blog/v1/a/articles/") && method === "delete") {
      return this.deleteArticle(u.split("/").pop()!) as unknown as T;
    }
    if (u.startsWith("blog/v1/a/articles/") && method === "get") {
      return this.getArticle(u.split("/").pop()!) as unknown as T;
    }

    // ---------- 分类 ----------
    if (u === "blog/v1/a/categories") {
      if (method === "get") return this.listCategories(params) as unknown as T;
      if (method === "post") return this.saveCategory(data) as unknown as T;
      if (method === "put") return this.updateCategory(data) as unknown as T;
    }
    if (u.startsWith("blog/v1/a/categories/") && method === "delete") {
      return this.deleteCategory(u.split("/").pop()!) as unknown as T;
    }

    // ---------- 专栏 ----------
    if (u === "blog/v1/a/columns") {
      if (method === "get") return this.listColumns(params) as unknown as T;
      if (method === "post") return this.saveColumn(data) as unknown as T;
      if (method === "put") return this.updateColumn(data) as unknown as T;
    }
    if (u === "blog/v1/a/columns/all" && method === "get") {
      return ok(db.columns) as unknown as T;
    }
    if (u.startsWith("blog/v1/a/columns/") && method === "delete") {
      return this.deleteColumn(u.split("/").pop()!) as unknown as T;
    }

    // ---------- 友链 ----------
    if (u === "blog/v1/a/friends") {
      if (method === "get") return this.listFriends(params) as unknown as T;
      if (method === "post") return this.saveFriend(data) as unknown as T;
      if (method === "put") return this.updateFriend(data) as unknown as T;
    }
    if (u.startsWith("blog/v1/a/friends/") && method === "delete") {
      return this.deleteFriend(u.split("/").pop()!) as unknown as T;
    }

    // ---------- 搜索 ----------
    if (u === "blog/v1/search" && method === "get") {
      return this.listArticles(params) as unknown as T;
    }

    return ok(null, "未知接口") as unknown as T;
  }

  // ===== 文章操作 =====
  private listArticles(params: Record<string, any>): ResultList<Article> {
    let list = [...db.articles];
    if (params.keyword) {
      const kw = String(params.keyword).toLowerCase();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(kw) ||
          a.description.toLowerCase().includes(kw),
      );
    }
    if (params.status !== undefined && params.status !== null && params.status !== "") {
      list = list.filter((a) => a.status === Number(params.status));
    }
    return paginate(list, params);
  }

  private getArticle(id: string): Result<Article> {
    const article = db.articles.find((a) => a.id === id);
    if (!article) return ok(null as any, "文章不存在") as any;
    return ok({ ...article });
  }

  private saveArticle(data: Article): Result<Article> {
    const newArticle: Article = {
      ...data,
      id: genId("art"),
      createdDate: new Date().toLocaleString("zh-CN"),
      updatedDate: new Date().toLocaleString("zh-CN"),
    };
    db.articles.unshift(newArticle);
    return ok(newArticle, "文章创建成功");
  }

  private updateArticle(data: Article): Result<Article> {
    const idx = db.articles.findIndex((a) => a.id === data.id);
    if (idx === -1) return ok(null as any, "文章不存在") as any;
    db.articles[idx] = {
      ...db.articles[idx],
      ...data,
      updatedDate: new Date().toLocaleString("zh-CN"),
    };
    return ok(db.articles[idx], "文章更新成功");
  }

  private deleteArticle(id: string): Result<Article> {
    const idx = db.articles.findIndex((a) => a.id === id);
    if (idx === -1) return ok(null as any, "文章不存在") as any;
    const removed = db.articles.splice(idx, 1)[0];
    return ok(removed, "文章删除成功");
  }

  // ===== 分类操作 =====
  private listCategories(params: Record<string, any>): ResultList<Category> {
    let list = [...db.categories];
    if (params.keyword) {
      const kw = String(params.keyword).toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(kw));
    }
    return paginate(list, params);
  }

  private saveCategory(data: Category): Result<Category> {
    const newCat: Category = { ...data, id: genId("cat") };
    db.categories.push(newCat);
    return ok(newCat, "分类创建成功");
  }

  private updateCategory(data: Category): Result<Category> {
    const idx = db.categories.findIndex((c) => c.id === data.id);
    if (idx === -1) return ok(null as any, "分类不存在") as any;
    db.categories[idx] = { ...db.categories[idx], ...data };
    return ok(db.categories[idx], "分类更新成功");
  }

  private deleteCategory(id: string): Result<Category> {
    const idx = db.categories.findIndex((c) => c.id === id);
    if (idx === -1) return ok(null as any, "分类不存在") as any;
    const removed = db.categories.splice(idx, 1)[0];
    return ok(removed, "分类删除成功");
  }

  // ===== 专栏操作 =====
  private listColumns(params: Record<string, any>): ResultList<Column> {
    let list = [...db.columns];
    if (params.keyword) {
      const kw = String(params.keyword).toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(kw) ||
          c.description.toLowerCase().includes(kw),
      );
    }
    return paginate(list, params);
  }

  private saveColumn(data: Column): Result<Column> {
    const newCol: Column = { ...data, id: genId("col") };
    db.columns.unshift(newCol);
    return ok(newCol, "专栏创建成功");
  }

  private updateColumn(data: Column): Result<Column> {
    const idx = db.columns.findIndex((c) => c.id === data.id);
    if (idx === -1) return ok(null as any, "专栏不存在") as any;
    db.columns[idx] = { ...db.columns[idx], ...data };
    return ok(db.columns[idx], "专栏更新成功");
  }

  private deleteColumn(id: string): Result<Column> {
    const idx = db.columns.findIndex((c) => c.id === id);
    if (idx === -1) return ok(null as any, "专栏不存在") as any;
    const removed = db.columns.splice(idx, 1)[0];
    return ok(removed, "专栏删除成功");
  }

  // ===== 友链操作 =====
  private listFriends(params: Record<string, any>): ResultList<Friend> {
    let list = [...db.friends];
    if (params.keyword) {
      const kw = String(params.keyword).toLowerCase();
      list = list.filter(
        (f) => f.name.toLowerCase().includes(kw) || f.website.toLowerCase().includes(kw),
      );
    }
    if (params.status !== undefined && params.status !== null && params.status !== "") {
      list = list.filter((f) => f.status === Number(params.status));
    }
    list.sort((a, b) => b.weight - a.weight);
    return paginate(list, params);
  }

  private saveFriend(data: Friend): Result<Friend> {
    const newFriend: Friend = { ...data, id: genId("frd") };
    db.friends.push(newFriend);
    return ok(newFriend, "友链创建成功");
  }

  private updateFriend(data: Friend): Result<Friend> {
    const idx = db.friends.findIndex((f) => f.id === data.id);
    if (idx === -1) return ok(null as any, "友链不存在") as any;
    db.friends[idx] = { ...db.friends[idx], ...data };
    return ok(db.friends[idx], "友链更新成功");
  }

  private deleteFriend(id: string): Result<Friend> {
    const idx = db.friends.findIndex((f) => f.id === id);
    if (idx === -1) return ok(null as any, "友链不存在") as any;
    const removed = db.friends.splice(idx, 1)[0];
    return ok(removed, "友链删除成功");
  }
}

// ==================== 客户端选择 ====================
const realHttp = new HttpClient();
const mockHttp = new MockHttp();

function resolveHttp(): HttpLike {
  // 通过环境变量 NUXT_PUBLIC_MOCK_ENABLED=true 开启 Mock
  const flag = useRuntimeConfig().public.mockEnabled;
  return String(flag) === "true" ? mockHttp : realHttp;
}

export const http: HttpLike = {
  request: (method, url, config, extraParams) =>
    resolveHttp().request(method, url, config, extraParams),
  requestAndFormatData: (method, url, config) =>
    resolveHttp().requestAndFormatData(method, url, config),
};
