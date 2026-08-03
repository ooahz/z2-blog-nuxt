<script setup lang="ts">
import type {CommentInterface, CommentItemInterface} from "@/types/commentInterface";
import {useGlobalStore} from "@/store/globalStore";
import {SuSComment, type ToolBar, type EmojiItem} from "@ahzoo/sus/dist";
import {X, MessageSquareText, Loader2} from "lucide-vue-next";

interface Props {
  replyComment: CommentItemInterface;
  showLoading: boolean;
  susInfoBar: any;
}

interface Emits {
  (e: 'update-avatar', comment: CommentItemInterface): void;

  (e: 'on-cancel'): void;

  (e: 'on-save', comment: CommentInterface): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const globalStore = useGlobalStore();
const emojis = ref<EmojiItem[]>([
  {
    name: "微笑",
    fallbackImage: "/emoji/cat_face.svg",
  },
  {
    name: "笑哭",
    fallbackImage: "/emoji/tears_of_joy.svg",
  },
  {
    name: "惊讶",
    fallbackImage: "/emoji/weary.svg",
  },
  {
    name: "微笑",
    fallbackImage: "/emoji/cat_face.svg",
  },
  {
    name: "笑哭",
    fallbackImage: "/emoji/tears_of_joy.svg",
  },
  {
    name: "惊讶",
    fallbackImage: "/emoji/weary.svg",
  },
  {
    name: "微笑",
    fallbackImage: "/emoji/cat_face.svg",
  },
  {
    name: "笑哭",
    fallbackImage: "/emoji/tears_of_joy.svg",
  },
  {
    name: "惊讶",
    fallbackImage: "/emoji/weary.svg",
  },
  {
    name: "微笑",
    fallbackImage: "/emoji/cat_face.svg",
  },
  {
    name: "笑哭",
    fallbackImage: "/emoji/tears_of_joy.svg",
  },
  {
    name: "惊讶",
    fallbackImage: "/emoji/weary.svg",
  },
  {
    name: "微笑",
    fallbackImage: "/emoji/cat_face.svg",
  },
  {
    name: "笑哭",
    fallbackImage: "/emoji/tears_of_joy.svg",
  },
  {
    name: "惊讶",
    fallbackImage: "/emoji/weary.svg",
  },
] as EmojiItem[]);

const toolbar: ToolBar = {
  emoji: {
    show: true,
    emojis: emojis.value
  },
  notify: false,
  bubbleMenu: {
    show: true
  },
};

const isVisible = ref(false);
const isClosing = ref(false);

watch(() => globalStore.showComment, (show) => {
  if (show) {
    isClosing.value = false;
    nextTick(() => {
      isVisible.value = true;
    });
  } else {
    isVisible.value = false;
    isClosing.value = true;
    setTimeout(() => {
      isClosing.value = false;
    }, 280);
  }
});

function updateAvatar(comment: CommentItemInterface) {
  emit('update-avatar', comment);
}

function toCancelComment() {
  emit('on-cancel');
}

function toSaveComment(comment: CommentInterface) {
  emit('on-save', comment);
}

function onMaskClick(event: MouseEvent) {
  if (event.target === event.currentTarget && !props.showLoading) {
    toCancelComment();
  }
}

function onKeyDown(event: KeyboardEvent) {
  if (event.key === "Escape" && globalStore.showComment && !props.showLoading) {
    toCancelComment();
  }
}

onMounted(() => {
  document.addEventListener("keydown", onKeyDown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", onKeyDown);
});
</script>

<template>
  <Teleport to="body">
    <Transition name="comment-modal">
      <div
          v-show="globalStore.showComment || isClosing"
          class="comment-mask fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh] mobile:pt-[8vh]"
          @click="onMaskClick"
      >
        <div
            class="comment-modal relative w-full max-w-[680px] overflow-hidden rounded-2xl shadow-2xl"
            :class="{ 'comment-modal--visible': isVisible }"
            role="dialog"
            aria-modal="true"
        >
          <div class="comment-modal__glow"/>

          <div class="comment-modal__header flex items-center gap-4 px-6 pt-6 pb-4">
            <div class="flex flex-col min-w-0">
              <span class="loli-font text-lg font-bold tracking-wide">
                {{ replyComment?.userName ? '回复评论' : '发表评论' }}
              </span>
              <span class="comment-modal__subtitle text-xs truncate">
                <template v-if="replyComment?.userName">
                  回复 <span class="reply-target">@{{ replyComment.userName }}</span> 的评论
                </template>
                <template v-else>
                  留下你的足迹吧
                </template>
              </span>
            </div>

            <button
                type="button"
                class="comment-modal__close ml-auto flex h-8 w-8 items-center justify-center rounded-lg"
                aria-label="关闭"
                @click="toCancelComment"
            >
              <X class="h-5 w-5"/>
            </button>
          </div>

          <!-- 加载遮罩 -->
          <div
              v-show="showLoading"
              class="comment-modal__loading absolute inset-0 z-10 flex flex-col items-center justify-center gap-3"
          >
            <Loader2 class="h-7 w-7 animate-spin"/>
            <span class="text-sm font-medium">发送中...</span>
          </div>

          <!-- 表单主体 -->
          <div class="comment-modal__body px-6 pb-5">
            <SuSComment
                class="sus-comment-embed"
                :reply="replyComment"
                :info-bar="susInfoBar"
                :tool-bar="toolbar"
                @update-avatar="updateAvatar"
                @on-cancel="toCancelComment"
                @on-save="toSaveComment"
            />
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.comment-mask {
  background: radial-gradient(circle at 50% 20%, rgba(var(--z-primary-color), 0.18), transparent 55%),
  radial-gradient(circle at 80% 80%, rgba(var(--z-primary-color), 0.08), transparent 40%),
  rgba(var(--z-deep-color), 0.42);
  backdrop-filter: saturate(180%) blur(24px);
}

.comment-modal {
  background: rgba(var(--z-common-bg), 0.94);
  border: 1px solid rgba(var(--z-gray-color), 0.65);
  color: rgb(var(--z-fontcolor));
  transform: translateY(18px) scale(0.97);
  opacity: 0;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
  opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1);

  &--visible {
    transform: translateY(0) scale(1);
    opacity: 1;
  }

  &__glow {
    position: absolute;
    top: -60%;
    left: 50%;
    width: 60%;
    height: 120%;
    transform: translateX(-50%);
    background: radial-gradient(ellipse at center, rgba(var(--z-primary-color), 0.18), transparent 70%);
    pointer-events: none;
  }

  &__subtitle {
    color: rgb(var(--z-fontcolor));
    opacity: 0.6;

    .reply-target {
      color: rgb(var(--z-primary-color));
      font-weight: 600;
    }
  }

  &__close {
    color: rgb(var(--z-fontcolor));
    background: rgba(var(--z-plain-bg), 0.4);
    transition: all 0.25s ease;

    &:hover {
      background: rgba(var(--z-primary-color), 0.12);
      color: rgb(var(--z-primary-color));
    }

    &:active {
      transform: scale(0.94);
    }
  }

  &__loading {
    background: rgba(var(--z-common-bg), 0.72);
    backdrop-filter: blur(10px);
    color: rgb(var(--z-fontcolor));
  }

}

.comment-modal-enter-active,
.comment-modal-leave-active {
  transition: opacity 0.25s ease;
}

.comment-modal-enter-from,
.comment-modal-leave-to {
  opacity: 0;
}

.dark {
  .comment-modal {
    border-color: rgba(var(--z-gray-color), 0.35);
  }
}
</style>
