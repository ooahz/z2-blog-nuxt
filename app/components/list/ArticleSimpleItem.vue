<script setup lang="ts">
import type {PropType} from "vue";
import type {PreviewArticleInterface} from "@/types/articleInterface";
import {ChevronRightIcon} from "@heroicons/vue/24/solid";
import {formatDateTime} from "@ahzoo/utils";

defineProps({
  index: Number,
  article: {
    type: Object as PropType<PreviewArticleInterface>,
    required: true
  }
});
</script>

<template>
  <a :href="`/p/${article.path}`" class="column-article-list no-style w-full p-1 flex items-center">
    <div class="flex items-center justify-between mr-3 w-full">
      <div class="flex flex-col">
        <div class="font-size-medium font-semibold my-1">{{ article.title }}</div>
        <div class="opacity-80">{{ formatDateTime(article.updatedDate || "") }}</div>
      </div>
      <div>
        <ChevronRightIcon/>
      </div>
    </div>
  </a>
</template>
