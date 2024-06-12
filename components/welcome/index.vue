<script setup lang="ts">
import {OuOStar} from "@ahzoo/ouo";
import {AuthorImpl} from "@/types/impl/author";

const authorInfo = new AuthorImpl();
</script>

<template>
  <div id="landing" class="ss-font mb-3 flex items-center justify-center relative">
    <div class="landing-info absolute text-center">
      <div class="landing-info-landing">欢迎来到{{ authorInfo.siteName }}</div>
      <span class="landing-info-description">{{ authorInfo.description }}</span>
    </div>
    <OuOStar/>
  </div>
</template>

<style scoped lang="scss">
#landing {
  height: 100vh;
  min-height: 100vh;
  width: inherit;
}

.landing-info {
  margin-top: -60px;
  z-index: 1;
  opacity: .7;
  font-weight: 700;
  -webkit-box-reflect: below 1px linear-gradient(transparent, rgba(0, 0, 0, 0.1));
  animation: animate 5s linear infinite;

  &-landing {
    margin: 30px;
    font-size: 18px;
    letter-spacing: 7px;
  }

  &-description {
    font-size: 25px;
    letter-spacing: 6px;
  }
}

[data-theme="dark"] .landing-info {
  text-shadow: 0 0 3px rgb(var(--z-primary-color)), 0 0 7px rgb(var(--z-primary-color)), 0 0 12px rgb(var(--z-primary-color)), 0 0 20px rgb(var(--z-primary-color)), 0 0 60px rgb(var(--z-primary-color));
}
</style>
