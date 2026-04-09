<script setup lang="ts">
import type {PropType} from "vue";
import type {PreviewColumnInterface} from "@/types/columnInterface";
import {FolderHeart, FileText, ArrowUpRight} from "lucide-vue-next";

const props = defineProps({
  column: {
    type: Object as PropType<PreviewColumnInterface>,
    required: true
  },
  categoryName: String
});
</script>

<template>
  <a :href="`/column/${props.column.name}`" class="column-card relative overflow-hidden rounded-lg">
    <div class="column-card__inner p-5 rounded-lg">
      <div class="column-card__header flex justify-between items-start mb-3">
        <div class="column-card__icon flex justify-center items-center rounded-md">
          <FolderHeart :size="20"/>
        </div>
        <div class="column-card__badge" v-if="categoryName && categoryName !== '全部专栏'">
          {{ categoryName }}
        </div>
      </div>

      <h3 class="column-card__title single-line">{{ column.name }}</h3>

      <p class="column-card__desc double-line flex-1">{{ column.description || '暂无描述' }}</p>

      <div class="column-card__footer flex justify-between items-center pt-3">
        <div class="column-card__meta">
          <span class="meta-item flex items-center">
            <FileText :size="16"/>
            <span>专栏文章</span>
          </span>
        </div>
        <div class="column-card__arrow flex items-center justify-center rounded-md">
          <ArrowUpRight :size="16"/>
        </div>
      </div>

      <div v-if="column.thumbnail" class="column-card__thumbnail absolute -bottom-5 -right-8 overflow-hidden">
        <img :src="column.thumbnail" alt="" class="thumbnail-img"/>
        <div class="thumbnail-overlay"></div>
      </div>
    </div>

    <div class="column-card__glow absolute inset-0"></div>
    <div class="column-card__border absolute inset-0 rounded-lg"></div>
  </a>
</template>

<style scoped lang="scss">
.column-card {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

  &:hover {
    transform: translateY(-4px);

    .column-card__inner {
      background: rgb(var(--z-common-bg));
    }

    .column-card__glow {
      opacity: 1;
    }

    .column-card__border {
      border-color: rgba(var(--z-primary-color), 0.3);
    }

    .column-card__arrow {
      transform: translate(2px, -2px);
      background: rgb(var(--z-primary-color));
      color: rgb(var(--z-primary-fontcolor));
    }

    .column-card__thumbnail {
      .thumbnail-img {
        transform: scale(1.05);
        opacity: 0.15;
      }
    }

    .column-card__icon {
      background: rgba(var(--z-primary-color), 0.15);
      color: rgb(var(--z-primary-color));
    }
  }
}

.column-card__inner {
  min-height: 180px;
  background: rgba(var(--z-common-bg), 0.8);
  transition: all 0.3s ease;

  @media (max-width: 520px) {
    padding: 1.25rem;
    min-height: 160px;
  }
}

.column-card__icon {
  width: 42px;
  height: 42px;
  background: rgba(var(--z-plain-bg), 0.8);
  color: rgba(var(--z-fontcolor-gray));
  transition: all 0.3s ease;
}

.column-card__badge {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
  background: rgba(var(--z-primary-color), 0.1);
  color: rgb(var(--z-primary-color));
  letter-spacing: 0.02em;
}

.column-card__title {
  font-weight: 700;
  color: rgb(var(--z-fontcolor));
  margin: 0 0 0.5rem;
  transition: color 0.3s ease;
}

.column-card__desc {
  font-size: 0.85rem;
  color: rgba(var(--z-fontcolor-gray));
}

.column-card__meta {
  gap: 1rem;

  .meta-item {
    gap: 0.35rem;
    font-size: 0.8rem;
    color: rgba(var(--z-fontcolor-gray));

    svg {
      opacity: 0.7;
    }
  }
}

.column-card__arrow {
  width: 32px;
  height: 32px;
  background: rgba(var(--z-plain-bg));
  color: rgba(var(--z-fontcolor-gray));
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.column-card__thumbnail {
  height: 80%;
  border-radius: 12px;
  pointer-events: none;

  .thumbnail-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.08;
    transition: all 0.4s ease;
    filter: blur(1px);
  }

  .thumbnail-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
            135deg,
            transparent 0%,
            rgba(var(--z-common-bg), 0.5) 100%
    );
  }
}

.column-card__glow {
  background: radial-gradient(
          ellipse at top left,
          rgba(var(--z-primary-color), 0.08) 0%,
          transparent 50%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.column-card__border {
  border: 1.5px solid rgba(var(--z-gray-color), 0.5);
  pointer-events: none;
  transition: border-color 0.3s ease;
}
</style>
