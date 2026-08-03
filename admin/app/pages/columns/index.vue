<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  PlusIcon,
  PencilIcon,
  Trash2Icon,
  Columns3Icon,
} from "@lucide/vue";
import { toast } from "vue-sonner";
import { listColumn, saveColumn, updateColumn, deleteColumn } from "@/api/column";
import { listCategory } from "@/api/category";
import type { Column } from "@/types/column";
import type { Category } from "@/types/category";
import type { ResultList } from "@/types/result";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const emptyColumn: Column = {
  id: "",
  name: "",
  description: "",
  thumbnail: "",
  categoryList: [],
  categoryIds: [],
};

// 列表接口：p（页码，必填）+ categoryId（可选）
const filterCategory = ref<string>("all");
const currentPage = ref(1);
const pageSize = ref(20);

const columns = ref<Column[]>([]);
const categories = ref<Category[]>([]);
const total = ref(0);
const loading = ref(true);
const submitting = ref(false);
const deleting = ref(false);

const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize.value)));

const dialogOpen = ref(false);
const isEdit = ref(false);
const form = ref<Column>({ ...emptyColumn });

const deleteTarget = ref<Column | null>(null);

const fetchColumns = async () => {
  loading.value = true;
  try {
    const res = await listColumn({
      p: currentPage.value,
      categoryId: filterCategory.value === "all" ? "" : filterCategory.value,
    });
    const data = res as ResultList<Column>;
    columns.value = data.data ?? [];
    total.value = Number(data.page.total);
    if (data.page.size) pageSize.value = data.page.size;
  } catch {
    // 错误提示由 http 客户端统一处理
  } finally {
    loading.value = false;
  }
};

const fetchCategories = async () => {
  try {
    // 分类列表接口无需参数
    const res = await listCategory();
    const data = res as ResultList<Category>;
    categories.value = data.data ?? [];
  } catch {
    // 关联分类加载失败不阻塞主流程
  }
};

const handleFilter = () => {
  currentPage.value = 1;
  fetchColumns();
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
  fetchColumns();
};

const openCreate = () => {
  isEdit.value = false;
  form.value = { ...emptyColumn, categoryIds: [], categoryList: [] };
  dialogOpen.value = true;
};

const openEdit = (column: Column) => {
  isEdit.value = true;
  // 后端返回的 column 只有 categoryList，没有 categoryIds，需从 categoryList 推导并兜底
  const catList = column.categoryList ?? [];
  form.value = {
    ...column,
    categoryIds: catList.map((c) => c.id),
    categoryList: [...catList],
  };
  dialogOpen.value = true;
};

const toggleCategory = (category: Category, checked: boolean | string) => {
  if (checked) {
    if (!form.value.categoryIds.includes(category.id)) {
      form.value.categoryIds = [...form.value.categoryIds, category.id];
      form.value.categoryList = [...form.value.categoryList, category];
    }
  } else {
    form.value.categoryIds = form.value.categoryIds.filter(
      (id) => id !== category.id,
    );
    form.value.categoryList = form.value.categoryList.filter(
      (c) => c.id !== category.id,
    );
  }
};

const handleSubmit = async () => {
  if (!form.value.name.trim()) {
    toast.warning("请输入专栏名称");
    return;
  }
  if (!isEdit.value && !form.value.categoryIds.length) {
    toast.warning("请至少选择一个关联分类");
    return;
  }
  submitting.value = true;
  try {
    const editing = isEdit.value && !!form.value.id;
    if (editing) {
      await updateColumn(form.value);
    } else {
      await saveColumn(form.value);
    }
    toast.success(editing ? "专栏更新成功" : "专栏创建成功");
    dialogOpen.value = false;
    await fetchColumns();
  } catch {
    // 错误提示由 http 客户端统一处理
  } finally {
    submitting.value = false;
  }
};

const confirmDelete = (column: Column) => {
  deleteTarget.value = column;
};

const handleDelete = async () => {
  if (!deleteTarget.value) return;
  deleting.value = true;
  try {
    await deleteColumn(deleteTarget.value.id);
    toast.success("专栏已删除");
    deleteTarget.value = null;
    await fetchColumns();
  } catch {
    // 错误提示由 http 客户端统一处理
  } finally {
    deleting.value = false;
  }
};

