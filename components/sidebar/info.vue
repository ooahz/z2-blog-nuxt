<script setup lang="ts">
import Github from "@/static/svg/github.svg";
import {EnvelopeIcon} from "@heroicons/vue/24/solid";
import {useAuthorStore} from "@/store/authorStore";

const authorStore = useAuthorStore();
const authorInfo = authorStore.getAuthorInfo();

</script>
<template>
  <div class="author-info box w-full flex flex-col justify-center">
    <div class="author-info__avatar">
      <img class="cover" :src="authorInfo.avatar" :alt="authorInfo.name">
    </div>
    <div class="flex">
      <div class="author-info__primary mt-3">
        <div class="font-size-large font-semibold">{{ authorInfo.name }}</div>
        <div class="font-size-small my-2">{{ authorInfo.description }}</div>
      </div>
      <div class="author-info__social">
        <a class="author-info__social-svg"
           :href="authorInfo.extendsParams.github">
          <Github/>
        </a>
        <a class="author-info__social-svg"
           :href="'mailto:'+ authorInfo.email">
          <EnvelopeIcon class="p-[2px]"/>
        </a>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.author-info {
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
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
    margin-left: 3px;

    &-svg {
      display: block;
      margin: 3px;
      padding: 5px;
      height: 30px;
      width: 30px;
      font-size: 17px;
      background: rgba(var(--z-gray-color), .6);
      border-radius: 999px;

      &:hover {
        color: rgb(var(--z-primary-color));
        background-color: rgba(var(--z-primary-color), .1);
      }
    }

    svg {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
