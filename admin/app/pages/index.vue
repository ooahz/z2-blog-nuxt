<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Columns3Icon,
  FileTextIcon,
  UsersIcon,
  TrendingUpIcon,
  ArrowRightIcon,
} from "@lucide/vue";
import { getStatistics } from "@/api/statistics";
import { listRecentArticle } from "@/api/article";
import type { HomeStatistics } from "@/types/statistics";
import type { Article } from "@/types/article";

const stats = ref<HomeStatistics | null>(null);
const recentArticles = ref<Article[]>([]);
const loading = ref(true);

const statCards = computed(() => {
  if (!stats.value) return [];
  return [
    {
      title: "专栏总数",
      value: stats.value.columns,
      icon: Columns3Icon,
      description: "已创建的专栏数量",
    },
    {
      title: "文章总数",
      value: stats.value.articles.total,
      sub: `已发布 ${stats.value.articles.publish}`,
      icon: FileTextIcon,
      description: "全部文章数量",
    },
    {
      title: "友链总数",
      value: stats.value.friends,
      icon: UsersIcon,
      description: "已添加的友链数量",
    },
  ];
});

const formatNumber = (n: number) => n.toLocaleString("zh-CN");

const articleStatusMap: Record<number, { label: string; variant: "default" | "secondary" | "outline" }> = {
  1: { label: "正常", variant: "default" },
  2: { label: "隐藏", variant: "secondary" },
  3: { label: "草稿", variant: "outline" },
};

const fetchData = async () => {
  loading.value = true;
  try {
    const [statsRes, articlesRes] = await Promise.all([
      getStatistics(),
      listRecentArticle(5),
    ]);
    stats.value = statsRes.data;
    recentArticles.value = articlesRes.data;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- 页面标题 -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight">仪表盘</h1>
        <p class="text-sm text-muted-foreground">欢迎回来，这里是你的博客数据概览</p>
      </div>
      <Button as-child>
        <NuxtLink to="/articles/create">
          <FileTextIcon data-icon="inline-start" />
          写文章
        </NuxtLink>
      </Button>
    </div>

    <!-- 统计卡片 -->
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <template v-if="loading">
        <Skeleton v-for="i in 3" :key="i" class="h-32 rounded-xl" />
      </template>
      <Card v-for="card in statCards" v-else :key="card.title">
        <CardHeader>
          <div class="flex items-center justify-between">
            <CardDescription>{{ card.title }}</CardDescription>
            <component :is="card.icon" class="size-4 text-muted-foreground" />
          </div>
          <CardTitle class="text-3xl">{{ formatNumber(card.value) }}</CardTitle>
        </CardHeader>
        <CardContent>
          <p v-if="card.sub" class="flex items-center gap-1 text-xs text-muted-foreground">
            <TrendingUpIcon class="size-3" />
            {{ card.sub }}
          </p>
          <p v-else class="text-xs text-muted-foreground">{{ card.description }}</p>
        </CardContent>
      </Card>
    </div>

    <!-- 最近文章 -->
    <Card>
      <CardHeader class="flex-row items-center justify-between">
        <div>
          <CardTitle>最近文章</CardTitle>
          <CardDescription>最新发布的 5 篇文章</CardDescription>
        </div>
        <Button variant="ghost" size="sm" as-child>
          <NuxtLink to="/articles">
            查看全部
            <ArrowRightIcon data-icon="inline-end" />
          </NuxtLink>
        </Button>
      </CardHeader>
      <CardContent>
        <Table v-if="!loading && recentArticles.length">
          <TableHeader>
            <TableRow>
              <TableHead>标题</TableHead>
              <TableHead class="w-24">状态</TableHead>
              <TableHead class="w-40">更新时间</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="article in recentArticles" :key="article.id">
              <TableCell class="font-medium">
                <NuxtLink :to="`/articles/${article.id}`" class="hover:text-primary">
                  {{ article.title }}
                </NuxtLink>
              </TableCell>
              <TableCell>
                <Badge :variant="articleStatusMap[article.status]?.variant ?? 'secondary'">
                  {{ articleStatusMap[article.status]?.label ?? "未知" }}
                </Badge>
              </TableCell>
              <TableCell class="text-muted-foreground">{{ article.updatedDate }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div v-else-if="loading" class="flex flex-col gap-3">
          <Skeleton v-for="i in 5" :key="i" class="h-12 w-full" />
        </div>
      </CardContent>
    </Card>
  </div>
</template>
