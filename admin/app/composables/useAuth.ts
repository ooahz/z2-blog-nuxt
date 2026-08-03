import type { UserInfo } from "@/types/user";

/**
 * 认证状态管理
 * 使用 cookie 持久化登录状态，支持 SSR
 * - auth-user: 用户信息（用于路由守卫与界面展示）
 * - auth-token: 后端下发的访问令牌（由 http 客户端自动附加到请求头）
 */
export const useAuth = () => {
  const userInfo = useCookie<UserInfo | null>("auth-user", {
    default: () => null,
    maxAge: 60 * 60 * 24 * 7, // 7 天
    sameSite: "lax",
  });

  const token = useCookie<string | null>("auth-token", {
    default: () => null,
    maxAge: 60 * 60 * 24 * 7, // 7 天
    sameSite: "lax",
  });

  const isLoggedIn = computed(() => !!userInfo.value);

  /**
   * 登录：记录用户信息与令牌
   * token 通常由 http 客户端从响应头自动捕获；若后端将 token 放在响应体内，可在此显式传入
   */
  const login = (info: UserInfo, tokenValue?: string) => {
    userInfo.value = info;
    if (tokenValue) {
      token.value = tokenValue;
    }
  };

  const logout = () => {
    userInfo.value = null;
    token.value = null;
  };

  return {
    userInfo,
    token,
    isLoggedIn,
    login,
    logout,
  };
};
