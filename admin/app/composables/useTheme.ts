/**
 * 主题切换（暗色模式）
 * 通过 html 元素的 dark class 控制
 */
export const useTheme = () => {
  const isDark = useCookie<boolean>("theme-dark", {
    default: () => false,
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
  });

  const applyTheme = () => {
    if (import.meta.client) {
      document.documentElement.classList.toggle("dark", isDark.value);
    }
  };

  const toggleTheme = () => {
    isDark.value = !isDark.value;
    applyTheme();
  };

  // 初始化时应用主题
  if (import.meta.client) {
    onMounted(applyTheme);
  }

  return { isDark, toggleTheme, applyTheme };
};
