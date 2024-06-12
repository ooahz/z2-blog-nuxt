<script setup lang="ts">
import {OuOInput, OuOTextarea, OuOButton, OuOMessage, OuOTag} from "@ahzoo/ouo";
import {useGlobalStore} from "@/store/globalStore";
import type {Friend} from "@/types/friendInterface";
import {saveFriend} from "@/api/friend";
import {AuthorImpl} from "@/types/impl/author";

const globalStore = useGlobalStore();
const authorInfo = new AuthorImpl();
const friend = reactive<Friend>({} as Friend);
const websiteTitle = ref("友链网址");
const updateFriend = ref(false);

async function onSend() {
  const isSend = sessionStorage.getItem("friend");
  if (isSend) {
    OuOMessage.warning("您已提交过友链，请勿重复提交");
    return;
  }
  if (!friend.name || !friend.website || !friend.avatar) {
    OuOMessage.warning("友链名称、网址、头像不能为空");
    return;
  }
  if (updateFriend.value && !friend.oldWebsite) {
    OuOMessage.warning("请填写原来的友链地址");
    return;
  }
  if (!(friend.website.startsWith("http://") || friend.website.startsWith("https://"))) {
    OuOMessage.warning("友链地址需以http或https开头");
    return;
  }
  if (!(friend.avatar.startsWith("http://") || friend.avatar.startsWith("https://"))) {
    OuOMessage.warning("头像地址需以http或https开头");
    return;
  }
  const res = await saveFriend(friend, updateFriend.value);
  if (res.state === "success") {
    OuOMessage.success("友链信息已提交");
    globalStore.showFriendForm = false;
    sessionStorage.setItem("friend", "true");
  }
}

function onCancel() {
  globalStore.showFriendForm = false;
}
</script>

<template>
  <div v-show="globalStore.showFriendForm"
       class="friend flex flex-row items-center justify-center absolute top-0 left-0  w-full">
    <div class="friend__owner-info mx-11">
      <div class="friend__owner-info-title">博主信息</div>
      <div class="timeline">
        <span class="friend__owner-title">名称：</span>{{ authorInfo.name }}
      </div>
      <div class="timeline">
        <span class="friend__owner-title">网址：</span>{{ authorInfo.website }}
      </div>
      <div class="timeline">
        <span class="friend__owner-title">头像：</span>{{ authorInfo.website + authorInfo.avatar }}
      </div>
      <div class="timeline">
        <span class="friend__owner-title">邮箱：</span>{{ authorInfo.email }}
      </div>
      <div class="timeline">
        <span class="friend__owner-title">简介：</span>{{ authorInfo.description }}
      </div>
    </div>
    <div class="m-7">
      <div class="friend-tips my-5">
        <p class="title mb-2">友链交换说明：</p>
        <p>此站点为演示站点，友链仅作演示</p>
      </div>
      <div class="my-3">
        <OuOTag class="mr-3" :size="'small'" :checked="'true'" @click="updateFriend=false">新增</OuOTag>
        <OuOTag :size="'small'" @click="updateFriend=true">更新</OuOTag>
      </div>
      <div class="my-3">
        <div class="my-3">博客类型：</div>
        <OuOTag class="mr-3" :size="'small'" :checked="'true'" :group="'type'" @click="friend.type='1'">默认</OuOTag>
        <OuOTag class="mr-3" :size="'small'" :group="'type'" @click="friend.type='2'">技术</OuOTag>
        <OuOTag :size="'small'" :group="'type'" @click="friend.type='3'">生活</OuOTag>
      </div>

      <div class="friend__form flex flex-col overflow-y-scroll">
        <div class="m-1 friend__form-input">
          <OuOInput :placeholder="'名称'" v-model="friend.name" :border="true"></OuOInput>
        </div>
        <div class="m-1 friend__form-input"
             v-show="updateFriend">
          <OuOInput :placeholder="'原来的友链网址'" v-model="friend.oldWebsite" :border="true"></OuOInput>
        </div>
        <div class="m-1 friend__form-input">
          <OuOInput :placeholder="websiteTitle" v-model="friend.website" :border="true"></OuOInput>
        </div>
        <div class="m-1 friend__form-input">
          <OuOInput :placeholder="'头像地址'" v-model="friend.avatar" :border="true"></OuOInput>
        </div>
        <div class="m-1 friend__form-input">
          <OuOInput :placeholder="'邮箱'" v-model="friend.email" :border="true"></OuOInput>
        </div>
        <div class="m-1 friend__form-textarea">
          <OuOTextarea :placeholder="'简介'" :border="true" :rows="3"
                       v-model="friend.description"></OuOTextarea>
        </div>
        <div class="friend__footer">
          <div class="friend__footer-send flex justify-end my-4 mr-1">
            <OuOButton @click="onCancel" :size="'middle'" :color="'danger'" :type="'transparent'" class="mr-2">取消
            </OuOButton>
            <OuOButton @click="onSend" :size="'middle'">提交</OuOButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.timeline {
  margin: 11px 0;
}

.friend {
  z-index: 11;
  background-color: rgba(var(--z-common-bg), .8);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-transition: all .25s ease;
  transition: all .25s ease;
  padding: 50px;
  min-height: 100vh;

  &__form {
    &-input {
      height: 39px;
    }
  }
}

.friend__owner {
  &-title {
    font-size: 16px;
    font-weight: 500;
  }

  &-info {
    &-title {
      margin-left: -13px;
      margin-bottom: 18px;
      font-size: 22px;
      font-weight: 600;
    }
  }
}
</style>
