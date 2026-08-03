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
  <a :href="`/p/${article.path}`" class="column-article-list no-style">
    <span class="article-index">{{ String((index ?? 0) + 1).padStart(2, '0') }}</span>
    <div class="article-body">
      <div class="article-title">{{ article.title }}</div>
      <div class="article-date">{{ formatDateTime(article.updatedDate || "") }}</div>
    </div>
    <ChevronRight class="article-arrow"/>
  </a>
</template>

<style scoped lang="scss">
.column-article-list {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.875rem 0.75rem;
  border-radius: 0.625rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  opacity: 0;
  animation: article-item-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: calc(var(--item-index, 0) * 80ms + 180ms);

  &:hover {
    background: rgba(var(--z-primary-color), 0.06);
    transform: translateX(4px);

    .article-arrow {
      transform: translateX(3px);
      color: rgb(var(--z-primary-color));
    }

    .article-title {
      color: rgb(var(--z-primary-color));
    }

    .article-index {
      color: rgb(var(--z-primary-color));
      background: rgba(var(--z-primary-color), 0.1);
    }
  }
}

.article-index {
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  display: grid;
  place-items: center;
  border-radius: 0.5rem;
  font-size: 0.8125rem;
  font-weight: 700;
  color: rgba(var(--z-fontcolor), 0.4);
  background: rgba(var(--z-regular-bg), 0.6);
  transition: all 0.3s ease;
}

.article-body {
  flex: 1;
  min-width: 0;
}

.article-title {
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 0.25rem;
  color: rgb(var(--z-fontcolor));
  transition: color 0.3s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.article-date {
  font-size: 0.75rem;
  color: rgba(var(--z-fontcolor), 0.55);
}

.article-arrow {
  flex-shrink: 0;
  width: 1.1rem;
  height: 1.1rem;
  color: rgba(var(--z-fontcolor), 0.35);
  transition: all 0.3s ease;
}

@keyframes article-item-in {
  from {
    opacity: 0;
    transform: translateX(-12px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
