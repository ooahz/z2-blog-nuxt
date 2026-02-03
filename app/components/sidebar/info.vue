<script setup lang="ts">
import Github from "@/static/svg/github.svg";
import Mail from "@/static/svg/mail.svg";

const appConfig = useAppConfig();
</script>
<template>
  <div class="author-info box-item w-full flex flex-col justify-center">
    <div class="author-info__avatar">
      <img class="cover" :src="appConfig.avatar" :alt="appConfig.name" loading="eager" decoding="async">
    </div>
    <div>
      <div class="mt-3">
        <p class="font-size-large font-semibold text-center">{{ appConfig.name }}</p>
        <p class="font-size-small my-2 text-center">{{ appConfig.description }}</p>
      </div>
      <div class="author-info__social flex justify-center mt-4 font-size-x-small">
        <a class="inline-flex items-center"
           :href="appConfig.github">
          <span class="meta-icon">
            <Github/>
          </span>
          <span class="">Github</span>
        </a>
        <a class="inline-flex items-center ml-4"
           :href="'mailto:'+ appConfig.email">
          <span class="meta-icon">
            <Mail class="p-[1px]"/>
          </span>
          <span class="">邮件</span>
        </a>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.author-info {
  padding: 2rem 1.25rem 1.35rem;
  border-radius: 0.75rem;
  background: linear-gradient(to bottom,
      rgba(var(--z-common-bg), .5) 0%,
      rgba(var(--z-common-bg), .8) 40%,
      rgba(var(--z-common-bg)) 60%,
      rgba(var(--z-common-bg))),
  url(https://s.ahzoo.cn/picture/22436164.png) no-repeat center;
  background-size: cover;

  &__avatar {
    width: 77px;
    height: 77px;
    overflow: hidden;
    margin: 10px auto;

    .cover {
      border-radius: 50%;
    }
  }

  &__social {

    a {
      span {
        opacity: .9;
      }

      &:hover {
        color: rgb(var(--z-primary-color));

        .meta-icon {
          background-color: rgba(var(--z-primary-color), .1);
          color: rgba(var(--z-primary-color));
        }
      }
    }
  }
}

.meta-icon {
  background-color: rgba(var(--z-plain-bg));
  color: rgba(var(--z-fontcolor));

  svg {
    width: 1.3rem !important;
    height: 1.3rem !important;
  }
}
</style>
