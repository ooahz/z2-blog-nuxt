<script setup lang="ts">
import type {PropType} from "vue";
import type {PreviewArticleInterface} from "@/types/articleInterface";
import {formatDateTime} from "@ahzoo/utils";
import {ArrowUpRight, CalendarDays} from "lucide-vue-next";

defineProps({
  article: {
    type: Object as PropType<PreviewArticleInterface>,
    required: true
  },
  index: {
    type: Number,
    default: 0
  }
});
</script>

<template>
  <a :href="`/p/${article.path}`"
     class="lead box-item"
     :style="{ '--item-index': index }">
    <div class="lead__spine" aria-hidden="true">
      <span>Featured Article</span>
    </div>

    <div class="lead__inner">
      <div class="lead__text">
        <div class="lead__eyebrow">
          <span class="lead__eyebrow-line"/>
          <span class="lead__eyebrow-text">Featured Article</span>
        </div>

        <div class="lead__index loli-font" aria-hidden="true">
          {{ String(index + 1).padStart(2, '0') }}
        </div>

        <div class="lead__title">{{ article.title }}</div>

        <p v-if="article.description" class="lead__desc three-line">
          {{ article.description }}
        </p>

        <div class="lead__meta">
          <div class="lead__date" v-if="article.createdDate">
            <CalendarDays :size="14"/>
            <span>{{ formatDateTime(article.createdDate) }}</span>
          </div>
          <div class="lead__cols" v-if="article.columnList?.length">
            <span v-for="col in article.columnList" :key="col.id" class="lead__col">
              {{ col.name }}
            </span>
          </div>
          <div class="lead__cta">
            <span>阅读全文</span>
            <ArrowUpRight :size="15"/>
          </div>
        </div>
      </div>

      <div class="lead__cover" v-if="article.thumbnail">
        <div class="lead__cover-frame">
          <img :src="article.thumbnail" :alt="article.title" class="lead__cover-img"
               loading="lazy" decoding="async">
          <div class="lead__cover-sheen"/>
        </div>
      </div>
    </div>

    <div class="lead__rule"/>
  </a>
</template>

<style lang="scss" scoped>
.lead {
  position: relative;
  display: block;
  text-decoration: none;
  color: inherit;
  padding: 32px 36px 28px;
  border-radius: 18px;
  background: rgba(var(--z-common-bg), 0.7);
  backdrop-filter: blur(14px);
  overflow: hidden;
  isolation: isolate;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
  box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1),
  border-color 0.5s ease;
  opacity: 0;
  animation: lead-in 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.85s forwards;

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(var(--z-primary-color), 0.22);
    box-shadow: 0 30px 60px -25px rgba(var(--z-gray-bg), 0.22);

    .lead__cover-img {
      transform: scale(1.06);
    }
    .lead__cta {
      color: rgb(var(--z-primary-color));
      gap: 9px;

      svg {
        transform: translate(2px, -2px);
      }
    }
    .lead__title {
      color: rgb(var(--z-primary-color));
    }
    .lead__col {
      background: rgba(var(--z-primary-color), 0.08);
      color: rgba(var(--z-primary-color), 0.85);
      border-color: rgba(var(--z-primary-color), 0.15);
    }
  }
}

.lead__spine {
  position: absolute;
  top: 50%;
  left: 14px;
  transform: translateY(-50%) rotate(-90deg);
  transform-origin: left center;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.42em;
  text-transform: uppercase;
  opacity: .2;
}

.lead__inner {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 40px;
  align-items: stretch;
}

.lead__text {
  position: relative;
  display: flex;
  flex-direction: column;
}

.lead__eyebrow {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;

  &-line {
    width: 32px;
    height: 1.5px;
    background: rgba(var(--z-primary-color), 0.7);
  }

  &-text {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    opacity: .55;
  }
}

.lead__index {
  position: absolute;
  top: -22px;
  right: 0;
  font-size: clamp(7rem, 14vw, 11rem);
  font-weight: 900;
  letter-spacing: -0.06em;
  background: linear-gradient(160deg,
      rgba(var(--z-primary-color), 0.1) 0%,
      rgba(var(--z-primary-color), 0.02) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  pointer-events: none;
  user-select: none;
  z-index: 0;
}

.lead__title {
  position: relative;
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  font-weight: 800;
  line-height: 1.18;
  letter-spacing: 0.5px;
  margin: 0 0 16px;
  color: rgb(var(--z-fontcolor));
  transition: color 0.4s ease;
  max-width: 22ch;
}

.lead__desc {
  position: relative;
  line-height: 1.75;
  color: rgba(var(--z-fontcolor), 0.7);
  margin: 0 0 24px;
  max-width: 56ch;
}

.lead__meta {
  position: relative;
  margin-top: auto;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px 22px;
  padding-top: 18px;
  border-top: 1px dashed rgba(var(--z-fontcolor), 0.12);
}

.lead__date {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  color: rgba(var(--z-fontcolor), 0.6);

  svg {
    opacity: 0.6;
  }
}

.lead__cols {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 6px;
}

.lead__col {
  font-size: .75rem;
  letter-spacing: 0.04em;
  padding: 4px 9px;
  border-radius: 6px;
  background: rgba(var(--z-fontcolor), 0.05);
  color: rgba(var(--z-fontcolor), 0.55);
  border: 1px solid rgba(var(--z-border-color), 0.12);
  transition: all 0.3s ease;
}

.lead__cta {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  font-size: .75rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  opacity: .6;
  transition: color 0.3s ease, gap 0.3s ease;

  svg {
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
}

.lead__cover {
  position: relative;
  min-height: 240px;
}

.lead__cover-frame {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 22px 50px -18px rgba(var(--z-gray-bg), 0.3);
}

.lead__cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.lead__cover-sheen {
  position: absolute;
  inset: 0;
  background: linear-gradient(125deg,
          transparent 30%,
          rgba(255, 255, 255, 0.14) 50%,
          transparent 70%);
  pointer-events: none;
}

.lead__rule {
  position: absolute;
  bottom: 0;
  left: 36px;
  right: 36px;
  height: 2px;
  background: linear-gradient(90deg,
          rgba(var(--z-primary-color), 0.6) 0%,
          rgba(var(--z-primary-color), 0.2) 40%,
          transparent 100%);
  transform: scaleX(0);
  transform-origin: left center;
  animation: rule-grow 1.2s cubic-bezier(0.16, 1, 0.3, 1) 1.2s forwards;
}

@keyframes lead-in {
  from {
    opacity: 0;
    transform: translateY(22px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes rule-grow {
  to {
    transform: scaleX(1);
  }
}
</style>
