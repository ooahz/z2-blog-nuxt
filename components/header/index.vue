<script setup lang="ts">
import {MagnifyingGlassIcon, Bars3BottomRightIcon} from "@heroicons/vue/24/solid";
import {useGlobalStore} from "@/store/globalStore";

const appConfig = useAppConfig();
const globalState = useGlobalStore();

function back2Home() {
  navigateTo("/");
}

/**
 * 界面跳转
 * @param path
 */
function skip(path: string) {
  navigateTo(`/${path}`)
}

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
  <Search/>
  <div id="nav"
       class="ss-font stress bottom-line-1 fixed flex items-center justify-center top-0 rounded-b-xl">
    <div class="left hover-shadow absolute left-7 cursor-pointer" @click="back2Home()">{{ appConfig.siteName }}</div>
    <div class="center items-center cursor-pointer mobile:hidden">
      <span class="center__item hover-shadow mr-8" @click="skip('category')">分 类</span>
      <span class="center__item hover-shadow mr-8" @click="skip('comment')">留 言</span>
      <span class="center__item hover-shadow" @click="skip('friends')">友 链</span>
    </div>
    <div class="flex right cursor-pointer absolute right-7">
      <span class="right__item normal-svg hover-shadow">
        <MagnifyingGlassIcon @click="openSearch()"/>
      </span>
      <span class="right__item normal-svg hover-shadow ml-3 hidden mobile:block">
        <Bars3BottomRightIcon @click="showSidebar()"/>
      </span>
    </div>
  </div>
</template>
<style lang="scss">
#nav {
  height: 62px;
  width: inherit;
  z-index: 9;
  letter-spacing: 0.08em;
  color: rgb(var(--z-fontcolor));
  background-color: transparent;
  border-bottom: none;
  transition: all .3s;
}

[scroll="scroll"] #nav {
  background-color: rgba(var(--z-common-bg), .8);
  backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid rgba(102, 102, 102, .05);
}

[scroll="primary"] #nav {
  color: rgb(var(--z-primary-fontcolor));
  background-color: transparent;
  border-bottom: none;
}
</style>
