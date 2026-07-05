<script setup lang="ts">
import type {PropType} from "vue";
import type {ArchiveArticleInterface} from "@/types/articleInterface";
import {formatDateTime} from "@ahzoo/utils";

defineProps({
  article: {
    type: Object as PropType<ArchiveArticleInterface>,
    required: true
  }
});
</script>

<template>
  <a :href="`/p/${article.path}`" class="timeline-card timeline-card--item">
    <div class="archive-card-indicator">
      <span class="indicator-pulse"></span>
    </div>

    <div class="archive-card-content">
      <div class="archive-card-meta">
        <span class="meta-type">ARTICLE</span>
        <span class="meta-time">{{ formatDateTime(article.createdDate || "") }}</span>
      </div>

      <p class="archive-card-text">{{ article.title }}</p>

      <span class="archive-card-link">阅读全文 →</span>
    </div>
  </a>
</template>

<style scoped lang="scss">
.timeline-card {
  display: block;
  border-radius: 16px;
  overflow: hidden;
  background: rgba(var(--z-common-bg), 0.8);
  border: 1px solid rgba(var(--z-border-color), 0.2);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:hover {
    transform: translateX(8px);
    border-color: rgba(var(--z-primary-color), 0.3);
    box-shadow: 0 15px 30px -10px rgba(var(--z-primary-color), 0.1);

    .archive-card-link {
      color: rgb(var(--z-primary-color));
    }

    .indicator-pulse {
      animation: pulseGlow 1s ease-in-out infinite;
    }
  }
}

.timeline-card--item {
  display: flex;
  padding: 24px 24px 20px;
  gap: 20px;
  background: linear-gradient(
      135deg,
      rgba(var(--z-common-bg), 0.9) 0%,
      rgba(var(--z-global-bg), 0.9) 100%
  );
}

.archive-card-indicator {
  position: relative;
  width: 12px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 8px;
}

.indicator-pulse {
  width: 8px;
  height: 8px;
  background: rgba(var(--z-primary-color), 0.6);
  border-radius: 50%;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: -4px;
    border: 1px solid rgba(var(--z-primary-color), 0.3);
    border-radius: 50%;
  }
}

@keyframes pulseGlow {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(var(--z-primary-color), 0.4);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(var(--z-primary-color), 0);
  }
}

.archive-card-content {
  flex: 1;
  min-width: 0;
}

.archive-card-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.meta-type {
  font-size: 10px;
  font-weight: 700;
  color: rgba(var(--z-fontcolor), 0.4);
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.meta-time {
  font-size: 11px;
  color: rgba(var(--z-fontcolor), 0.4);
}

.archive-card-text {
  font-size: 14px;
  line-height: 1.7;
  color: rgba(var(--z-fontcolor), 0.85);
  margin: 0 0 12px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.archive-card-link {
  font-size: 12px;
  font-weight: 600;
  color: rgba(var(--z-fontcolor), 0.4);
  transition: color 0.3s ease;
}

[view="mobile"] {
  .timeline-card--item {
    padding: 18px;
    gap: 14px;
  }

  .archive-card-text {
    font-size: 13px;
    -webkit-line-clamp: 2;
  }
}

[data-theme="dark"] {
  .timeline-card--item {
    background: linear-gradient(
        135deg,
        rgba(var(--z-common-bg), 0.6) 0%,
        rgba(var(--z-page-bg), 0.6) 100%
    );
  }
}
</style>
