<script setup lang="ts">
import type {TocInterface} from "@/types/tocInterface";
import {useArticleStore} from "@/store/articleStore";
import {List, X} from "lucide-vue-next";

const props = defineProps<{
  tocList: TocInterface[];
}>();

const articleStore = useArticleStore();
const showToc = ref(false);

/**
 * 切换目录显示状态
 */
function toggleToc() {
  showToc.value = !showToc.value;
}

/**
 * 关闭目录
 */
function closeToc() {
  showToc.value = false;
}

/**
 * 点击目录项后跳转并关闭
 */
function handleTocClick(tocId: string) {
  const element = document.getElementById(tocId);
  if (element) {
    const headerHeight = parseInt(
      getComputedStyle(document.documentElement)
        .getPropertyValue('--z-header-height') || '82', 
      10
    );
    const offset = element.offsetTop - headerHeight - 20;
    
    window.scrollTo({
      top: Math.max(0, offset),
      behavior: 'smooth'
    });
    
    articleStore.setOnClick(true);
    articleStore.setSelectTitle(tocId);
    
    setTimeout(() => {
      articleStore.setOnClick(false);
    }, 500);
    
    // 延迟关闭，让用户看到跳转效果
    setTimeout(() => {
      closeToc();
    }, 300);
  }
}

// 计算当前项是否激活
const isActive = (tocId: string) => {
  return articleStore.selectTitle === tocId;
};
</script>

<template>
  <div class="mobile-toc">
    <!-- 目录按钮 -->
    <button
      v-if="tocList.length > 0"
      class="mobile-toc__button fixed z-10 flex items-center justify-center"
      @click="toggleToc"
      :aria-label="showToc ? '关闭目录' : '打开目录'"
    >
      <List v-if="!showToc" :stroke-width="2.5" class="w-5 h-5"/>
      <X v-else :stroke-width="2.5" class="w-5 h-5"/>
    </button>

    <!-- 目录抽屉 -->
    <Transition name="toc-slide">
      <div v-if="showToc" class="mobile-toc__drawer fixed z-20">
        <div class="mobile-toc__mask" @click="closeToc"></div>
        <div class="mobile-toc__content">
          <div class="mobile-toc__header">
            <h3 class="mobile-toc__title">目录</h3>
            <button class="mobile-toc__close" @click="closeToc" aria-label="关闭">
              <X :stroke-width="2.5" class="w-5 h-5"/>
            </button>
          </div>
          <div class="mobile-toc__list">
            <div
              v-for="toc in tocList"
              :key="toc.id"
              class="mobile-toc__item"
              :class="[toc.className, { active: isActive(toc.id) }]"
              @click="handleTocClick(toc.id)"
            >
              {{ toc.name }}
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.mobile-toc {
  &__button {
    bottom: 20px;
    right: 20px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: rgba(var(--z-common-bg), .9);
    backdrop-filter: saturate(180%) blur(20px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    color: rgb(var(--z-fontcolor));
    border: 1px solid rgba(var(--z-primary-color), 0.1);
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      background-color: rgba(var(--z-common-bg), 1);
      transform: scale(1.05);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }

    &:active {
      transform: scale(0.95);
    }
  }

  &__drawer {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(2px);
  }

  &__content {
    position: absolute;
    top: 0;
    right: 0;
    width: 80%;
    max-width: 320px;
    height: 100%;
    background-color: rgba(var(--z-common-bg), .95);
    backdrop-filter: saturate(180%) blur(20px);
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid rgba(var(--z-primary-color), 0.1);
  }

  &__title {
    font-size: 1.2rem;
    font-weight: 600;
    color: rgb(var(--z-fontcolor));
    margin: 0;
  }

  &__close {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background-color: transparent;
    color: rgb(var(--z-fontcolor));
    border: none;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: rgba(var(--z-regular-bg), 0.5);
    }
  }

  &__list {
    flex: 1;
    overflow-y: auto;
    padding: 10px 0;
  }

  &__item {
    padding: 12px 20px;
    cursor: pointer;
    transition: all 0.25s;
    color: rgb(var(--z-fontcolor));
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    &:hover {
      background-color: rgba(var(--z-regular-bg), 0.3);
      color: rgb(var(--z-primary-color));
    }

    &.active {
      color: rgb(var(--z-primary-color));
      background-color: rgba(var(--z-primary-color), 0.1);
      font-weight: 600;
    }
  }
}

// 目录项层级样式
.mobile-toc__item {
  &.toc-item-h2 {
    padding-left: 20px;
  }

  &.toc-item-h3 {
    padding-left: 32px;
  }

  &.toc-item-h4 {
    padding-left: 44px;
  }

  &.toc-item-h5,
  &.toc-item-h6,
  &.toc-item-h7 {
    padding-left: 56px;
  }
}

// 抽屉动画
.toc-slide-enter-active,
.toc-slide-leave-active {
  transition: all 0.3s ease;
}

.toc-slide-enter-from {
  .mobile-toc__mask {
    opacity: 0;
  }

  .mobile-toc__content {
    transform: translateX(100%);
  }
}

.toc-slide-leave-to {
  .mobile-toc__mask {
    opacity: 0;
  }

  .mobile-toc__content {
    transform: translateX(100%);
  }
}

// 移动端显示
@media (max-width: 767px) {
  .mobile-toc__button {
    display: flex;
  }
}

// 桌面端隐藏
@media (min-width: 768px) {
  .mobile-toc__button {
    display: none;
  }
}
</style>

