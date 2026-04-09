<script setup lang="ts">
import type {PropType} from "vue";
import type {ArchiveArticleInterface} from "@/types/articleInterface";
import {formatDateTime} from "@ahzoo/utils";
import {ArrowUpRight} from "lucide-vue-next";

defineProps({
  index: Number,
  article: {
    type: Object as PropType<ArchiveArticleInterface>,
    required: true
  }
});
</script>

<template>
  <a 
    :href="`/p/${article.path}`" 
    class="archive-item group no-style"
    :style="{ '--item-index': index || 0 }"
  >
    <div class="archive-item-inner">
      <div class="item-date-badge">
        <span class="date-day">{{ new Date(article.createdDate || '').getDate() }}</span>
        <span class="date-month">{{ new Date(article.createdDate || '').toLocaleString('zh-CN', { month: 'short' }) }}</span>
      </div>
      
      <div class="item-content">
        <h4 class="item-title">{{ article.title }}</h4>
        <div class="item-meta">
          <span class="meta-time">{{ formatDateTime(article.createdDate || "") }}</span>
        </div>
      </div>
      
      <div class="item-arrow">
        <ArrowUpRight :size="20" strokeWidth="1.5" />
      </div>
      
      <div class="item-hover-line"></div>
    </div>
  </a>
</template>

<style scoped lang="scss">
.archive-item {
  display: block;
  position: relative;
  color: rgb(var(--z-fontcolor));
  text-decoration: none;
  animation: itemFadeIn 0.4s ease forwards;
  animation-delay: calc(var(--item-index) * 0.05s);
  opacity: 0;
  transform: translateY(10px);

  @keyframes itemFadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

.archive-item-inner {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.875rem 1rem;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: transparent;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(var(--z-primary-color), 0.03) 0%,
      transparent 50%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }
}

.archive-item:hover .archive-item-inner {
  background: rgba(var(--z-common-bg), 0.8);
  transform: translateX(8px);
  
  &::before {
    opacity: 1;
  }
}

.item-date-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  height: 48px;
  border-radius: 10px;
  background: linear-gradient(
    145deg,
    rgba(var(--z-primary-color), 0.1) 0%,
    rgba(var(--z-primary-color), 0.05) 100%
  );
  border: 1px solid rgba(var(--z-primary-color), 0.1);
  transition: all 0.3s ease;
  
  .date-day {
    font-size: 1.125rem;
    font-weight: 700;
    color: rgb(var(--z-primary-color));
    line-height: 1;
  }
  
  .date-month {
    font-size: 0.625rem;
    text-transform: uppercase;
    color: rgb(var(--z-fontcolor-gray));
    letter-spacing: 0.5px;
    margin-top: 2px;
  }
}

.archive-item:hover .item-date-badge {
  background: linear-gradient(
    145deg,
    rgba(var(--z-primary-color), 0.15) 0%,
    rgba(var(--z-primary-color), 0.08) 100%
  );
  border-color: rgba(var(--z-primary-color), 0.2);
  transform: scale(1.05);
}

.item-content {
  flex: 1;
  min-width: 0;
}

.item-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: rgb(var(--z-fontcolor));
  margin: 0 0 4px 0;
  line-height: 1.4;
  transition: color 0.3s ease;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.archive-item:hover .item-title {
  color: rgb(var(--z-primary-color));
}

.item-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.meta-time {
  font-size: 0.75rem;
  color: rgb(var(--z-fontcolor-gray));
  opacity: 0.8;
}

.item-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  color: rgb(var(--z-fontcolor-gray));
  opacity: 0;
  transform: translateX(-8px) rotate(-45deg);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(var(--z-primary-color), 0.08);
}

.archive-item:hover .item-arrow {
  opacity: 1;
  transform: translateX(0) rotate(0deg);
  color: rgb(var(--z-primary-color));
  background: rgba(var(--z-primary-color), 0.12);
}

.item-hover-line {
  position: absolute;
  bottom: 0;
  left: 1rem;
  right: 1rem;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(var(--z-primary-color), 0.2),
    transparent
  );
  opacity: 0;
  transform: scaleX(0);
  transition: all 0.4s ease;
}

.archive-item:hover .item-hover-line {
  opacity: 1;
  transform: scaleX(1);
}

@media (max-width: 640px) {
  .archive-item-inner {
    padding: 0.75rem;
    gap: 0.75rem;
  }
  
  .item-date-badge {
    min-width: 42px;
    height: 42px;
    
    .date-day {
      font-size: 1rem;
    }
  }
  
  .item-title {
    font-size: 0.875rem;
  }
  
  .item-arrow {
    width: 28px;
    height: 28px;
  }
}
</style>
