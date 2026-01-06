<script setup lang="ts">
import type {FriendInterface} from "@/types/friendInterface";
import {listFriendApi} from "~~/service/friend";
import {useGlobalStore} from "@/store/globalStore";
import {Link} from "lucide-vue-next";

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

const layoutState = reactive({
  title: "我的邻居们",
  subtitle: "何意味？何意味？何意味？",
  pageTitle: "友链页"
});

definePageMeta({
  layout: "page",
  layoutProps: layoutState
})

useSeoMeta({
  title: "友链",
  description: "友链页"
})
</script>

<template>
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
</template>
<style scoped lang="scss">
.friend {
  &-list {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }
}
</style>
