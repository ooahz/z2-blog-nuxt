<script setup lang="ts">
import BaseLayout from "./base.vue";

const appConfig = useAppConfig();

onMounted(() => {
  if (process.client) {
    const bannerImg = document.getElementById("banner-img");
    if (bannerImg && appConfig.bannerImg) {
      // 预加载图片
      const img = new Image();
      img.src = appConfig.bannerImg;
      img.onload = () => {
        bannerImg.style.backgroundImage = `url(${appConfig.bannerImg})`;
      };
      img.onerror = () => {
        bannerImg.style.backgroundImage = `url(${appConfig.bannerImg})`;
      };
    }
  }
})
</script>

<template>
  <BaseLayout class="layout-home overflow-y-scroll">
    <Banner v-if="!$viewport.isLessThan('lg')" class="home-banner">
      <div id="banner-img" class="bg-img banner-cover absolute w-full h-full"></div>
      <div class="banner-mask absolute w-full h-full"></div>
      <div class="banner__container max-w-[1380px] w-full px-4 relative">
        <div v-if="!$viewport.isLessThan('lg')">
          <div class="loli-font banner-info text-center">
            <div class="banner-info-title text-5xl">欢迎来到{{ appConfig.siteName }}</div>
            <span class="banner-info-description">{{ appConfig.description }}</span>
          </div>
        </div>
      </div>
    </Banner>
    <NuxtPage/>
  </BaseLayout>
</template>

<style lang="scss" scoped>
.home-banner {
  height: clamp(450px, 65vh, 600px);
  transition: all .3s;
}

.banner-info {
  margin-top: -60px;
  z-index: 1;
  color: rgb(var(--z-primary-fontcolor));
  font-weight: 700;
  -webkit-box-reflect: below 1px linear-gradient(transparent, rgba(0, 0, 0, 0.1));
  animation: animate 5s linear infinite;

  &-title {
    margin: 30px;
    letter-spacing: 7px;
  }

  &-description {
    font-size: 27px;
    letter-spacing: 6px;
  }
}

.dark {
  .banner-mask {
    background-color: rgba(0, 0, 0, .5);
  }

  .banner-info {
    position: absolute;
    bottom: 90px;
    left: 30px;
  }

  .banner {
    align-items: flex-end;
  }
}

.banner {
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
