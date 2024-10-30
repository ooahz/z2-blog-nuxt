<script setup lang="ts">
import Github from "@/static/svg/github.svg";
import {EnvelopeIcon} from "@heroicons/vue/24/solid";
import {useAuthorStore} from "@/store/authorStore";

const authorStore = useAuthorStore();
const authorInfo = authorStore.getAuthorInfo();

</script>
<template>
  <div class="author-info w-full flex flex-col justify-center">
    <div class="author-info__avatar">
      <img class="cover" :src="authorInfo.avatar" :alt="authorInfo.name">
    </div>
    <div>
      <div class="mt-3">
        <p class="font-size-large font-semibold text-center">{{ authorInfo.name }}</p>
        <p class="font-size-small my-2 text-center">{{ authorInfo.description }}</p>
      </div>
      <div class="author-info__social flex justify-center mt-4 font-size-x-small">
        <a class="inline-flex items-center"
           :href="authorInfo.extendsParams.github">
          <Github/>
          <span class="ml-1">Github</span>
        </a>
        <a class="inline-flex items-center ml-3"
           :href="'mailto:'+ authorInfo.email">
          <EnvelopeIcon class="p-[1px]"/>
          <span class="ml-1">邮件</span>
        </a>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
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
        opacity: .7;
      }

      &:hover {
        color: rgb(var(--z-primary-color));
      }
    }

    svg {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
