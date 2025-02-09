<script setup lang="ts">
import type {PropType} from "vue";
import type {PreviewArticle} from "@/types/articleInterface";
import {ChevronRightIcon} from "@heroicons/vue/24/solid";
import {formatDateTime} from "@ahzoo/utils";

defineProps({
  index: Number,
  article: {
    type: Object as PropType<PreviewArticle>,
    required: true
  }
});
</script>

<template>
  <div class="column-article-list w-full p-1 flex items-center">
    <div class="flex items-center justify-between mr-3 w-full">
      <div class="flex flex-col">
        <div class="font-size-medium font-semibold my-1">{{ article.title }}</div>
        <div class="opacity-80">{{ formatDateTime(article.updatedDate || "") }}</div>
      </div>
      <div>
        <ChevronRightIcon/>
      </div>
    </div>
  </div>
</template>
