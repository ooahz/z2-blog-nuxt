<script setup lang="ts">
import {setAttribute} from "@ahzoo/utils";

const appConfig = useAppConfig();

onMounted(() => {
  if (process.client) {
    setAttribute("scroll", "top");
    const landingImg = document.getElementById("landing-img");
    if (landingImg && appConfig.landingImg) {
      // 预加载图片
      const img = new Image();
      img.src = appConfig.landingImg;
      img.onload = () => {
        landingImg.style.backgroundImage = `url(${appConfig.landingImg})`;
      };
      img.onerror = () => {
        landingImg.style.backgroundImage = `url(${appConfig.landingImg})`;
      };
    }
  }
})
</script>

<template>
  <div id="landing" class="banner ss-font mb-3 flex items-center justify-center relative">
    <div id="landing-img" class="bg-img landing-cover absolute w-full h-full"></div>
    <div class="landing-mask absolute w-full h-full"></div>
    <div class="landing-container max-w-[1380px] w-full px-4 relative z-10">
      <div class="landing-info text-center">
        <div class="landing-info-landing">欢迎来到{{ appConfig.siteName }}</div>
        <span class="landing-info-description">{{ appConfig.description }}</span>
      </div>
    </div>
    <svg v-if="!$viewport.isLessThan('lg')"
         class="no-filter landing-waves w-full absolute bottom-0"
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
#landing {
  height: 65vh;
  min-height: 430px;
  max-height: 550px;
  width: 100vw;
  margin-left: -50vw;
  left: 50%;
  position: relative;
  overflow: hidden;
}

.landing {
  &-cover {
    opacity: .9;
    background-size: cover;
    background-position: 50% 30%;
    background-repeat: no-repeat;
    animation: imageAnimation 30s linear infinite 0s;
  }

  &-mask {
    background-color: rgba(0, 0, 0, .3);
  }

  &-waves {
    height: 100px;
  }
}

.landing-info {
  margin-top: -60px;
  z-index: 1;
  color: rgb(var(--z-primary-fontcolor));
  font-weight: 700;
  -webkit-box-reflect: below 1px linear-gradient(transparent, rgba(0, 0, 0, 0.1));
  animation: animate 5s linear infinite;

  &-landing {
    margin: 30px;
    font-size: 22px;
    letter-spacing: 7px;
  }

  &-description {
    font-size: 29px;
    letter-spacing: 6px;
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

.dark .landing-mask {
  background-color: rgba(0, 0, 0, .5);
}

@keyframes imageAnimation {
  30% {
    transform: scale(1.05);
    animation-timing-function: ease-out
  }

  70% {
    transform: scale(1.1)
  }

  100% {
    transform: scale(1)
  }
}

</style>
