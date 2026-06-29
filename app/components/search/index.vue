<script setup lang="ts">
import {useGlobalStore} from "@/store/globalStore";
import {useSearchStore} from "@/store/searchStore";
import {Search, X, Command, Clock, ArrowRight, CornerDownLeft, Sparkles} from "lucide-vue-next";
import {useLocalStorage} from "@vueuse/core";

const globalState = useGlobalStore();
const searchStore = useSearchStore();
const keyword = ref("");
const activeType = ref<"all" | "title" | "content">("all");
const inputRef = ref<HTMLInputElement | null>(null);

interface SearchType {
  key: "all" | "title" | "content";
  label: string;
  desc: string;
}

const searchTypes: SearchType[] = [
  {key: "all", label: "全文", desc: "标题 + 正文"},
  {key: "title", label: "标题", desc: "仅标题"},
  {key: "content", label: "正文", desc: "仅正文"}
];

const recentSearches = useLocalStorage<string[]>("ahzoo:recent-searches", []);

function closeSearch() {
  keyword.value = "";
  activeType.value = "all";
  globalState.setShowSearch(false);
}

function goSearch(manualKeyword?: string) {
  const k = (manualKeyword ?? keyword.value).trim();
  if (!k) return;
  searchStore.init(k, activeType.value);
  searchStore.setMarking(k);
  saveRecentSearch(k);
  keyword.value = "";
  activeType.value = "all";
  globalState.setShowSearch(false);
  navigateTo(`/search`);
}

function saveRecentSearch(k: string) {
  const list = recentSearches.value.filter((item: string) => item !== k);
  list.unshift(k);
  recentSearches.value = list.slice(0, 5);
}

function removeRecentSearch(e: Event, k: string) {
  e.stopPropagation();
  recentSearches.value = recentSearches.value.filter((item: string) => item !== k);
}

function handleBackdropClick(e: MouseEvent) {
  if (e.target === e.currentTarget) {
    closeSearch();
  }
}

function handleKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    globalState.setShowSearch(true);
  }
  if (e.key === "Escape" && globalState.showSearch) {
    closeSearch();
  }
  if (e.key === "Enter" && globalState.showSearch) {
    goSearch();
  }
}

watch(() => globalState.showSearch, (show) => {
  if (show) {
    nextTick(() => {
      inputRef.value?.focus();
    });
  }
});

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <Teleport to="body">
    <Transition name="search-fade">
      <div
        v-if="globalState.showSearch"
        class="search-backdrop fixed inset-0 z-[99] flex items-start justify-center px-4 pt-[12vh] mobile:pt-[8vh]"
        @click="handleBackdropClick"
      >
        <div
          class="search-modal relative w-full max-w-[680px] overflow-hidden rounded-2xl shadow-2xl"
          role="dialog"
          aria-modal="true"
        >
          <div class="search-glow"/>

          <div class="search-header flex items-center gap-4 px-6 pt-6 pb-4">
            <div class="search-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
              <Sparkles class="h-6 w-6"/>
            </div>
            <div class="flex flex-col">
              <span class="loli-font text-lg font-bold tracking-wide">搜索全站</span>
              <span class="text-xs opacity-60">在全站文章中寻找你感兴趣的内容</span>
            </div>
            <button
              class="search-close ml-auto flex h-8 w-8 items-center justify-center rounded-lg"
              aria-label="关闭搜索"
              @click="closeSearch"
            >
              <X class="h-5 w-5"/>
            </button>
          </div>

          <div class="search-input-wrapper px-6 pb-5">
            <div class="search-input flex items-center gap-3 rounded-xl px-4 py-3.5">
              <Search class="h-5 w-5 opacity-50"/>
              <input
                ref="inputRef"
                v-model="keyword"
                class="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:opacity-40"
                maxlength="30"
                placeholder="输入关键词，按回车搜索…"
                @keyup.enter="goSearch()"
              />
              <button
                v-if="keyword"
                class="flex h-6 w-6 items-center justify-center rounded-full opacity-60 transition-opacity hover:opacity-100"
                @click="keyword = ''"
              >
                <X class="h-3.5 w-3.5"/>
              </button>
              <div class="hidden h-7 items-center gap-1 rounded-md border px-2 text-xs font-medium opacity-50 sm:flex">
                <CornerDownLeft class="h-3 w-3"/>
                回车
              </div>
            </div>
          </div>

          <div class="search-type px-6 pb-6">
            <div class="search-type__label mb-2.5 text-xs font-medium opacity-50">搜索范围</div>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="type in searchTypes"
                :key="type.key"
                class="search-type__item flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-all"
                :class="{'is-active': activeType === type.key}"
                @click="activeType = type.key"
              >
                <span class="font-medium">{{ type.label }}</span>
                <span class="text-xs opacity-60">{{ type.desc }}</span>
              </button>
            </div>
          </div>

          <div v-if="recentSearches.length" class="search-recent px-6 pb-6">
            <div class="search-recent__label mb-2.5 flex items-center gap-2 text-xs font-medium opacity-50">
              <Clock class="h-3.5 w-3.5"/>
              最近搜索
            </div>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="item in recentSearches"
                :key="item"
                class="search-recent__item group flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all"
                @click="goSearch(item)"
              >
                <ArrowRight class="h-3.5 w-3.5 opacity-40 transition-opacity group-hover:opacity-100"/>
                <span class="single-line max-w-[180px]">{{ item }}</span>
                <span
                  class="flex h-5 w-5 items-center justify-center rounded-full opacity-0 transition-opacity group-hover:opacity-60"
                  @click="removeRecentSearch($event, item)"
                >
                  <X class="h-3 w-3"/>
                </span>
              </button>
            </div>
          </div>

          <div class="search-footer flex items-center justify-between border-t px-6 py-3 text-xs">
            <div class="flex items-center gap-4 opacity-50">
              <span class="flex items-center gap-1">
                <kbd class="search-kbd">ESC</kbd>
                关闭
              </span>
              <span class="flex items-center gap-1">
                <kbd class="search-kbd">↵</kbd>
                搜索
              </span>
            </div>
            <div class="flex items-center gap-1 opacity-50">
              <kbd class="search-kbd flex items-center gap-0.5">
                <Command class="h-3 w-3"/>K
              </kbd>
              唤起搜索
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss">
.search-backdrop {
  background:
    radial-gradient(circle at 50% 20%, rgba(var(--z-primary-color), 0.18), transparent 55%),
    radial-gradient(circle at 80% 80%, rgba(var(--z-primary-color), 0.08), transparent 40%),
    rgba(var(--z-deep-color), 0.42);
  backdrop-filter: saturate(180%) blur(24px);
}

