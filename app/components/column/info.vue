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
  <div class="page-info ss-font relative flex flex-col justify-center w-full rounded-xl overflow-hidden">
    <div class="page-info__content landing-info flex flex-col absolute">
      <div class="font-bold text-[2.5rem] leading-loose">{{ landing.title }}</div>
      <div class="font-size-x-large">{{ landing?.description }}</div>
    </div>
    <div class="page-info-slot absolute flex bottom-0 p-1">
      <slot/>
    </div>
    <div class="page-info__thumbnail absolute overflow-hidden h-full">
      <img :src="landing?.thumbnail" class="cover w-auto h-full" loading="lazy" decoding="async" alt="">
    </div>
    <div class="page-info-bg w-full h-full"/>
  </div>
</template>

<style lang="scss">
.page-info {
  min-height: 350px;
  background: var(--z-bg);
  transition: all 0.2s;

  &:after {
    content: "";
    z-index: 1;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(var(--z-global-bg), 1) 35px, rgba(var(--z-global-bg), 0.7), rgba(var(--z-global-bg), 0.3), rgba(var(--z-global-bg), 0.1) 40%);
  }

  &__content {
    z-index: 2;
    letter-spacing: 6px;
    margin: -120px 80px 0 80px;
    color: rgba(var(--z-primary-fontcolor));
    transition: all 0.2s;
  }

  &__thumbnail {
    z-index: 1;
    top: 20px;
    right: calc(-5% - 40px);
    opacity: .9;
  }

  &-slot {
    z-index: 2;
    margin: 15px 60px;
  }
}
</style>
