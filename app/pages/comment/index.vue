<script setup lang="ts">
import type {CommentItemInterface} from "@/types/commentInterface";
import {listFriendApi} from "~~/service/comment";
import PageHero from "@/layouts/PageHero.vue";

const {path} = useRoute();
const articlePath = <string>path.split("/").pop();
const commentList = ref<CommentItemInterface[]>([]);

await getCommentList();

async function getCommentList(pagination: number = 1) {
  commentList.value = await listFriendApi(articlePath, pagination).then((res) => {
    if (!res) return [];
    return res.map(item => ({
      ...item,
      avatarDisplay: "text"
    }));
  });
}

const appConfig = useAppConfig();
const heroThumbnail = appConfig.heroThumbnails.comment ?? appConfig.heroThumbnails.default;
const heroSubtitle = "反正开源项目也没人看，页面介绍也随便写写吧";

const heroStats = computed(() => [
  { value: commentList.value.length, label: "条留言" },
]);

useSeoMeta({
  title: "留言",
  description: "留言页"
})

definePageMeta({
  layout: false,
})
</script>

<template>
  <NuxtLayout name="page">
    <template #hero>
      <PageHero
        title="交流与讨论"
        eyebrow="Comment"
        :subtitle="heroSubtitle"
        :thumbnail="heroThumbnail"
        :stats="heroStats"
      />
    </template>

    <Comment
      :comment-list="commentList"
      @refresh="getCommentList"
    />
  </NuxtLayout>
</template>

<style scoped lang="scss">
</style>
