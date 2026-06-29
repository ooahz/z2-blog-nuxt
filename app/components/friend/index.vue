<script setup lang="ts">
import type {FriendInterface} from "@/types/friendInterface";
import {saveFriendApi} from "~~/service/friend";
import {useGlobalStore} from "@/store/globalStore";
import {OuOButton, OuOInput, OuOMessage, OuOTag, OuOTextarea, OuOTagGroup} from "@ahzoo/ouo";

const appConfig = useAppConfig();
const globalStore = useGlobalStore();
const friend = reactive<FriendInterface>({} as FriendInterface);
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
  const res = await saveFriendApi(friend, updateFriend.value);
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
  <Teleport to="body">
    <Transition name="friend-fade">
      <div
          v-show="globalStore.showFriendForm"
          class="friend fixed inset-0 z-50 flex items-center justify-center p-4"
          @click.self="onCancel"
      >
        <div class="friend__container relative w-full max-w-5xl max-h-[90vh]">
          <button
              class="friend__close absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300"
              aria-label="关闭"
              @click="onCancel"
          >
            ×
          </button>

          <div class="friend__grid">
            <aside class="friend__owner">
              <div class="friend__owner-brand relative">
                <div class="friend__owner-avatar">
                  <img
                      v-if="appConfig.avatar"
                      :src="appConfig.website + appConfig.avatar"
                      alt="博主头像"
                      loading="lazy"
                  />
                  <span v-else class="friend__owner-avatar-fallback">友</span>
                </div>
                <h2 class="friend__owner-name">{{ appConfig.name || '博主' }}</h2>
                <p class="friend__owner-desc three-line">{{ appConfig.description }}</p>
              </div>

              <div class="friend__owner-info relative flex-1 overflow-y-auto">
                <h3 class="friend__owner-info-title">博主信息</h3>
                <ul class="friend__owner-list">
                  <li class="friend__owner-item">
                    <span class="friend__owner-label">名称</span>
                    <span class="friend__owner-value">{{ appConfig.name }}</span>
                  </li>
                  <li class="friend__owner-item">
                    <span class="friend__owner-label">网址</span>
                    <span
                        class="friend__owner-value">
                      {{ appConfig.website }}
                    </span>
                  </li>
                  <li class="friend__owner-item">
                    <span class="friend__owner-label">头像</span>
                    <span class="friend__owner-value">{{ appConfig.website + appConfig.avatar }}</span>
                  </li>
                  <li class="friend__owner-item">
                    <span class="friend__owner-label">邮箱</span>
                    <span class="friend__owner-value">{{ appConfig.email || '-' }}</span>
                  </li>
                  <li class="friend__owner-item">
                    <span class="friend__owner-label">简介</span>
                    <span class="friend__owner-value">{{ appConfig.description }}</span>
                  </li>
                </ul>
              </div>

              <div class="friend__owner-decoration absolute" aria-hidden="true"/>
            </aside>

            <main class="friend__main">
              <div class="friend__header">
                <p class="friend__eyebrow">Exchange Link</p>
                <h3 class="friend__title">交换友链</h3>
                <p class="friend__subtitle">此站点为演示站点，友链仅作演示</p>
              </div>

              <div class="friend__section">
                <span class="friend__section-label">操作类型</span>
                <OuOTagGroup class="friend__tag-row">
                  <OuOTag
                    class="friend__tag"
                    :class="{ 'friend__tag--active': !updateFriend }"
                    type="card"
                    :checked="!updateFriend"
                    @click="updateFriend = false"
                  >
                    新增友链
                  </OuOTag>
                  <OuOTag
                    class="friend__tag"
                    :class="{ 'friend__tag--active': updateFriend }"
                    type="card"
                    :checked="updateFriend"
                    @click="updateFriend = true"
                  >
                    更新友链
                  </OuOTag>
                </OuOTagGroup>
              </div>

              <div class="friend__section">
                <span class="friend__section-label">博客类型</span>
                <OuOTagGroup class="friend__tag-row">
                  <OuOTag
                    class="friend__tag"
                    :class="{ 'friend__tag--active': friend.type === '1' }"
                    type="card"
                    group="type"
                    :checked="friend.type === '1'"
                    @click="friend.type = '1'"
                  >
                    默认
                  </OuOTag>
                  <OuOTag
                    class="friend__tag"
                    :class="{ 'friend__tag--active': friend.type === '2' }"
                    type="card"
                    group="type"
                    :checked="friend.type === '2'"
                    @click="friend.type = '2'"
                  >
                    技术
                  </OuOTag>
                  <OuOTag
                    class="friend__tag"
                    :class="{ 'friend__tag--active': friend.type === '3' }"
                    type="card"
                    group="type"
                    :checked="friend.type === '3'"
                    @click="friend.type = '3'"
                  >
                    生活
                  </OuOTag>
                </OuOTagGroup>
              </div>

              <div class="friend__form">
                <div class="friend__form-row">
                  <div class="friend__form-field friend__form-field--half">
                    <label class="friend__form-label">博客名称</label>
                    <OuOInput v-model="friend.name" placeholder="博客名称" :border="true"/>
                  </div>
                  <div class="friend__form-field friend__form-field--half">
                    <label class="friend__form-label">邮箱地址</label>
                    <OuOInput v-model="friend.email" placeholder="联系邮箱" :border="true"/>
                  </div>
                </div>

                <Transition name="friend-slide">
                  <div v-show="updateFriend" class="friend__form-field">
                    <label class="friend__form-label">原友链网址</label>
                    <OuOInput v-model="friend.oldWebsite" placeholder="原来的友链网址" :border="true"/>
                  </div>
                </Transition>

                <div class="friend__form-field">
                  <label class="friend__form-label">友链网址</label>
                  <OuOInput v-model="friend.website" :placeholder="websiteTitle" :border="true"/>
                </div>

                <div class="friend__form-field">
                  <label class="friend__form-label">头像地址</label>
                  <OuOInput v-model="friend.avatar" placeholder="头像地址" :border="true"/>
                </div>

                <div class="friend__form-field">
                  <label class="friend__form-label">博客简介</label>
                  <OuOTextarea
                      v-model="friend.description"
                      placeholder="简单介绍一下你的博客"
                      :border="true"
                      :rows="4"
                  />
                </div>

                <div class="friend__footer">
                  <OuOButton
                      type="transparent"
                      color="danger"
                      size="middle"
                      class="friend__btn friend__btn--cancel"
                      @click="onCancel"
                  >
                    取消
                  </OuOButton>
                  <OuOButton size="middle" class="friend__btn friend__btn--send" @click="onSend">
                    提交申请
                  </OuOButton>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.friend {
  background: rgba(var(--z-global-bg), 0.85);
  backdrop-filter: saturate(180%) blur(24px);
  -webkit-backdrop-filter: saturate(180%) blur(24px);
  transition: opacity 0.35s ease;

  &__container {
    display: flex;
    flex-direction: column;
    background: rgba(var(--z-common-bg), 0.95);
    border: 1px solid rgba(var(--z-border-color), 0.12);
    border-radius: 28px;
    box-shadow: 0 25px 80px -20px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(var(--z-primary-color), 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
    animation: friend-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: -60px;
      right: -60px;
      width: 220px;
      height: 220px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(var(--z-primary-color), 0.14), transparent 70%);
      pointer-events: none;
      filter: blur(10px);
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -80px;
      left: -40px;
      width: 260px;
      height: 260px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(var(--z-primary-color), 0.1), transparent 70%);
      pointer-events: none;
      filter: blur(14px);
    }
  }

  &__close {
    color: rgba(var(--z-text-color), 0.55);
    background: rgba(var(--z-common-bg), 0.6);
    border: 1px solid rgba(var(--z-border-color), 0.1);
    font-size: 24px;
    line-height: 1;

    &:hover {
      color: rgb(var(--z-primary-color));
      background: rgba(var(--z-primary-color), 0.08);
      border-color: rgba(var(--z-primary-color), 0.25);
      transform: rotate(90deg);
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 320px 1fr;
    height: 100%;
    max-height: inherit;
  }

  &__owner {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    max-height: inherit;
    padding: 40px 32px;
    color: rgba(var(--z-primary-fontcolor));
    background: linear-gradient(160deg, rgba(var(--z-primary-color), 0.92) 0%, rgba(var(--z-primary-color), 0.75) 100%),
    radial-gradient(circle at 20% 120%, rgba(255, 255, 255, 0.18), transparent 55%);
    border-radius: 28px 0 0 28px;
    overflow: hidden;

    &-avatar {
      width: 86px;
      height: 86px;
      margin-bottom: 20px;
      border-radius: 50%;
      overflow: hidden;
      border: 3px solid rgba(255, 255, 255, 0.35);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      &-fallback {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        font-size: 32px;
        font-weight: 700;
        background: rgba(255, 255, 255, 0.2);
      }
    }

    &-name {
      font-size: 26px;
      font-weight: 700;
      letter-spacing: 1px;
      margin-bottom: 10px;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    }

    &-desc {
      font-size: 14px;
      line-height: 1.7;
      opacity: 0.8;
    }

    &-info {
      margin-top: 32px;
      padding-right: 8px;
      margin-right: -8px;
    }

    &-info-title {
      position: sticky;
      top: 0;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 2px;
      text-transform: uppercase;
      opacity: 0.65;
      margin-bottom: 18px;
      padding-bottom: 8px;
      background: rgba(var(--z-primary-color), 0.01);
      backdrop-filter: blur(2px);
    }

    &-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    &-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 12px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);

      &:last-child {
        border-bottom: none;
      }
    }

    &-label {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      opacity: 0.6;
    }

    &-value {
      font-size: 13px;
      line-height: 1.5;
      word-break: break-all;
      opacity: 0.9;
    }

    &-link {
      color: inherit;
      text-decoration: underline;
      text-underline-offset: 3px;
      text-decoration-color: rgba(255, 255, 255, 0.4);
      transition: opacity 0.25s ease;

      &:hover {
        opacity: 1;
        text-decoration-color: rgba(255, 255, 255, 0.8);
      }
    }

    &-decoration {
      top: 24px;
      right: 24px;
      width: 120px;
      height: 120px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 50%;

      &::before,
      &::after {
        content: '';
        position: absolute;
        border-radius: 50%;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      &::before {
        inset: 18px;
      }

      &::after {
        inset: 38px;
      }
    }
  }

  &__main {
    position: relative;
    flex: 1;
    max-height: inherit;
    padding: 44px 48px 40px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  &__header {
    margin-bottom: 32px;
  }

  &__eyebrow {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgb(var(--z-primary-color));
    opacity: 0.75;
    margin-bottom: 8px;
  }

  &__title {
    font-size: 28px;
    font-weight: 700;
    color: rgba(var(--z-text-color), 0.95);
    margin-bottom: 8px;
  }

  &__subtitle {
    font-size: 14px;
    color: rgba(var(--z-text-color), 0.55);
  }

  &__section {
    margin-bottom: 24px;

    &-label {
      display: block;
      font-size: 12px;
      font-weight: 600;
      color: rgba(var(--z-text-color), 0.5);
      margin-bottom: 10px;
      letter-spacing: 0.5px;
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 18px;

    &-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 18px;
    }

    &-field {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    &-label {
      font-size: 13px;
      font-weight: 600;
      color: rgba(var(--z-text-color), 0.75);
    }
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 10px;
    padding-top: 20px;
    border-top: 1px solid rgba(var(--z-border-color), 0.1);
  }
}

.friend-fade {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.35s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}

.friend-slide {
  &-enter-active,
  &-leave-active {
    transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateY(-10px);
    max-height: 0;
  }
}

@keyframes friend-in {
  from {
    opacity: 0;
    transform: scale(0.96) translateY(16px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

body[view="mobile"] {
  .friend {
    padding: 12px;

    &__grid {
      grid-template-columns: 1fr;
      overflow-y: auto;
    }

    &__container {
      border-radius: 22px;
      max-height: 96vh;
    }

    &__owner {
      max-height: unset;
      border-radius: 22px 22px 0 0;
      padding: 28px 22px;

      &-info {
        margin-top: 0;
      }

      &-list {
        grid-template-columns: 1fr;
      }

      &-name,
      &-desc {
        display: none;
      }

      &-decoration {
        width: 90px;
        height: 90px;
        top: 16px;
        right: 16px;
      }
    }

    &__main {
      padding: 26px 22px;
    }

    &__form-row {
      grid-template-columns: 1fr;
    }

    &__footer {
      flex-direction: column-reverse;

      .friend__btn {
        width: 100%;
        justify-content: center;
      }
    }
  }
}
</style>
