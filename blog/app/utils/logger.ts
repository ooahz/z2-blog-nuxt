/**
 * 统一的日志工具
 * 开发环境输出日志，生产环境静默
 */
export const logger = {
  log: (...args: any[]) => {
    if (process.dev) {
      console.log(...args);
    }
  },
  warn: (...args: any[]) => {
    if (process.dev) {
      console.warn(...args);
    }
  },
  error: (...args: any[]) => {
    // 错误信息在生产环境也记录，但使用更安全的方式
    if (process.dev) {
      console.error(...args);
    }
    // 生产环境可以在这里集成错误追踪服务
  },
  debug: (...args: any[]) => {
    if (process.dev) {
      console.debug(...args);
    }
  }
};

