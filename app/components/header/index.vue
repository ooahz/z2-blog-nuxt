<script setup lang="ts">
import {MagnifyingGlassIcon, Bars3BottomRightIcon} from "@heroicons/vue/24/solid";
import {useGlobalStore} from "@/store/globalStore";
import {Menu, Search} from "lucide-vue-next";
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
       class="kksj-font title bottom-line-1 fixed flex items-center justify-center top-0 rounded-b-xl">
    <a href="/" class="ss-font left hover-shadow absolute left-7 cursor-pointer">
      {{ appConfig.siteName }}
    </a>
    <div class="center items-center cursor-pointer pad:block mobile:hidden">
      <a href="/category" class="center__item hover-shadow mr-8">分 类</a>
      <a href="/comment" v-if="!(appConfig.feature?.comment === 'disable')"
         class="center__item hover-shadow mr-8">留 言</a>
      <a href="/friends" class="center__item hover-shadow">友 链</a>
    </div>
    <div v-if="!(appConfig.feature?.search === 'disable')"
         class="flex right cursor-pointer absolute right-7">
      <span class="right__item normal-svg hover-shadow">
        <Search :stroke-width="2.5" @click="openSearch()"/>
      </span>
      <span class="right__item normal-svg hover-shadow ml-3 pad:hidden mobile:block">
        <Menu :stroke-width="2.5" @click="showSidebar()"/>
      </span>
    </div>
  </div>
</template>
<style lang="scss">
#nav {
  height: 68px;
  width: inherit;
  z-index: 9;
  color: rgb(var(--z-fontcolor));
  background-color: transparent;
  border-bottom: none;
  transition: all .3s;

  .left {
    letter-spacing: 0.1em;
  }
}

body[scroll="scroll"] #nav,
body[view="mobile"] #nav {
  color: rgb(var(--z-fontcolor));
  background-color: rgba(var(--z-common-bg), .8);
  backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid rgba(102, 102, 102, .05);
}

body[scroll="top"]:not([view="mobile"]) .layout-home #nav,
body[scroll="top"] .layout-post #nav {
  color: rgb(var(--z-primary-fontcolor));
  background-color: transparent;
  backdrop-filter: none;
  border-bottom: none;
}
</style>
