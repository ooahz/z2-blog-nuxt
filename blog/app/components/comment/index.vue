<script setup lang="ts">
import type {CommentInterface, CommentItemInterface} from "@/types/commentInterface";
import {saveCommentApi} from "~~/service/comment";
import {useGlobalStore} from "@/store/globalStore";
import {SuSList} from "@ahzoo/sus/dist";
import {OuOMessage} from "@ahzoo/ouo";
import {MessageCircle, MessageSquarePlus} from "lucide-vue-next";
import CommentForm from "./form.vue";
import EmptyState from "~/components/common/EmptyState.vue";

interface Props {
  commentList?: CommentItemInterface[];
}

withDefaults(defineProps<Props>(), {
  commentList: () => []
});

const emit = defineEmits<{
  (e: "refresh"): void;
}>();

const {path} = useRoute();
const articlePath = <string>path.split("/").pop();
const globalStore = useGlobalStore();
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

function toShowComment() {
  replyComment.value = {} as CommentItemInterface;
  globalStore.setShowComment(true);
}

function toReplyComment(comment: CommentItemInterface) {
  replyComment.value = unref(comment);
  globalStore.setShowComment(true);
}

function toCancelComment() {
  globalStore.setShowComment(false);
}

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
    emit("refresh");
  }
}

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

  <div id="comment" class="comment-container">
    <div class="action-bar">

      <button class="write-btn" @click="toShowComment">
        <MessageSquarePlus class="btn-icon"/>
        <span class="btn-text">写下留言</span>
        <span class="btn-arrow">→</span>
      </button>
    </div>

    <div v-if="commentList?.length > 0" class="comment-stream">
      <div
          v-for="(commentItem, index) in commentList"
          :key="commentItem.id"
          class="comment-card"
          :class="{'comment-card--alt': index % 2 === 1}"
          :style="{'--delay': `${index * 0.08}s`}"
      >
        <div class="card-index">{{ String(index + 1).padStart(2, '0') }}</div>
        <SuSList
            :comment="commentItem"
            :line-height="20"
            @on-reply="toReplyComment"
        />
      </div>
    </div>

    <div v-else class="empty-state">
      <EmptyState
          title="暂无评论"
          subtitle="来发表首个评论吧"
      />
      <div class="empty-cta" @click="toShowComment">
        <span>成为第一个留言者</span>
        <MessageCircle :size="16"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.comment-container {
  position: relative;
}

.action-bar {
  display: flex;
  justify-content: end;
  align-items: center;
  margin-bottom: 32px;
  padding: 18px 24px;
  background: rgba(var(--z-common-bg), 0.72);
  border-radius: 18px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px 32px;
  background: rgba(var(--z-common-bg), 0.6);
  border: 2px dashed rgba(var(--z-border-color), 0.6);
  border-radius: 22px;
  text-align: center;
}

.empty-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  padding: 10px 22px;
  background: transparent;
  border: 1px solid rgb(var(--z-primary-color));
  border-radius: 100px;
  color: rgb(var(--z-primary-color));
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgb(var(--z-primary-color));
    color: rgb(var(--z-btn-fontcolor));
    transform: translateY(-2px);
  }
}

.comment-stream {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.comment-card {
  position: relative;
  padding: 22px 22px 22px 56px;
  background: rgba(var(--z-common-bg), 0.72);
  border: 1px solid rgba(var(--z-border-color), 0.45);
  border-radius: 18px;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  animation: cardFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) var(--delay, 0s) backwards;

  &:hover {
    transform: translateX(6px);
    border-color: rgba(var(--z-primary-color), 0.35);
    box-shadow: 0 10px 32px -12px rgba(var(--z-primary-color), 0.12);

    .card-index {
      color: rgb(var(--z-primary-color));
    }
  }

  &--alt {
    margin-left: 32px;
  }
}

@keyframes cardFadeIn {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-index {
  position: absolute;
  left: 18px;
  top: 22px;
  font-family: kksj, mi, sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  color: rgba(var(--z-fontcolor-gray), 0.5);
  transition: color 0.3s ease;
}

[view="mobile"] {
  .action-bar {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
    padding: 16px 18px;
  }

  .empty-state {
    padding: 48px 20px;
  }

  .comment-card {
    padding: 16px 16px 16px 44px;
    margin-left: 0;

    &--alt {
      margin-left: 0;
    }
  }

  .card-index {
    left: 14px;
    top: 16px;
  }
}
</style>
