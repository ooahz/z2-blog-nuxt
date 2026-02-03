<script setup lang="ts">
import {computed} from "vue";
import type {PropType} from "vue";
import type {TocInterface} from "@/types/tocInterface";
import {useArticleStore} from "@/store/articleStore";

const props = defineProps({
  toc: {
    type: Object as PropType<TocInterface>,
    required: true
  }
});

const articleStore = useArticleStore();

const isActive = computed(() => {
  return articleStore.selectTitle === props.toc.id;
});

/**
 * 通过Toc列表标题定位文章标题位置
 */
function scrollToTitle() {
  // 防止重复设置当前选中标题
  articleStore.setOnClick(true);
  articleStore.setSelectTitle(props.toc.id);

  const element = document.getElementById(props.toc.id);
  if (element) {
    // 获取固定头部高度
    const headerHeight = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--z-header-height') || '80', 10);
    const offset = element.offsetTop - headerHeight - 20; // 额外20px间距

    window.scrollTo({
      top: Math.max(0, offset),
      behavior: 'smooth'
    });

    setTimeout(() => {
      articleStore.setOnClick(false);
    }, 500);
  }
}
</script>

<template>
  <div class="toc-list-item py-0.5 cursor-pointer"
       :class="[toc.className, { active: isActive }]"
       @click="scrollToTitle"
  >
    {{ toc.name }}
  </div>
</template>

<style scoped lang="scss">
.toc-list-item {
  overflow: hidden;
  white-space: nowrap;
  transition: all .25s;

  &.active, &:hover {
    color: rgb(var(--z-primary-color));
  }
}

.toc-item-h2 {
  padding-left: 3px;
}

.toc-item-h3 {
  padding-left: 12px;
}

.toc-item-h4 {
  padding-left: 25px;
}

.toc-item-h5,
.toc-item-h6,
.toc-item-h7 {
  padding-left: 40px;
}
</style>
