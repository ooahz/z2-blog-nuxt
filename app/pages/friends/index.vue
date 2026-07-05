<script setup lang="ts">
import type {FriendInterface} from "@/types/friendInterface";
import {listFriendApi} from "~~/service/friend";
import {useGlobalStore} from "@/store/globalStore";
import {Link} from "lucide-vue-next";
import PageHero from "@/layouts/PageHero.vue";

const globalStore = useGlobalStore();
const appConfig = useAppConfig();
const friendList = ref<FriendInterface[]>([]);

/**
 * 数据获取
 */
await getFriendList();

function showFriendForm() {
  globalStore.setShowFriendForm(true);
}

async function getFriendList() {
  friendList.value = await listFriendApi();
}

const heroThumbnail = appConfig.heroThumbnails.friends ?? appConfig.heroThumbnails.default;
const heroSubtitle = "何意味？何意味？何意味？";

const heroStats = computed(() => [
  { value: friendList.value.length, label: "位邻居" },
]);

useSeoMeta({
  title: "友链",
  description: "友链页"
})

definePageMeta({
  layout: false,
})
</script>

<template>
  <NuxtLayout name="page">
    <template #hero>
      <PageHero
        title="我的邻居们"
        eyebrow="Friends"
        :subtitle="heroSubtitle"
        :thumbnail="heroThumbnail"
        :stats="heroStats"
      />
    </template>

    <Friend/>
    <div class="box-header flex justify-end">
      <div v-if="!(appConfig.feature.friendLink === 'disable')"
           @click="showFriendForm"
           class="hover-color flex items-center right cursor-pointer transition-all duration-300 hover:scale-105">
        <span class="title mx-1">
          交换友链
         </span>
        <Link/>
      </div>
    </div>

    <div v-if="friendList.length > 0" class="friend-list grid gap-7 my-7">
      <FriendItem
          v-for="(friend, index) in friendList"
          :key="friend.id || index"
          :friend="friend"
          class="fade-in-item"
      />
    </div>
  </NuxtLayout>
</template>
<style scoped lang="scss">
.friend {
  &-list {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }
}
</style>
