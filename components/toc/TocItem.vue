<script setup lang="ts">
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

/**
 * 通过Toc列表标题定位文章标题位置
 */
function scrollToTitle() {
  let timeout: any;
  // 防止重复设置当前选中标题
  articleStore.setOnClick(true);

  function handleScroll() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      articleStore.setOnClick(false);
    }, 500);
  }

  const container = document.querySelector("#ahzoo");
  container?.addEventListener("scroll", handleScroll);
  articleStore.setSelectTitle(props.toc.id);
  document.querySelector("#" + props.toc.id)?.scrollIntoView({
    behavior: "smooth"
  });

}
</script>

<template>
  <div class="toc-list-item py-0.5 cursor-pointer"
       :class="[toc.className, articleStore.selectTitle===toc.id?'active':'']"
       @click="scrollToTitle"
  >
    {{ toc.name }}
  </div>
</template>

<style scoped lang="scss">
.toc-list-item {
  overflow: hidden;
  white-space: nowrap;

  &.active {
    font-size: 110%;
    font-weight: 600;
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
