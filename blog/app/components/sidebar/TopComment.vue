<script lang="ts" setup>
import type {TopCommentItemInterface} from "@/types/commentInterface";
import {topCommentApi} from "~~/service/comment";
import {SuSTop} from "@ahzoo/sus/dist";
import {MessageCircle} from "lucide-vue-next";

const appConfig = useAppConfig();
const commentList = ref<TopCommentItemInterface[]>([]);

/**
 * 数据获取
 */
await getTopComment();

async function getTopComment() {
  if (appConfig.feature?.comment === "disable") {
    return;
  }
  commentList.value = await topCommentApi();
}
</script>
<template>
  <div v-if="!(appConfig.feature?.comment === 'disable')"
       class="top-comment sidebar-card">
    <div class="sidebar-card-header">
      <div class="header-icon">
        <MessageCircle/>
      </div>
      <div class="header-title">最新评论</div>
      <div class="header-line"></div>
    </div>
    <a :href="commentItem.website"
       v-for="commentItem in commentList"
       class="no-style" target="_blank">
      <SuSTop :comment="commentItem"/>
    </a>
  </div>
</template>

<style lang="scss">
.top-comment {
  padding: 1.25rem 1.4rem 1rem;
}

.sidebar-card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;

  .header-icon {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(var(--z-primary-color), 0.15), rgba(var(--z-primary-color), 0.05));
    border-radius: 10px;

    svg {
      width: 18px;
      height: 18px;
      color: rgba(var(--z-primary-color), 0.9);
    }
  }

  .header-title {
    font-size: 15px;
    font-weight: 700;
    color: rgba(var(--z-fontcolor), 0.9);
  }

  .header-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(var(--z-border-color), 0.5), transparent);
    margin-left: 8px;
  }
}
</style>
