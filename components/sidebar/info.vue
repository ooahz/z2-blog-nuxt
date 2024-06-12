<script setup lang="ts">
import {AuthorImpl} from "@/types/impl/author";
import Github from "@/static/svg/github.svg";
import {EnvelopeIcon} from "@heroicons/vue/24/solid";

const authorInfo = new AuthorImpl();
</script>
<template>
  <div class="author-info box w-full flex flex-col justify-center">
    <div class="author-info__avatar">
      <img class="cover" :src="authorInfo.avatar" :alt="authorInfo.name">
    </div>
    <div class="author-info__primary mt-3">
      <div class="author-info__name font-semibold">{{ authorInfo.name }}</div>
      <div class="author-info__description font-size-small my-2">{{ authorInfo.description }}</div>
    </div>
    <div class="author-info__social">
      <a :href="authorInfo.github">
        <Github/>
      </a>
      <a :href="'mailto:'+ authorInfo.email">
        <EnvelopeIcon/>
      </a>
    </div>
  </div>

</template>
<style scoped lang="scss">
.author-info__avatar {
  width: 77px;
  height: 77px;
  overflow: hidden;
  margin: 10px auto;
  border-radius: 50%;
}

.author-info__social a {
  text-align: center;
  display: inline-block;
  font-size: 17px;
  margin-right: 7px;
}
</style>
