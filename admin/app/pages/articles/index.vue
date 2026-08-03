<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  PlusIcon,
  SearchIcon,
  PencilIcon,
  Trash2Icon,
  FileTextIcon,
  XIcon,
} from "@lucide/vue";
import { toast } from "vue-sonner";
import { listArticle, deleteArticle } from "@/api/article";
import { listAllColumn } from "@/api/column";
import { searchByKeyword } from "@/api/search";
import type { Article } from "@/types/article";
import type { Column } from "@/types/column";
import type { ResultList } from "@/types/result";

const router = useRouter();

// 列表接口：p（页码，必填）、status（可选）、columnId（可选）
// 搜索接口：k（关键词）、p（页码）—— 走独立的 /blog/v1/search
const searchKeyword = ref("");
const filterStatus = ref<string>("all");
const filterColumn = ref<string>("all");
const currentPage = ref(1);
// pageSize 不再传给后端，由后端返回 page.size 决定每页条数
const pageSize = ref(10);

const articles = ref<Article[]>([]);
const columns = ref<Column[]>([]);
const total = ref(0);
const loading = ref(true);
const deleteTarget = ref<Article | null>(null);
const deleting = ref(false);

// 搜索模式：有关键词时走 search 接口（仅支持 k + p），此时专栏/状态筛选不生效
const isSearchMode = computed(() => searchKeyword.value.trim().length > 0);

const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize.value)));

const articleStatusMap: Record<number, { label: string; variant: "default" | "secondary" | "outline" }> = {
  1: { label: "正常", variant: "default" },
  2: { label: "隐藏", variant: "secondary" },
  3: { label: "草稿", variant: "outline" },
};

const fetchArticles = async () => {
  loading.value = true;
  try {
    let data: ResultList<Article>;
    if (isSearchMode.value) {
      // 搜索：仅 k + p
      data = (await searchByKeyword({
        k: searchKeyword.value.trim(),
        p: currentPage.value,
      })) as ResultList<Article>;
    } else {
      // 列表：p + status + columnId
      data = (await listArticle({
        p: currentPage.value,
        status: filterStatus.value === "all" ? "" : filterStatus.value,
        columnId: filterColumn.value === "all" ? "" : filterColumn.value,
      })) as ResultList<Article>;
    }
    articles.value = data.data ?? [];
    total.value = Number(data.page.total);
    if (data.page.size) pageSize.value = data.page.size;
  } catch {
    articles.value = [];
    total.value = 0;
  } finally {
    loading.value = false;
  }
};

const fetchColumns = async () => {
  try {
    columns.value = (await listAllColumn()) ?? [];
  } catch {
    columns.value = [];
  }
};

const handleSearch = () => {
  currentPage.value = 1;
  fetchArticles();
};

// 清空搜索回到列表模式
const clearSearch = () => {
  searchKeyword.value = "";
  currentPage.value = 1;
  fetchArticles();
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
  fetchArticles();
};

const confirmDelete = (article: Article) => {
  deleteTarget.value = article;
};

const handleDelete = async () => {
  if (!deleteTarget.value) return;
  deleting.value = true;
  try {
    await deleteArticle(deleteTarget.value.id);
    toast.success("文章已删除");
    deleteTarget.value = null;
    if (articles.value.length === 1 && currentPage.value > 1) {
      currentPage.value--;
    }
    await fetchArticles();
  } catch {
    // 错误提示由 http 客户端统一处理
  } finally {
    deleting.value = false;
  }
};

