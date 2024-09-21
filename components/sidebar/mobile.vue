<script setup lang="ts">
import {useGlobalStore} from "@/store/globalStore";
import TopComment from "@/components/sidebar/TopComment.vue";
import Info from "@/components/sidebar/info.vue";

const globalState = useGlobalStore();

/**
 * 界面跳转
 * @param path
 */
function skip(path: string) {
  navigateTo(`/${path}`);
}

function closeSidebar() {
  globalState.setShowSidebar(false);
  const sidebarDom: HTMLElement | null = document.querySelector("#sidebar");
  if (sidebarDom) {
    sidebarDom.style.marginRight = "-100%";
  }
}
</script>

<template>
  <div class="mobile-sidebar z-10 fixed flex justify-end w-full top-0"
       @click="closeSidebar">
    <div class="sidebar-mask backdrop-blur-2 fixed top-0 right-0 w-full h-full"
         v-show="globalState.showSidebar"/>
    <aside id="sidebar" class="ml-9 block overflow-y-scroll">
      <Info/>
      <div class="mt-5">
        <div class="menu-box" @click="skip('category')">分类</div>
        <div class="menu-box" @click="skip('comment')">留言</div>
        <div class="menu-box" @click="skip('friends')">友链</div>
      </div>
      <TopComment/>
    </aside>
  </div>
</template>

<style lang="scss">
.mobile-sidebar {
  #sidebar {
    position: fixed;
    height: 100%;
    margin-right: -100%;
    padding: 35px 20px 20px;
    background-color: rgba(var(--z-common-bg), .8);
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1), -5px -5px 15px rgba(var(--z-common-bg), .5);
    transition: all .3s;
  }

  .box {
    background-color: rgba(var(--z-basic-color), .6);
  }

  .menu-box {
    background-color: rgba(var(--z-basic-color), .6);
    border-radius: 0.75rem;
    padding: 1.15rem;
    margin: 10px 0;
    cursor: pointer;

    &:hover,
    &:active {
      border-radius: 5px;
      background-color: rgba(var(--z-select-bg), .5);
      transition: all .25s;
    }
  }
}

.sidebar-mask {
  background: rgba(var(--z-common-bg), .8);
}
</style>
