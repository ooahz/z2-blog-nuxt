<script setup lang="ts">
import type {PropType} from "vue";
import type {PreviewArticleInterface} from "@/types/articleInterface";
import {formatDateTime} from "@ahzoo/utils";
import {CalendarDays, ArrowUpRight} from "lucide-vue-next";

defineProps({
  article: {
    type: Object as PropType<PreviewArticleInterface>,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
});
</script>

<template>
  <a :href="`/p/${article.path}`"
     class="story box-item"
     :style="{ '--item-index': index }">
    <div class="story__inner">
      <div class="story__cover" v-if="article.thumbnail">
        <img :src="article.thumbnail" :alt="article.title"
             class="story__img" loading="lazy" decoding="async">
        <div class="story__cover-sheen"/>
      </div>

      <div class="story__body">
        <div class="story__title">{{ article.title }}</div>

        <div class="story__cols" v-if="article.columnList?.length">
          <span v-for="col in article.columnList" :key="col.id" class="story__col">
            {{ col.name }}
          </span>
        </div>

        <p v-if="article.description" class="story__desc">
          {{ article.description }}
        </p>

        <div class="story__footer">
          <div class="story__date double-line" v-if="article.createdDate">
            <CalendarDays :size="13"/>
            <span>{{ formatDateTime(article.createdDate) }}</span>
          </div>
          <div class="story__arrow">
            <ArrowUpRight :size="15"/>
          </div>
        </div>
      </div>

      <div class="story__hover-line"/>
    </div>
  </a>
</template>

<style lang="scss" scoped>
.story {
  display: block;
  position: relative;
  text-decoration: none;
  color: inherit;
  opacity: 0;
  animation: story-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: calc(var(--item-index) * 90ms + 1s);
}

.story__inner {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 14px;
  overflow: hidden;
  background: rgba(var(--z-common-bg), 0.6);
  border: 1px solid rgba(var(--z-border-color), 0.08);
  backdrop-filter: blur(10px);
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
  box-shadow 0.45s cubic-bezier(0.16, 1, 0.3, 1),
  border-color 0.45s ease;
}

.story:hover {
  .story__inner {
    transform: translateY(-4px);
    border-color: rgba(var(--z-primary-color), 0.22);
    box-shadow: 0 22px 48px -22px rgba(var(--z-gray-bg), 0.22);
  }

  .story__img {
    transform: scale(1.06);
  }

  .story__title {
    color: rgb(var(--z-primary-color));
  }

  .story__arrow {
    opacity: 1;
    transform: translate(0, 0) rotate(0deg);
    color: rgb(var(--z-primary-color));
    background: rgba(var(--z-primary-color), 0.12);
  }

  .story__hover-line {
    transform: scaleX(1);
    opacity: 1;
  }
}

.story__cover {
  position: relative;
  aspect-ratio: 16 / 8;
  overflow: hidden;
  background: rgba(var(--z-regular-bg), 0.4);
}

.story__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.story__cover-sheen {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg,
      transparent 50%,
      rgba(0, 0, 0, 0.35) 100%),
  linear-gradient(125deg,
          transparent 30%,
          rgba(255, 255, 255, 0.1) 50%,
          transparent 70%);
  pointer-events: none;
}

.story__body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 18px 18px 16px;
  flex: 1;
}

.story__title {
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.4;
  transition: color 0.35s ease;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.story__cols {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.story__col {
  font-size: .7rem;
  letter-spacing: 0.04em;
  padding: 3px 8px;
  border-radius: 6px;
  background: rgba(var(--z-fontcolor), 0.05);
  color: rgba(var(--z-fontcolor), 0.55);
  border: 1px solid rgba(var(--z-border-color), 0.12);
  transition: all 0.3s ease;
}

.story:hover .story__col {
  background: rgba(var(--z-primary-color), 0.08);
  color: rgba(var(--z-primary-color), 0.85);
  border-color: rgba(var(--z-primary-color), 0.15);
}

.story__desc {
  line-height: 1.7;
  opacity: .8;
}

.story__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  border-top: 1px dashed rgba(var(--z-border-color), 1);
}

.story__date {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: .75rem;
  opacity: .8;

  svg {
    opacity: 0.7;
  }
}

.story__arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  color: rgba(var(--z-fontcolor), 0.4);
  background: rgba(var(--z-regular-bg), 0.6);
  opacity: 0;
  transform: translate(-6px, 6px) rotate(-30deg);
  transition: opacity 0.35s ease,
  transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
  color 0.35s ease,
  background 0.35s ease;
}

.story__hover-line {
  position: absolute;
  bottom: 0;
  left: 18px;
  right: 18px;
  height: 1.5px;
  background: linear-gradient(90deg,
      rgba(var(--z-primary-color), 0.6),
      transparent);
  transform: scaleX(0);
  transform-origin: left center;
  opacity: 0;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
  opacity 0.4s ease;
}

@keyframes story-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
