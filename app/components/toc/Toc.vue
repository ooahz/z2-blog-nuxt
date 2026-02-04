<script setup lang="ts">
import type { TocInterface } from "@/types/tocInterface";
import { useArticleStore } from "@/store/articleStore";
import { tocGenerateByDomId } from "@ahzoo/utils";
import { throttle } from "@/utils/throttle";
import TocItem from "./TocItem.vue";

const articleStore = useArticleStore();
const articleTocList = ref<TocInterface[]>([]);

function initToc() {
  articleTocList.value = tocGenerateByDomId("#article-content");
  articleStore.setTocList(articleTocList.value);
  if (articleTocList.value.length > 0) {
     updateActiveTitle();
  }
}

function updateActiveTitle() {
  if (articleStore.onClick) {
    return;
  }

  if (articleTocList.value.length === 0) {
    return;
  }

  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const headerHeight = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue("--z-header-height") || "82",
    10
  );
  const offset = scrollTop + headerHeight + 50;

  let activeId = "";

  for (let i = 0; i < articleTocList.value.length; i++) {
    const toc = articleTocList.value[i];
    const element = document.getElementById(toc.id);
    if (element && element.offsetTop <= offset) {
      activeId = toc.id;
    } else if (element && element.offsetTop > offset) {
      break;
    }
  }

  if (activeId && articleStore.selectTitle !== activeId) {
    articleStore.setSelectTitle(activeId);
  }
}

let scrollHandler: (() => void) | null = null;

onMounted(() => {
  nextTick(() => {
    initToc();
    if (articleTocList.value.length > 0) {
      scrollHandler = throttle(updateActiveTitle, 100);
      window.addEventListener("scroll", scrollHandler, { passive: true });
      updateActiveTitle();
    }
  });
});

onUnmounted(() => {
  if (scrollHandler) {
    window.removeEventListener("scroll", scrollHandler);
    scrollHandler = null;
  }
  articleStore.setTocList([]);
  articleStore.setSelectTitle("");
});
</script>

<template>
  <div class="toc-container">
    <TransitionGroup name="list">
       <TocItem
         v-for="toc in articleTocList"
         :key="toc.id"
         :toc="toc"
       />
    </TransitionGroup>
  </div>
</template>

<style scoped lang="scss">
.toc-container {
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 120px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}
</style>
