<script setup lang="ts">
import Github from "@/static/svg/github.svg";
import Mail from "@/static/svg/mail.svg";

const appConfig = useAppConfig();
</script>

<template>
  <div class="footer__info flex justify-between items-center pad:flex-row mobile:flex-col">
    <div class="flex items-center pad:flex-row mobile:flex-col">
      <div class="flex items-center">
        <div class="info-avatar">
          <img class="cover p-1" src="/favicon.ico" alt="Z次源" loading="eager" decoding="async">
        </div>
        <div class="info-name ml-2">{{ appConfig.siteName }}</div>
      </div>
      <span class="footer-divider pad:opacity-100 mobile:opacity-10"></span>
      <div>
        {{ appConfig.description }}
      </div>
    </div>
    <div>
      <div class="info__social flex items-center">
        <a class="inline-flex items-center p-1.5 rounded-full"
           :href="appConfig.github">
          <Github/>
        </a>
        <a class="inline-flex items-center p-1.5 rounded-full ml-1"
           :href="'mailto:'+ appConfig.email">
          <Mail class="p-[1px]"/>
        </a>
      </div>
    </div>
  </div>
  <div class="footer-line"></div>
</template>

<style scoped lang="scss">
.footer__info {
  padding: 30px 70px 25px;

  .info-avatar {
    width: 40px;
    height: 40px;
  }

  .info-name {
    font-size: 18px;
    font-weight: 700;
  }

  .footer-divider {
    display: block;
    margin: 0 30px;
    width: 1px;
    height: 20px;
    background-color: rgba(var(--z-deep-color), .6);
  }

  .info__social {
    color: rgba(var(--z-fontcolor), .8);
    transition: all .3s;

    a {
      &:hover {
        color: rgba(var(--z-fontcolor));
        background-color: rgba(var(--z-plain-bg));
      }
    }
  }
}

[view="mobile"] {
  .footer__info {
    padding: 30px 15px 25px;
  }
}
</style>
