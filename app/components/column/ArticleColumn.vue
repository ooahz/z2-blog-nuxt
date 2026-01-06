<script setup lang="ts">
import type {PropType} from "vue";
import type {PreviewColumnInterface} from "@/types/columnInterface";
import type {PreviewArticleInterface} from "@/types/articleInterface";
import ArticleSimpleItem from "@/components/list/ArticleSimpleItem.vue";

defineProps({
  column: {
    type: Object as PropType<PreviewColumnInterface>,
    required: true
  }
});
</script>

<template>
  <div class="article-column box w-full h-full flex flex-col relative">
    <div class="column-info mx-2 pb-3 bottom-line flex flex-col justify-around">
      <div class="title mb-3">{{ column.name }}</div>
      <div>{{ column.description }}</div>
    </div>
    <div class="hover-transparent font-size-small flex flex-col justify-center pt-2 mx-1 cursor-pointer"
         v-for="(article, index) in column.articleList">
      <ArticleSimpleItem :article="article" :index="index"/>
    </div>
  </div>
</template>
