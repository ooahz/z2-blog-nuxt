<script setup lang="ts">
import type {ArchiveArticleInterface} from "@/types/articleInterface";
import type {PaginationInfo} from "@/types/resultInterface";
import {listArchiveApi} from "~~/service/archive";
import {OuOPagination} from "@ahzoo/ouo";
import ArchiveItem from "@/components/list/ArchiveItem.vue";
import EmptyState from "@/components/common/EmptyState.vue";

interface GroupedArchive {
  year: string;
  months: {
    month: string;
    articles: ArchiveArticleInterface[];
  }[];
}

const archiveList = ref<ArchiveArticleInterface[]>([]);
const groupedArchives = ref<GroupedArchive[]>([]);
const page = ref<PaginationInfo>();
const totalPage = ref(0);
const lastPagination = ref(0);

await getArchiveList(1);

async function getArchiveList(pagination: number) {
  const result = await listArchiveApi(pagination);
  archiveList.value = result.data || [];
  const pageRes = result.page;
  if (pageRes?.size > 0) {
    page.value = result.page;
    totalPage.value = Math.floor(Number.parseInt(pageRes.total) / pageRes.size) + 1;
  }
  groupArchivesByTime();
}

function groupArchivesByTime() {
  const grouped: Record<string, Record<string, ArchiveArticleInterface[]>> = {};

  archiveList.value.forEach(article => {
    if (!article.createdDate) return;

    const date = new Date(article.createdDate);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');

    if (!grouped[year]) {
      grouped[year] = {};
    }
    if (!grouped[year][month]) {
      grouped[year][month] = [];
    }
    grouped[year][month].push(article);
  });

  groupedArchives.value = Object.keys(grouped)
    .sort((a, b) => Number(b) - Number(a))
    .map(year => ({
      year,
      months: Object.keys(grouped[year])
        .sort((a, b) => Number(b) - Number(a))
        .map(month => ({
          month,
          articles: grouped[year][month].sort((a, b) => {
            const dateA = new Date(a.createdDate || '').getTime();
            const dateB = new Date(b.createdDate || '').getTime();
            return dateB - dateA;
          })
        }))
    }));
}

function getMonthName(month: string): string {
  const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月',
                     '七月', '八月', '九月', '十月', '十一月', '十二月'];
  return monthNames[Number.parseInt(month) - 1] || month;
}

function getArticleCount(year: string): number {
  const yearGroup = groupedArchives.value.find(g => g.year === year);
  if (!yearGroup) return 0;
  return yearGroup.months.reduce((acc, m) => acc + m.articles.length, 0);
}

function switchPage(pagination: any) {
  const newPagination = pagination.value;
  if (newPagination === lastPagination.value) {
    return;
  }
  if (newPagination < 1 || newPagination > totalPage.value) {
    return;
  }
  lastPagination.value = newPagination;
  getArchiveList(newPagination);
}

const layoutState = reactive({
  title: "文章归档",
  subtitle: "欧内盖😨 <a href='https://github.com/ooahz/z2-blog-nuxt'>项目</a> 没有人点star的话，瓦达西😨😱😭😭😭",
  pageTitle: "归档页",
});

definePageMeta({
  layout: "page",
  layoutProps: layoutState
})

useSeoMeta({
  title: "文章归档",
  description: "归档页"
})
</script>

