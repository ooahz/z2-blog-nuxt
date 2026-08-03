<script setup lang="ts">
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "vue-sonner";
import { getArticleDetail, updateArticle } from "@/api/article";
import type { Article } from "@/types/article";
import ArticleForm from "@/components/article/ArticleForm.vue";

const route = useRoute();
const router = useRouter();
const loading = ref(false);
const fetching = ref(true);

const articleId = computed(() => route.params.id as string);

const form = ref<Article>({
  id: "",
  path: "",
  title: "",
  thumbnail: "",
  content: "",
  htmlContent: "",
  description: "",
  createdDate: "",
  updatedDate: "",
  weight: 0,
  status: 1,
  columnIds: [],
});

const fetchArticle = async () => {
  fetching.value = true;
  try {
    const data = await getArticleDetail(articleId.value);
    form.value = data;
  } catch {
    router.push("/articles");
  } finally {
    fetching.value = false;
  }
};

const handleSubmit = async () => {
  if (!form.value.title.trim()) {
    toast.warning("请输入文章标题");
    return;
  }
  loading.value = true;
  try {
    await updateArticle(form.value);
    toast.success("文章更新成功");
    router.push("/articles");
  } catch {
    // 错误提示由 http 客户端统一处理
  } finally {
    loading.value = false;
  }
};

onMounted(fetchArticle);
</script>

<template>
  <div v-if="fetching" class="flex flex-col gap-6">
    <Skeleton class="h-10 w-64" />
    <div class="flex flex-col gap-6 lg:flex-row">
      <Skeleton class="flex-1 h-96" />
      <Skeleton class="lg:w-80 h-96" />
    </div>
  </div>
  <ArticleForm
    v-else
    v-model="form"
    :loading="loading"
    :is-edit="true"
    @submit="handleSubmit"
  />
</template>
