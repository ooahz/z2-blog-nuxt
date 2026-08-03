<script setup lang="ts">
import {setAttribute} from "@ahzoo/utils";

const props = defineProps<{
  showWaves?: boolean;
}>();

onMounted(() => {
  if (process.client) {
    setAttribute("scroll", "top");
  }
})
</script>

<template>
  <div id="banner" class="banner mb-3 flex items-center justify-center relative">
    <slot/>
    <svg v-if="!$viewport.isLessThan('lg')"
         class="no-filter banner-waves !w-full absolute bottom-0"
         xmlns:xlink="http://www.w3.org/1999/xlink"
         viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
      <defs>
        <path id="waves-gentle" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"/>
      </defs>
      <g class="waves-parallax">
        <use xlink:href="#waves-gentle" x="48" y="0"/>
        <use xlink:href="#waves-gentle" x="48" y="3"/>
        <use xlink:href="#waves-gentle" x="48" y="5"/>
        <use xlink:href="#waves-gentle" x="48" y="7"/>
      </g>
    </svg>
  </div>
</template>

<style lang="scss">
#banner {
  position: relative;
  overflow: hidden;
}

.banner {
  display: flex;
  justify-content: center;

  &-waves {
    height: 100px;
  }

  &__container {
    padding-top: 15px;
  }
}

.waves-parallax > use:nth-child(1) {
  fill: rgba(var(--z-global-bg), .7);
  animation-delay: -2s;
  animation-duration: 7s;
}

.waves-parallax > use:nth-child(2) {
  fill: rgba(var(--z-global-bg), .5);
  animation-delay: -3s;
  animation-duration: 10s;
}

.waves-parallax > use:nth-child(3) {
  fill: rgba(var(--z-global-bg), .3);
  animation-delay: -4s;
  animation-duration: 13s;
}

.waves-parallax > use:nth-child(4) {
  fill: rgb(var(--z-global-bg));
  animation-delay: -5s;
  animation-duration: 20s;
}
</style>

