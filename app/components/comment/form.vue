<script setup lang="ts">
import type {CommentInterface, CommentItemInterface} from "@/types/commentInterface";
import {useGlobalStore} from "@/store/globalStore";
import {SuSComment, type ToolBar, type EmojiItem} from "@ahzoo/sus/dist";

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

function updateAvatar(comment: CommentItemInterface) {
  emit('update-avatar', comment);
}

function toCancelComment() {
  emit('on-cancel');
}

function toSaveComment(comment: CommentInterface) {
  emit('on-save', comment);
}
</script>

<template>
  <Teleport to="body">
    <div class="comment-mask fixed flex flex-col items-center justify-center top-0 left-0 w-full h-full"
         v-show="globalStore.showComment">
      <div class="comment-sus flex flex-col">
        <div v-show="showLoading" class="w-full h-full">
          <Loading/>
        </div>
        <div class="stress my-3" v-show="replyComment?.userName">回复@{{ replyComment?.userName }}：</div>
        <SuSComment class="w-full h-auto"
                    :reply="replyComment"
                    :info-bar="susInfoBar"
                    :tool-bar="toolbar"
                    @update-avatar="updateAvatar"
                    @on-cancel="toCancelComment"
                    @on-save="toSaveComment"/>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.comment {
  &-mask {
    z-index: 11;
    background-color: rgba(var(--z-global-bg), .9);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    backdrop-filter: saturate(180%) blur(20px);
    -webkit-transition: all .25s ease;
    transition: all .25s ease;
  }

  &-sus {
    margin: 30px 15vw;
    max-width: 700px;
    min-width: 300px;
  }
}
</style>
