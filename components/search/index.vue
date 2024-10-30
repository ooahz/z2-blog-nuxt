<script setup lang="ts">
import {MagnifyingGlassIcon, XMarkIcon} from "@heroicons/vue/24/solid";
import {useGlobalStore} from "@/store/globalStore";
import {useSearchStore} from "@/store/searchStore";

const globalState = useGlobalStore();
const searchStore = useSearchStore();
const keyword = ref("");
const selectList = ["在标题中搜索", "在内容中搜索", "全文搜索"];

function closeSearch() {
  keyword.value = "";
  globalState.setShowSearch(false);
}

function goSearch(item: string) {
  if (keyword.value) {
    if (item === "在标题中搜索") {
      searchStore.init(keyword.value, "title");
    } else if (item === "在内容中搜索") {
      searchStore.init(keyword.value, "content");
    } else if (item === "全文搜索") {
      searchStore.init(keyword.value, "all");
    }
    searchStore.setMarking(keyword.value);
    keyword.value = "";
    globalState.setShowSearch(false);
    navigateTo(`/search`);
  }
}
</script>

<template>
  <Teleport to="body">
    <div class="search backdrop-blur-2 flex justify-center fixed top-0 left-0 w-full h-full"
         v-if="globalState.showSearch">
      <div
          class="search-container flex flex-col relative w-4/6 pad:w-10/12 mobile:w-full h-48 m-5 mt-28 py-1.5 rounded-xl">
        <div class="search-container__basic flex flex-col w-full h-full">
          <div class="search-container__input bottom-line flex items-center">
            <MagnifyingGlassIcon/>
            <input class="w-full" v-model="keyword" maxlength="15" placeholder="搜索"/>
            <XMarkIcon class="hover-color cursor-pointer" @click="closeSearch"/>
          </div>
          <div class="search-container__select">
            <div class="hover-transparent select-item flex items-center justify-between cursor-pointer"
                 v-for="item in selectList"
                 @click="goSearch(item)">
              <span>“{{ keyword }}”</span>
              <span class="opacity-60">{{ item }}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </Teleport>

</template>

<style lang="scss">
.search {
  z-index: 99;
  color: rgb(var(--z-fontcolor));
  background-color: rgba(var(--z-common-bg));
}

.search-container {
  background-color: rgb(var(--z-common-bg));
  transition: all .3s;

  &__input {
    padding: 5px 20px;
    height: fit-content;

    svg {
      height: 1.4rem;
      width: 1.4rem;

      &:nth-child(1) {
        fill: rgba(var(--z-fontcolor), .5);
      }
    }
  }

  &__select {
    font-size: 90%;
    padding: 5px 15px;
  }
}


.select-item {
  padding: 8px 15px;

}
</style>
