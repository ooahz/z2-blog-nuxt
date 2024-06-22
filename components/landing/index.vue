<script setup lang="ts">
import type {PropType} from "vue";
import type {WebInfoInterface} from "@/types/webInfoInterface";

defineProps({
  landing: {
    type: Object as PropType<WebInfoInterface>,
    required: true
  },
});
</script>

<template>
  <div id="landing" class="landing ss-font relative flex flex-col justify-center w-full h-screen">
    <div class="landing-info flex flex-col absolute">
      <div class="font-semibold text-5xl leading-loose">{{ landing?.title }}</div>
      <div class="font-size-x-large">{{ landing.description }}</div>
    </div>
    <div class="landing-slot absolute flex bottom-0 p-2 min-h-30">
      <slot></slot>
    </div>
    <div class="landing-thumbnail absolute overflow-hidden">
      <img :src="landing?.thumbnail" class="cover w-auto h-full" alt="">
    </div>
    <div class="landing-bg w-full h-screen"></div>
  </div>
</template>

<style scoped lang="scss">
.landing {
  min-height: 350px;
  background: var(--z-bg);
  transition: all 0.2s;

  &-bg {
    background-image: url("/silk-bg.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    mix-blend-mode: multiply;
    opacity: .25;
  }

  &:after {
    content: "";
    z-index: 1;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(var(--z-common-bg), 1) 50px, rgba(var(--z-common-bg), 0.7), rgba(var(--z-common-bg), 0.3), rgba(var(--z-common-bg), 0.1) 40%);
  }

  &-info {
    z-index: 2;
    letter-spacing: 6px;
    margin: -150px 80px 0 80px;
    color: rgba(var(--z-primary-fontcolor));
    transition: all 0.2s;
  }

  &-thumbnail {
    right: 0;
    bottom: 50px;
    z-index: 1;
    opacity: .8;
    height: auto;
    width: calc(80% + 200px);
    max-width: 1000px;
    max-height: calc(100% - 60px);
    margin-right: -30%;
  }

  &-slot {
    z-index: 2;
    margin: 15px 45px;
  }
}
</style>