onMounted(() => {
  fetchColumns();
  fetchArticles();
});
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight">文章管理</h1>
        <p class="text-sm text-muted-foreground">管理你的所有博客文章</p>
      </div>
      <Button as-child>
        <NuxtLink to="/articles/create">
          <PlusIcon data-icon="inline-start" />
          新建文章
        </NuxtLink>
      </Button>
    </div>

    <Card>
      <CardHeader>
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div class="relative flex-1">
            <SearchIcon class="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              v-model="searchKeyword"
              placeholder="搜索文章标题或关键词..."
              class="pl-9"
              @keyup.enter="handleSearch"
            />
            <button
              v-if="isSearchMode"
              type="button"
              class="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              title="清除搜索"
              @click="clearSearch"
            >
              <XIcon class="size-4" />
            </button>
          </div>
          <div class="flex gap-2">
            <Select v-model="filterStatus" :disabled="isSearchMode">
              <SelectTrigger class="w-32">
                <SelectValue placeholder="状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="1">正常</SelectItem>
                  <SelectItem value="2">隐藏</SelectItem>
                  <SelectItem value="3">草稿</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select v-model="filterColumn" :disabled="isSearchMode">
              <SelectTrigger class="w-36">
                <SelectValue placeholder="专栏" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">全部专栏</SelectItem>
                  <SelectItem v-for="col in columns" :key="col.id" :value="col.id">
                    {{ col.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button variant="secondary" @click="handleSearch">
              <SearchIcon data-icon="inline-start" />
              搜索
            </Button>
          </div>
        </div>
        <p v-if="isSearchMode" class="text-xs text-muted-foreground">
          搜索模式下仅按关键词查询，专栏与状态筛选已忽略
        </p>
      </CardHeader>
      <CardContent>
        <Table v-if="!loading && articles.length">
          <TableHeader>
            <TableRow>
              <TableHead class="w-16">封面</TableHead>
              <TableHead>标题</TableHead>
              <TableHead class="w-24">状态</TableHead>
              <TableHead class="w-20">权重</TableHead>
              <TableHead class="w-40">更新时间</TableHead>
              <TableHead class="w-24 text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="article in articles" :key="article.id">
              <TableCell>
                <img
                  v-if="article.thumbnail"
                  :src="article.thumbnail"
                  :alt="article.title"
                  class="size-10 rounded-md object-cover"
                />
                <div
                  v-else
                  class="flex size-10 items-center justify-center rounded-md bg-muted text-muted-foreground"
                  title="无封面"
                >
                  <FileTextIcon class="size-5" />
                </div>
              </TableCell>
              <TableCell class="font-medium">
                <NuxtLink
                  :to="`/articles/${article.id}`"
                  class="hover:text-primary"
                >
                  {{ article.title }}
                </NuxtLink>
              </TableCell>
              <TableCell>
                <Badge :variant="articleStatusMap[article.status]?.variant ?? 'secondary'">
                  {{ articleStatusMap[article.status]?.label ?? "未知" }}
                </Badge>
              </TableCell>
              <TableCell class="text-muted-foreground">{{ article.weight }}</TableCell>
              <TableCell class="text-muted-foreground">{{ article.updatedDate }}</TableCell>
              <TableCell class="text-right">
                <div class="flex justify-end gap-1">
                  <Button variant="ghost" size="icon" as-child>
                    <NuxtLink :to="`/articles/${article.id}`">
                      <PencilIcon />
                    </NuxtLink>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    @click="confirmDelete(article)"
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
          <FileTextIcon class="size-10 text-muted-foreground/50" />
          <div>
            <p class="font-medium">暂无文章</p>
            <p class="text-sm text-muted-foreground">点击右上角新建文章</p>
          </div>
        </div>

        <div v-if="total > pageSize" class="mt-4 flex justify-center">
          <Pagination
            :page="currentPage"
            :total="total"
            :items-per-page="pageSize"
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

    <AlertDialog :open="!!deleteTarget">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>确认删除文章？</AlertDialogTitle>
          <AlertDialogDescription>
            确定要删除「{{ deleteTarget?.title }}」吗？此操作不可撤销。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel :disabled="deleting" @click="deleteTarget = null">取消</AlertDialogCancel>
          <AlertDialogAction
            :disabled="deleting"
            @click="handleDelete"
          >
            {{ deleting ? "删除中..." : "删除" }}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>
