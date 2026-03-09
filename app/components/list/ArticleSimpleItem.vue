<script setup lang="ts">
import type {PropType} from "vue";
import type {PreviewArticleInterface} from "@/types/articleInterface";
import {formatDateTime} from "@ahzoo/utils";
import {ChevronRight} from "lucide-vue-next";

defineProps({
  index: Number,
  article: {
    type: Object as PropType<PreviewArticleInterface>,
    required: true
  }
});
</script>

<template>
  <a :href="`/p/${article.path}`" class="column-article-list no-style w-full p-2 flex items-center">
    <div class="flex items-center justify-between mr-2 w-full">
      <div class="flex flex-col">
        <div class="font-size-medium font-semibold my-1">{{ article.title }}</div>
        <div class="opacity-80">{{ formatDateTime(article.updatedDate || "") }}</div>
      </div>
      <div>
        <ChevronRight />
      </div>
    </div>
  </a>
</template>
