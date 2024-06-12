<script setup lang="ts">
import {MagnifyingGlassIcon} from "@heroicons/vue/24/solid";
import {useGlobalStore} from "@/store/globalStore";

const globalState = useGlobalStore();

function back2Home() {
  navigateTo("/")
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
</script>
<template>
  <Search/>
  <div id="nav"
       class="ss-font stress bottom-line-1 fixed flex items-center justify-center rounded-b-xl">
    <div class="left hover-color absolute left-7 cursor-pointer" @click="back2Home()">Z次元</div>
    <div class="center items-center cursor-pointer">
      <span class="center__item hover-color mr-8" @click="skip('category')">分 类</span>
      <span class="center__item hover-color mr-8" @click="skip('comment')">留 言</span>
      <span class="center__item hover-color" @click="skip('friends')">友 链</span>
    </div>
    <div class="right cursor-pointer absolute right-7">
      <span class="normal-svg right__item hover-color"><MagnifyingGlassIcon @click="openSearch()"/></span>
    </div>
  </div>
</template>
<style scoped lang="scss">
#nav {
  height: 58px;
  width: inherit;
  z-index: 9;
  letter-spacing: 0.08em;
  color: rgb(var(--z-fontcolor));
  background-color: transparent;
  border-bottom: none;
  transition: all .3s;
}

[scroll="scroll"] #nav {
  background-color: rgba(var(--z-basic-color), .8);
  backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid rgba(102, 102, 102, .05);
}

[scroll="primary"] #nav {
  color: rgb(var(--z-primary-fontcolor));
  background-color: transparent;
  border-bottom: none;
}
</style>
