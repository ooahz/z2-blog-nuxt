<script setup lang="ts">
import _ from "lodash";
import {setAttribute} from "@ahzoo/utils";
import SidebarMobile from "@/components/sidebar/mobile.vue";

interface Props {
  layoutClass?: string;
  showSidebar?: boolean;
  resetScroll?: boolean;
  customScrollHandler?: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  layoutClass: "",
  showSidebar: false,
  resetScroll: false,
  customScrollHandler: undefined
});

const route = useRoute();
const {$viewport} = useNuxtApp();
const show = ref(false);

function defaultScrollHandler() {
  try {
    const throttledScrollHandler = _.throttle(() => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      if (scrollPosition > 30) {
        setAttribute("scroll", "scroll");
      } else {
        setAttribute("scroll", "top");
      }
    }, 200);

    window.addEventListener("scroll", throttledScrollHandler, {passive: true});

    onUnmounted(() => {
      window.removeEventListener("scroll", throttledScrollHandler);
    });
  } catch (e) {
    console.log(e);
  }
}

onMounted(() => {
  if (props.resetScroll) {
    const primary = document.getElementById("ahzoo");
    primary!.scrollTop = 0;
  }
  if (process.client) {
    show.value = true;
    if ($viewport.isLessThan("lg") || $viewport.isLessOrEquals("mobile")) {
      setAttribute("view", "mobile");
    }
    defaultScrollHandler();
  }
});
</script>

<template>
  <NuxtLoadingIndicator/>
  <div v-show="show" id="basic" class="font-size-medium w-full h-full flex flex-col relative" :class="layoutClass">
    <div id="ahzoo" class="relative w-full" :class="$attrs.class">
      <div class="w-full">
        <Header/>
      </div>
      <div v-if="$slots.main" id="main" class="page flex" :class="$viewport.isLessThan('lg') ? 'mobile' : 'pc'">
        <slot name="main"/>
        <Sidebar v-if="showSidebar && !$viewport.isLessThan('lg')" class="w-1/3 mt-5"/>
      </div>
      <slot v-else/>
      <SidebarMobile/>
      <Footer/>
    </div>
    <Menu/>
  </div>
</template>

<style lang="scss">
#basic {
  color: rgb(var(--z-fontcolor));
  transition: all .3s;
  background-image: url("/basic-bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
