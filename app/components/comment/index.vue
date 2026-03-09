<script setup lang="ts">
import type {CommentInterface, CommentItemInterface} from "@/types/commentInterface";
import {listFriendApi, saveCommentApi} from "~~/service/comment";
import {useGlobalStore} from "@/store/globalStore";
import {SuSList} from "@ahzoo/sus/dist";
import {OuOMessage} from "@ahzoo/ouo";
import {MessageCircle} from "lucide-vue-next";
import CommentForm from "./form.vue";
import EmptyState from "~/components/common/EmptyState.vue";


const {path} = useRoute();
const articlePath = <string>path.split("/").pop();
const globalStore = useGlobalStore();
const commentList = ref<CommentItemInterface[]>([] as CommentItemInterface[]);
const replyComment = ref<CommentItemInterface>({} as CommentItemInterface);
const showLoading = ref(false);

const susInfoBar = {
  enable: true,
  name: {
    show: true,
    placeholder: "昵称(必填)"
  },
  website: {
    show: true,
    placeholder: "网址(https://)",
    tips: "点击昵称时可跳转"
  },
  email: {
    show: true,
    placeholder: "邮箱(不会公开，仅用于通知回复)",
    tips: "输入QQ邮箱自动获取头像"
  }
};

/**
 * 数据获取
 */
await getCommentList(1);

/**
 * 正常评论弹窗
 */
function toShowComment() {
  replyComment.value = {} as CommentItemInterface;
  globalStore.setShowComment(true);
}

/**
 * 回复评论弹窗
 * @param comment
 */
function toReplyComment(comment: CommentItemInterface) {
  replyComment.value = unref(comment);
  globalStore.setShowComment(true);
}

function toCancelComment() {
  globalStore.setShowComment(false);
}

/**
 * 保存评论
 * @param comment
 */
async function toSaveComment(comment: CommentInterface) {
  const beforeContent = localStorage.getItem("content");
  comment.articleId = articlePath;
  const contentLength = comment.content.length;
  if (!comment) {
    return;
  }
  if (beforeContent === comment.contentText) {
    OuOMessage.warning("请勿发送重复内容");
    return;
  }
  if (!comment.userName) {
    OuOMessage.warning("请先填写昵称");
    return;
  }
  if (contentLength < 3) {
    OuOMessage.warning("字数过少");
    return;
  }
  if (contentLength > 800) {
    OuOMessage.warning("字数超出限制");
    return;
  }
  showLoading.value = true;
  comment.website = window.location.href;
  const res = await saveCommentApi(comment);
  showLoading.value = false;
  if (!!res) {
    localStorage.setItem("content", comment.contentText);
    OuOMessage.success("评论成功");
    globalStore.setShowComment(false);
    await getCommentList(1);
  }
}

async function getCommentList(pagination: number) {
  commentList.value = await listFriendApi(articlePath, pagination).then((res) => {
    return res.map(item => ({
      ...item,
      avatarDisplay: 'text'
    }));
  });
}

/**
 * 邮件输入框失去焦点时触发，可自定义更新头像事件
 */
function updateAvatar(comment: CommentItemInterface) {
  // 更新头像
  // comment.userAvatar = "";
}
</script>

<template>
  <CommentForm
      :reply-comment="replyComment"
      :show-loading="showLoading"
      :sus-info-bar="susInfoBar"
      @update-avatar="updateAvatar"
      @on-cancel="toCancelComment"
      @on-save="toSaveComment"
  />
  <div id="comment" class="relative h-full">
    <div class="box-header flex justify-end">
      <div @click="toShowComment"
           class="hover-color flex items-center right cursor-pointer transition-all duration-300 hover:scale-105">
        <span class="title mx-1">
          发表评论
        </span>
        <MessageCircle/>
      </div>
    </div>
    <div v-if="commentList.length > 0" class="comment-list mt-7">
      <SuSList v-for="commentItem in commentList" :comment="commentItem" @on-reply="toReplyComment"/>
    </div>
    <EmptyState
        v-else
        :icon="'📃'"
        :title="'暂无评论'"
        :subtitle="'来发表首个评论吧'"
    />
  </div>
</template>

<style scoped lang="scss">
</style>
