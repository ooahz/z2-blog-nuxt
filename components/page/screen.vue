<script setup lang="ts">
import type {PropType} from "vue";
import type {PageInfoInterface} from "@/types/pageInfoInterface";

defineProps({
  landing: {
    type: Object as PropType<PageInfoInterface>,
    required: true
  }
});
</script>

<template>
  <div class="page-info ss-font relative flex flex-col justify-center w-full h-screen">
    <div class="page-info__content landing-info flex flex-col absolute">
      <div class="font-semibold text-5xl leading-loose">{{ landing.title }}</div>
      <div class="font-size-x-large">{{ landing?.description }}</div>
    </div>
    <div class="page-info-slot absolute flex bottom-0 p-2 min-h-30">
      <slot/>
    </div>
    <div class="page-info__thumbnail absolute overflow-hidden">
      <img :src="landing?.thumbnail" class="cover w-auto h-full" alt="">
    </div>
    <div class="page-info-bg w-full h-screen"/>
  </div>
</template>

<style lang="scss">
.page-info {
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

  &__content {
    z-index: 2;
    letter-spacing: 6px;
    margin: -150px 80px 0 80px;
    color: rgba(var(--z-primary-fontcolor));
    transition: all 0.2s;
  }

  &__thumbnail {
    right: 0;
    bottom: 50px;
    z-index: 1;
    opacity: .9;
    height: auto;
    width: calc(70% + 200px);
    max-width: 1000px;
    max-height: calc(100% - 60px);
    margin-right: calc(-9% - 45px);
  }

  &-slot {
    z-index: 2;
    margin: 15px 45px;
  }
}
</style>
