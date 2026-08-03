<script setup lang="ts">
import { toast } from "vue-sonner";
import { saveArticle } from "@/api/article";
import type { Article } from "@/types/article";
import ArticleForm from "@/components/article/ArticleForm.vue";

const router = useRouter();
const loading = ref(false);

const form = ref<Article>({
  id: "",
  path: "",
  title: "",
  thumbnail: "",
  htmlContent: "",
  description: "",
  createdDate: "",
  updatedDate: "",
  weight: 0,
  status: 1,
  columnIds: [],
});

const handleSubmit = async () => {
  if (!form.value.title.trim()) {
    toast.warning("请输入文章标题");
    return;
  }
  loading.value = true;
  try {
    await saveArticle(form.value);
    toast.success("文章创建成功");
    router.push("/articles");
  } catch {
    // 错误提示由 http 客户端统一处理
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <ArticleForm
    v-model="form"
    :loading="loading"
    :is-edit="false"
    @submit="handleSubmit"
  />
</template>