<template>
  <div v-if="archiveList?.length > 0" class="relative">
    <div
      v-for="(yearGroup, yearIndex) in groupedArchives"
      :key="yearGroup.year"
      class="archive-year-section relative mb-8"
      :style="{ '--year-index': yearIndex }"
    >
      <div class="year-decoration absolute -mt-2 -ml-6">
        <span class="year-bg">{{ yearGroup.year }}</span>
      </div>

      <div class="year-header relative flex items-end gap-6 mb-6 pl-2 z-[1]">
        <div class="year-info flex flex-col gap-1">
          <h2 class="year-number">{{ yearGroup.year }}</h2>
          <div class="year-stats flex items-center gap-3">
            <span class="article-count">{{ getArticleCount(yearGroup.year) }} 篇文章</span>
          </div>
        </div>
        <div class="year-line"></div>
      </div>

      <div class="year-content relative pl-2">
        <div
          v-for="(monthGroup, monthIndex) in yearGroup.months"
          :key="`${yearGroup.year}-${monthGroup.month}`"
          class="month-section mb-8"
          :style="{ '--month-index': monthIndex }"
        >
          <div class="month-header mb-3">
            <div class="month-badge inline-flex items-center gap-2 px-3.5 py-1.5 font-bold">
              <span class="month-name">{{ getMonthName(monthGroup.month) }}</span>
              <span class="month-count flex items-center justify-center w-5 h-5 px-1.5">{{ monthGroup.articles.length }}</span>
            </div>
          </div>

          <div class="month-articles flex flex-col gap-1 pl-2 ml-2">
            <ArchiveItem
              v-for="(article, articleIndex) in monthGroup.articles"
              :key="article.id || `${yearGroup.year}-${monthGroup.month}-${articleIndex}`"
              :article="article"
              :index="articleIndex"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="pagination-wrapper flex justify-center mt-12 pt-8">
      <OuOPagination v-if="totalPage > 1" :total="totalPage" @onclick="switchPage"/>
    </div>
  </div>

  <div v-else class="empty-state flex justify-center items-center py-16">
    <EmptyState title="暂无归档文章"/>
  </div>
</template>

<style scoped lang="scss">
.archive-year-section {
  animation: yearFadeIn 0.6s ease forwards;
  animation-delay: calc(var(--year-index) * 0.1s);
  opacity: 0;
  transform: translateY(20px);

  @keyframes yearFadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &:last-child {
    margin-bottom: 0;
  }
}

.year-decoration {
  pointer-events: none;
  user-select: none;
  overflow: hidden;

  .year-bg {
    font-family: 'kksj', sans-serif;
    font-size: 6rem;
    font-weight: 900;
    line-height: 1;
    background: linear-gradient(
      135deg,
      rgba(var(--z-primary-color), 0.08) 0%,
      rgba(var(--z-primary-color), 0.02) 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.02em;
  }
}

.year-number {
  font-family: 'kksj', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: rgb(var(--z-fontcolor));
  margin: 0;
  line-height: 1;
  letter-spacing: -0.02em;
}

.article-count {
  font-size: 0.8125rem;
  color: rgb(var(--z-fontcolor-gray));
  padding: 0.25rem 0.625rem;
  background: rgba(var(--z-primary-color), 0.08);
  border-radius: 20px;
}

.year-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(
    90deg,
    rgba(var(--z-primary-color), 0.3) 0%,
    rgba(var(--z-primary-color), 0.05) 50%,
    transparent 100%
  );
}


.month-section {
  animation: monthSlideIn 0.5s ease forwards;
  animation-delay: calc(var(--month-index) * 0.08s);
  opacity: 0;
  transform: translateX(-10px);

  @keyframes monthSlideIn {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  &:last-child {
    margin-bottom: 0;
  }
}

.month-badge {
  background: linear-gradient(
    135deg,
    rgba(var(--z-common-bg), 0.9) 0%,
    rgba(var(--z-common-bg), 0.7) 100%
  );
  border: 1px solid rgba(var(--z-border-color), 0.1);
  border-radius: 8px;
  backdrop-filter: blur(8px);
}

.month-name {
  color: rgb(var(--z-fontcolor));
}

.month-count {
  font-size: 0.6875rem;
  color: rgb(var(--z-btn-fontcolor));
  background: rgb(var(--z-primary-color));
  border-radius: 10px;
}

.month-articles {
  border-left: 2px solid rgba(var(--z-primary-color), 0.1);
}

.pagination-wrapper {
  border-top: 1px solid rgba(var(--z-gray-color), 0.2);
}
</style>
