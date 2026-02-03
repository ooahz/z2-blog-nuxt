<script setup lang="ts">
import {useGlobalStore} from "@/store/globalStore";
import {Box, Menu, Layers, Search, Users, MessageSquareMore} from "lucide-vue-next";
import SearchCom from "@/components/search/index.vue";

const appConfig = useAppConfig();
const globalState = useGlobalStore();

/**
 * 打开搜索功能
 */
function openSearch() {
  globalState.setShowSearch(true);
}

function showSidebar() {
  globalState.setShowSidebar(true);
  const sidebarDom: HTMLElement | null = document.querySelector("#sidebar");
  if (!sidebarDom) {
    return;
  }
  sidebarDom.style.marginRight = "0";
}
</script>
<template>
  <SearchCom/>
  <div id="nav"
       class="loli-font title fixed flex justify-center">
    <div class="nav__container relative flex items-center justify-center top-0 rounded-b-xl bottom-line-1">
      <a href="/" class="ss-font left__item hover-primary absolute pad:left-8 mobile:left-1 cursor-pointer">
        {{ appConfig.siteName }}
      </a>
      <div class="items-center cursor-pointer pad:block mobile:hidden">
        <a href="/category" class="center__item hover-primary">
          <Box :stroke-width="2.5" class="inline-block mr-1"/>
          分 类
        </a>
        <a href="/archive" class="center__item hover-primary">
          <Layers :stroke-width="2.5" class="inline-block mr-1"/>
          归 档
        </a>
        <a href="/comment" v-if="!(appConfig.feature?.comment === 'disable')"
           class="center__item hover-primary">
          <MessageSquareMore :stroke-width="2.5" class="inline-block mr-1"/>
          留 言
        </a>
        <a href="/friends" class="center__item hover-primary">
          <Users :stroke-width="2.5" class="inline-block mr-1"/>
          友 链
        </a>
      </div>
      <div v-if="!(appConfig.feature?.search === 'disable')"
           class="flex right cursor-pointer absolute pad:right-8 mobile:right-1">
      <span class="right__item normal-svg hover-primary">
        <Search :stroke-width="2.5" @click="openSearch()"/>
      </span>
        <span class="right__item normal-svg hover-primary -ml-1 pad:hidden mobile:block">
        <Menu :stroke-width="2.5" @click="showSidebar()"/>
      </span>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#nav {
  width: inherit;
  z-index: 9;
}

.nav__container {
  height: 68px;
  width: inherit;
  max-width: var(--z-max-width);
  color: rgb(var(--z-fontcolor));
  background-color: transparent;
  border-bottom: none;
  transition: all .3s ease;

  .left__item {
    letter-spacing: 0.1em;
  }

  .left__item,
  .center__item,
  .right__item {
    padding: 9px 13px;
  }
}

body[scroll="scroll"] .nav__container,
body[view="mobile"] .nav__container {
  color: rgb(var(--z-fontcolor));
  background-color: rgba(var(--z-common-bg), .8);
  backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid rgba(102, 102, 102, .05);
}

body[scroll="top"]:not([view="mobile"]) .layout-home .nav__container,
body[scroll="top"] .layout-post .nav__container {
  color: rgb(var(--z-primary-fontcolor));
  background-color: transparent;
  backdrop-filter: none;
  border-bottom: none;
}
</style>