onMounted(async () => {
  await Promise.all([fetchColumns(), fetchCategories()]);
});
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight">专栏管理</h1>
        <p class="text-sm text-muted-foreground">管理博客专栏</p>
      </div>
      <Button @click="openCreate">
        <PlusIcon data-icon="inline-start" />
        新建专栏
      </Button>
    </div>

    <Card>
      <CardHeader>
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-center gap-2">
            <Select v-model="filterCategory" @update:model-value="handleFilter">
              <SelectTrigger class="w-40">
                <SelectValue placeholder="分类筛选" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">全部分类</SelectItem>
                  <SelectItem v-for="cat in categories" :key="cat.id" :value="cat.id">
                    {{ cat.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <p class="text-sm text-muted-foreground">共 {{ total }} 个专栏</p>
        </div>
      </CardHeader>
      <CardContent>
        <Table v-if="!loading && columns.length">
          <TableHeader>
            <TableRow>
              <TableHead class="w-16">封面</TableHead>
              <TableHead class="w-40">名称</TableHead>
              <TableHead>描述</TableHead>
              <TableHead class="w-52">分类</TableHead>
              <TableHead class="w-24 text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="column in columns" :key="column.id">
              <TableCell>
                <img
                  v-if="column.thumbnail"
                  :src="column.thumbnail"
                  :alt="column.name"
                  class="size-10 rounded-md object-cover"
                />
                <div
                  v-else
                  class="flex size-10 items-center justify-center rounded-md bg-muted"
                >
                  <Columns3Icon class="size-4 text-muted-foreground" />
                </div>
              </TableCell>
              <TableCell class="font-medium">{{ column.name }}</TableCell>
              <TableCell class="max-w-[320px]">
                <span class="block truncate text-muted-foreground">
                  {{ column.description }}
                </span>
              </TableCell>
              <TableCell>
                <div class="flex flex-wrap gap-1">
                  <Badge
                    v-for="cat in column.categoryList"
                    :key="cat.id"
                    variant="secondary"
                  >
                    {{ cat.name }}
                  </Badge>
                  <span
                    v-if="!column.categoryList?.length"
                    class="text-sm text-muted-foreground"
                  >
                    —
                  </span>
                </div>
              </TableCell>
              <TableCell class="text-right">
                <div class="flex justify-end gap-1">
                  <Button variant="ghost" size="icon" @click="openEdit(column)">
                    <PencilIcon />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    @click="confirmDelete(column)"
                  >
                    <Trash2Icon class="text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div v-else-if="loading" class="flex flex-col gap-3">
          <Skeleton v-for="i in 5" :key="i" class="h-14 w-full" />
        </div>

        <div
          v-else
          class="flex flex-col items-center gap-3 py-12 text-center"
        >
          <Columns3Icon class="size-10 text-muted-foreground/50" />
          <div>
            <p class="font-medium">暂无专栏</p>
            <p class="text-sm text-muted-foreground">点击右上角新建专栏</p>
          </div>
        </div>

        <div v-if="!loading && total > 0" class="mt-4">
          <Pagination
            :page="currentPage"
            :total="total"
            :items-per-page="pageSize"
            :sibling-count="1"
            @update:page="handlePageChange"
          >
            <PaginationContent v-slot="{ items }" class="flex items-center gap-1">
              <PaginationFirst />
              <PaginationPrevious />
              <template v-for="(item, index) in items" :key="index">
                <PaginationEllipsis v-if="item.type === 'ellipsis'" />
                <PaginationItem
                  v-else
                  :value="item.value"
                  :is-active="item.value === currentPage"
                >
                  {{ item.value }}
                </PaginationItem>
              </template>
              <PaginationNext />
              <PaginationLast />
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
    </Card>

    <Dialog :open="dialogOpen" @update:open="(v) => (dialogOpen = v)">
      <DialogContent class="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{{ isEdit ? "编辑专栏" : "新建专栏" }}</DialogTitle>
          <DialogDescription>
            {{ isEdit ? "修改专栏信息与关联分类" : "创建一个新的博客专栏" }}
          </DialogDescription>
        </DialogHeader>

        <div class="max-h-[60vh] overflow-y-auto pr-1">
          <FieldGroup>
            <Field>
              <FieldLabel for="column-name">名称</FieldLabel>
              <Input
                id="column-name"
                v-model="form.name"
                placeholder="请输入专栏名称"
              />
            </Field>
            <Field>
              <FieldLabel for="column-desc">描述</FieldLabel>
              <Textarea
                id="column-desc"
                v-model="form.description"
                placeholder="请输入专栏描述"
                :rows="3"
              />
            </Field>
            <Field>
              <FieldLabel for="column-thumb">封面 URL</FieldLabel>
              <Input
                id="column-thumb"
                v-model="form.thumbnail"
                placeholder="https://..."
              />
            </Field>
            <Field>
              <FieldLabel>关联分类</FieldLabel>
              <FieldGroup class="grid grid-cols-2 gap-2">
                <Field v-for="category in categories" :key="category.id">
                  <FieldLabel class="font-normal">
                    <Checkbox
                      :model-value="form.categoryIds.includes(category.id)"
                      @update:model-value="(v) => toggleCategory(category, v)"
                    />
                    {{ category.name }}
                  </FieldLabel>
                </Field>
                <p
                  v-if="!categories.length"
                  class="col-span-2 text-sm text-muted-foreground"
                >
                  暂无可选分类
                </p>
              </FieldGroup>
            </Field>
          </FieldGroup>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            :disabled="submitting"
            @click="dialogOpen = false"
          >
            取消
          </Button>
          <Button :disabled="submitting" @click="handleSubmit">
            {{ submitting ? "保存中..." : "保存" }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <AlertDialog :open="!!deleteTarget">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>确认删除专栏？</AlertDialogTitle>
          <AlertDialogDescription>
            确定要删除「{{ deleteTarget?.name }}」吗？此操作不可撤销。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel :disabled="deleting" @click="deleteTarget = null">取消</AlertDialogCancel>
          <AlertDialogAction :disabled="deleting" @click="handleDelete">
            {{ deleting ? "删除中..." : "删除" }}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>
