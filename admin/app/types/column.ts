import type { Category } from "@/types/category";

export interface Column {
  readonly id: string;
  name: string;
  description: string;
  thumbnail: string;
  categoryList: Category[];
  categoryIds: string[];
}
