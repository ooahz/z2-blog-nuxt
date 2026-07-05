<script setup lang="ts">
import type {PreviewColumnInterface} from "@/types/columnInterface";
import type {CategoryMapInterface} from "@/types/categoryInterface";
import {OuOSkeleton} from "@ahzoo/ouo";
import ColumnItem from "@/components/list/ColumnItem.vue";
import {LayoutGrid, Code2, Palette, Cpu, BookOpen, Gamepad2, Music, Camera, Globe} from "lucide-vue-next";
import EmptyState from "~/components/common/EmptyState.vue";

interface Props {
  categoryList: CategoryMapInterface[];
  columnList: PreviewColumnInterface[];
  selectIndex?: number;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  selectIndex: -1,
  loading: false
});

const emit = defineEmits<{
  (e: "select-all"): void;
  (e: "select-category", category: CategoryMapInterface, index: number): void;
}>();

const isAnimating = ref(false);

watch(() => props.loading, (loading) => {
  isAnimating.value = true;
  if (!loading) {
    setTimeout(() => {
      isAnimating.value = false;
    }, 300);
  }
}, {immediate: true});

function onSelectAll() {
  emit("select-all");
}

function onSelectCategory(category: CategoryMapInterface, index: number) {
  emit("select-category", category, index);
}

const categoryIcons = [
  Code2,
  Palette,
  Cpu,
  BookOpen,
  Gamepad2,
  Music,
  Camera,
  Globe
];

const categoryColors = [
  {bg: "rgba(94, 114, 228, 0.15)", border: "rgba(94, 114, 228, 0.4)", accent: "rgb(94, 114, 228)"},
  {bg: "rgba(237, 137, 54, 0.15)", border: "rgba(237, 137, 54, 0.4)", accent: "rgb(237, 137, 54)"},
  {bg: "rgba(159, 122, 234, 0.15)", border: "rgba(159, 122, 234, 0.4)", accent: "rgb(159, 122, 234)"},
  {bg: "rgba(186, 47, 123, 0.15)", border: "rgba(186, 47, 123, 0.4)", accent: "rgb(186, 47, 123)"},
  {bg: "rgba(225, 184, 94, 0.15)", border: "rgba(225, 184, 94, 0.4)", accent: "rgb(225, 184, 94)"},
  {bg: "rgba(66, 165, 245, 0.15)", border: "rgba(66, 165, 245, 0.4)", accent: "rgb(66, 165, 245)"},
  {bg: "rgba(102, 187, 106, 0.15)", border: "rgba(102, 187, 106, 0.4)", accent: "rgb(102, 187, 106)"},
  {bg: "rgba(171, 71, 188, 0.15)", border: "rgba(171, 71, 188, 0.4)", accent: "rgb(171, 71, 188)"}
];

function getCategoryStyle(index: number) {
  const colorIndex = index % categoryColors.length;
  return categoryColors[colorIndex];
}

function getCategoryIcon(index: number) {
  return categoryIcons[index % categoryIcons.length];
}
</script>

<template>
  <div class="category-container">
    <div v-show="loading" class="skeleton h-full">
      <OuOSkeleton/>
    </div>
    <div v-show="!loading" class="category-content">
      <div class="category-nav mb-8">
        <div class="nav-track flex">
          <div
            class="nav-item"
            :class="{ 'nav-item--active': selectIndex === -1 }"
            @click="onSelectAll"
          >
            <div class="nav-item__inner">
              <LayoutGrid class="nav-icon" :size="18"/>
              <span class="nav-text">全部专栏</span>
            </div>
            <div class="nav-item__glow absolute inset-0"></div>
          </div>
          <div
            v-for="(category, index) in categoryList"
            :key="category.id"
            class="nav-item"
            :class="{ 'nav-item--active': selectIndex === index }"
            :style="selectIndex === index ? {
              '--active-bg': getCategoryStyle(index).bg,
              '--active-border': getCategoryStyle(index).border,
              '--active-accent': getCategoryStyle(index).accent
            } : {}"
            @click="onSelectCategory(category, index)"
          >
            <div class="nav-item__inner">
              <component :is="getCategoryIcon(index)" class="nav-icon" :size="18"/>
              <span class="nav-text">{{ category.name }}</span>
            </div>
            <div class="nav-item__glow absolute inset-0"></div>
          </div>
        </div>
      </div>

      <div class="category-grid grid" :class="{ 'is-animating': isAnimating }">
        <TransitionGroup name="column-list">
          <ColumnItem
            v-for="(column, idx) in columnList"
            :key="column.id"
            :column="column"
            :style="{ '--delay': `${idx * 50}ms` }"
          />
        </TransitionGroup>
      </div>

      <EmptyState
          v-if="columnList.length === 0 && !loading"
          title="暂无专栏内容"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.category-container {
  min-height: 60vh;
}

.category-content {
  animation: fadeIn 0.5s ease-out;
}

.category-nav {
  overflow-x: auto;
  overflow-y: hidden;

  .nav-track {
    gap: 0.75rem;
    padding: 0.5rem 0;
  }
}

.nav-item {
  position: relative;
  flex-shrink: 0;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 14px;
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

  &:hover {
    transform: translateY(-2px);

    .nav-item__glow {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }
}

.nav-item__inner {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: rgb(var(--z-common-bg));
  border: 1.5px solid rgba(var(--z-gray-color), 0.6);
  border-radius: 14px;
  transition: all 0.3s ease;

  .nav-icon {
    color: rgba(var(--z-fontcolor-gray));
    transition: all 0.3s ease;
  }

  .nav-text {
    font-size: 0.9rem;
    font-weight: 500;
    color: rgb(var(--z-fontcolor));
    white-space: nowrap;
    transition: all 0.3s ease;
  }
}

.nav-item__glow {
  background: radial-gradient(circle at center, rgba(var(--z-primary-color), 0.15), transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.nav-item--active {
  .nav-item__inner {
    background: var(--active-bg, rgba(var(--z-primary-color), 0.12));
    border-color: var(--active-border, rgba(var(--z-primary-color), 0.4));
    box-shadow: 0 4px 20px var(--active-bg, rgba(var(--z-primary-color), 0.15));
  }

  .nav-icon {
    color: var(--active-accent, rgb(var(--z-primary-color)));
    transform: scale(1.1);
  }

  .nav-text {
    color: var(--active-accent, rgb(var(--z-primary-color)));
    font-weight: 600;
  }

  .nav-item__glow {
    opacity: 1;
    background: radial-gradient(circle at center, var(--active-bg, rgba(var(--z-primary-color), 0.2)), transparent 70%);
  }
}

.category-grid {
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  transition: opacity 0.3s ease;

  &.is-animating {
    opacity: 0.6;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.column-list-enter-active {
  animation: columnIn 0.4s ease-out;
  animation-delay: var(--delay);
}

.column-list-leave-active {
  animation: columnOut 0.3s ease-in;
}

.column-list-move {
  transition: transform 0.4s ease;
}

@keyframes columnIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes columnOut {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.9);
  }
}
</style>
