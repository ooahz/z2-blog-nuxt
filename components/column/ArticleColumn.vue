<script setup lang="ts">
import type {PropType} from "vue";
import type {PreviewColumn} from "@/types/columnInterface";
import type {PreviewArticle} from "@/types/articleInterface";
import ArticleSimpleItem from "@/components/list/ArticleSimpleItem.vue";

defineProps({
  column: {
    type: Object as PropType<PreviewColumn>,
    required: true
  }
});

function showArticleDetail(article: PreviewArticle) {
  navigateTo(`/p/${article.path}`);
}
</script>

<template>
  <div class="article-column box w-full h-full flex flex-col relative">
    <div class="column-info mx-2 pb-3 bottom-line flex flex-col justify-around">
      <div class="title mb-3">{{ column.name }}</div>
      <div>{{ column.description }}</div>
    </div>
    <div class="hover-transparent font-size-small flex flex-col justify-center pt-2 mx-1 cursor-pointer"
         v-for="(article, index) in column.articleList">
      <ArticleSimpleItem :article="article" :index="index"
                         @click="showArticleDetail(article)"/>
    </div>
  </div>
</template>
