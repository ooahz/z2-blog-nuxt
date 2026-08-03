import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * @description 
 * @author 十玖八柒（Ahzoo）
 * @github https://github.com/ooahz
 * @date 2026/8
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