.search-modal {
  background: rgba(var(--z-common-bg), 0.94);
  border: 1px solid rgba(var(--z-gray-color), 0.65);
  color: rgb(var(--z-fontcolor));
  animation: modal-in 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.search-glow {
  position: absolute;
  top: -60%;
  left: 50%;
  width: 60%;
  height: 120%;
  transform: translateX(-50%);
  background: radial-gradient(ellipse at center, rgba(var(--z-primary-color), 0.18), transparent 70%);
  pointer-events: none;
}

.search-icon {
  background: linear-gradient(135deg, rgba(var(--z-primary-color), 0.18), rgba(var(--z-primary-color), 0.06));
  color: rgb(var(--z-primary-color));
  box-shadow: 0 4px 20px rgba(var(--z-primary-color), 0.12);
}

.search-close {
  color: rgb(var(--z-fontcolor));
  background: rgba(var(--z-plain-bg), 0.4);
  transition: all 0.25s ease;

  &:hover {
    background: rgba(var(--z-primary-color), 0.12);
    color: rgb(var(--z-primary-color));
  }
}

.search-input {
  background: rgba(var(--z-basic-input-color), 0.55);
  border: 1px solid rgba(var(--z-gray-color), 0.6);
  transition: all 0.25s ease;

  &:focus-within {
    background: rgba(var(--z-basic-color), 0.85);
    border-color: rgba(var(--z-primary-color), 0.5);
    box-shadow: 0 0 0 4px rgba(var(--z-primary-color), 0.08), 0 8px 32px rgba(var(--z-primary-color), 0.1);
  }
}

.search-type__item {
  background: rgba(var(--z-plain-bg), 0.35);
  border-color: rgba(var(--z-gray-color), 0.5);
  color: rgb(var(--z-fontcolor));

  &:hover {
    background: rgba(var(--z-primary-color), 0.08);
    border-color: rgba(var(--z-primary-color), 0.25);
  }

  &.is-active {
    background: rgba(var(--z-primary-color), 0.12);
    border-color: rgba(var(--z-primary-color), 0.55);
    color: rgb(var(--z-primary-color));
    box-shadow: 0 4px 16px rgba(var(--z-primary-color), 0.1);
  }
}

.search-recent__item {
  background: rgba(var(--z-plain-bg), 0.35);
  color: rgb(var(--z-fontcolor));

  &:hover {
    background: rgba(var(--z-primary-color), 0.08);
    color: rgb(var(--z-primary-color));
  }
}

.search-footer {
  border-color: rgba(var(--z-gray-color), 0.45);
}

.search-kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  padding: 2px 6px;
  border-radius: 5px;
  background: rgba(var(--z-plain-bg), 0.8);
  border: 1px solid rgba(var(--z-gray-color), 0.6);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 10px;
  line-height: 1.2;
}

.search-fade-enter-active,
.search-fade-leave-active {
  transition: opacity 0.25s ease;
}

.search-fade-enter-from,
.search-fade-leave-to {
  opacity: 0;
}

@keyframes modal-in {
  from {
    opacity: 0;
    transform: translateY(18px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.dark {
  .search-modal {
    border-color: rgba(var(--z-gray-color), 0.35);
  }

  .search-input {
    background: rgba(var(--z-plain-bg), 0.45);
    border-color: rgba(var(--z-gray-color), 0.45);

    &:focus-within {
      background: rgba(var(--z-common-bg), 0.85);
    }
  }

  .search-kbd {
    background: rgba(var(--z-deep-color), 0.6);
    border-color: rgba(var(--z-gray-color), 0.4);
  }
}
</style>
