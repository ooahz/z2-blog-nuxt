<script setup lang="ts">
import type {PropType} from "vue";
import type {ArchiveArticleInterface} from "@/types/articleInterface";
import {formatDateTime} from "@ahzoo/utils";
import {ChevronRight} from "lucide-vue-next";

defineProps({
  index: Number,
  article: {
    type: Object as PropType<ArchiveArticleInterface>,
    required: true
  }
});
</script>

<template>
  <a :href="`/p/${article.path}`" class="archive-item no-style w-full py-2 px-3 flex items-center transition-all duration-200 rounded-md">
    <div class="flex items-center justify-between w-full">
      <div class="flex flex-col flex-1 min-w-0">
        <div class="archive-item-title font-size-medium font-semibold mb-1 truncate">{{ article.title }}</div>
        <div class="archive-item-date text-sm opacity-60">{{ formatDateTime(article.createdDate || "") }}</div>
      </div>
      <div class="archive-item-arrow ml-3 flex-shrink-0 opacity-40">
        <ChevronRight :size="18" />
      </div>
    </div>
  </a>
</template>

<style scoped lang="scss">
.archive-item {
  color: rgb(var(--z-fontcolor));
  margin-bottom: 0.25rem;
  
  &:hover {
    background-color: rgba(var(--z-regular-hover-bg), 0.5);
    transform: translateX(4px);
    
    .archive-item-title {
      color: rgb(var(--z-primary-color));
    }
    
    .archive-item-arrow {
      opacity: 0.8;
      transform: translateX(2px);
    }
  }
  
  .archive-item-title {
    color: rgb(var(--z-fontcolor));
    transition: color 0.2s;
  }
  
  .archive-item-date {
    color: rgb(var(--z-fontcolor-gray));
  }
  
  .archive-item-arrow {
    transition: all 0.2s;
  }
}
</style>

