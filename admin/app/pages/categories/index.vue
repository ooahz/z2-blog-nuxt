<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
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
import { PlusIcon, PencilIcon, Trash2Icon, TagsIcon } from "@lucide/vue";
import { toast } from "vue-sonner";
import { listCategory, saveCategory, updateCategory, deleteCategory } from "@/api/category";
import type { Category } from "@/types/category";
import type { ResultList } from "@/types/result";

const categories = ref<Category[]>([]);
const loading = ref(true);

const dialogOpen = ref(false);
const editingCategory = ref<Category | null>(null);
const formData = ref<{ name: string }>({ name: "" });
const saving = ref(false);

const deleteTarget = ref<Category | null>(null);
const deleting = ref(false);

const isEdit = computed(() => !!editingCategory.value);

const fetchCategories = async () => {
  loading.value = true;
  try {
    const res = await listCategory();
    const data = res as ResultList<Category>;
    categories.value = data.data ?? [];
  } catch {
    // 错误提示由 http 客户端统一处理
  } finally {
    loading.value = false;
  }
};

const openCreateDialog = () => {
  editingCategory.value = null;
  formData.value = { name: "" };
  dialogOpen.value = true;
};

const openEditDialog = (category: Category) => {
  editingCategory.value = category;
  formData.value = { name: category.name };
  dialogOpen.value = true;
};

const handleSubmit = async () => {
  const name = formData.value.name.trim();
  if (!name) {
    toast.error("请输入分类名称");
    return;
  }
  saving.value = true;
  try {
    if (editingCategory.value) {
      await updateCategory({ id: editingCategory.value.id, name });
      toast.success("分类已更新");
    } else {
      await saveCategory({ id: "", name });
      toast.success("分类已创建");
    }
    dialogOpen.value = false;
    await fetchCategories();
  } catch {
    // 错误提示由 http 客户端统一处理
  } finally {
    saving.value = false;
  }
};

const confirmDelete = (category: Category) => {
  deleteTarget.value = category;
};

const handleDelete = async () => {
  if (!deleteTarget.value) return;
  deleting.value = true;
  try {
    await deleteCategory(deleteTarget.value.id);
    toast.success("分类已删除");
    deleteTarget.value = null;
    await fetchCategories();
  } catch {
    // 错误提示由 http 客户端统一处理
  } finally {
    deleting.value = false;
  }
};

onMounted(fetchCategories);
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight">分类管理</h1>
        <p class="text-sm text-muted-foreground">管理文章分类标签</p>
      </div>
      <Button @click="openCreateDialog">
        <PlusIcon data-icon="inline-start" />
        新建分类
      </Button>
    </div>

    <Card>
      <CardContent>
        <Table v-if="!loading && categories.length">
          <TableHeader>
            <TableRow>
              <TableHead>分类名称</TableHead>
              <TableHead class="w-24 text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="category in categories" :key="category.id">
              <TableCell class="font-medium">
                <Badge variant="secondary">{{ category.name }}</Badge>
              </TableCell>
              <TableCell class="text-right">
                <div class="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    @click="openEditDialog(category)"
                  >
                    <PencilIcon />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    @click="confirmDelete(category)"
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

        <div v-else class="flex flex-col items-center gap-3 py-12 text-center">
          <TagsIcon class="size-10 text-muted-foreground/50" />
          <div>
            <p class="font-medium">暂无分类</p>
            <p class="text-sm text-muted-foreground">点击右上角新建分类</p>
          </div>
        </div>
      </CardContent>
    </Card>

    <Dialog v-model:open="dialogOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{{ isEdit ? "编辑分类" : "新建分类" }}</DialogTitle>
          <DialogDescription>
            {{ isEdit ? "修改分类名称" : "创建一个新的文章分类标签" }}
          </DialogDescription>
        </DialogHeader>
        <form @submit.prevent="handleSubmit">
          <FieldGroup>
            <Field>
              <FieldLabel for="name">分类名称</FieldLabel>
              <Input
                id="name"
                v-model="formData.name"
                placeholder="请输入分类名称"
                :disabled="saving"
              />
            </Field>
          </FieldGroup>
          <DialogFooter class="mt-6">
            <Button
              variant="outline"
              type="button"
              :disabled="saving"
              @click="dialogOpen = false"
            >
              取消
            </Button>
            <Button type="submit" :disabled="saving">
              {{ saving ? "保存中..." : "保存" }}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

    <AlertDialog :open="!!deleteTarget">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>确认删除分类？</AlertDialogTitle>
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
