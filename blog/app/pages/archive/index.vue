<script setup lang="ts">
import type {ArchiveArticleInterface} from "@/types/articleInterface";
import type {PaginationInfo} from "@/types/resultInterface";
import {listArchiveApi} from "~~/service/archive";
import {OuOPagination} from "@ahzoo/ouo";
import ArchiveItem from "@/components/list/ArchiveItem.vue";
import EmptyState from "~/components/common/EmptyState.vue";
import PageHero from "@/layouts/PageHero.vue";

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

const appConfig = useAppConfig();
const heroSubtitle = "欧内盖😨 <a href='https://github.com/ooahz/z2-blog-nuxt'>这个博客项目</a> 没有人点star的话，瓦达西😨😱😭😭😭";
const heroThumbnail = appConfig.heroThumbnails.archive ?? appConfig.heroThumbnails.default;

const totalCount = computed(() => page.value?.total ? Number.parseInt(page.value.total) : archiveList.value.length);

const heroStats = computed(() => {
  return [{value: totalCount.value, label: "篇文章"}];
});

useSeoMeta({
  title: "文章归档",
  description: "归档页"
});

definePageMeta({
  layout: false,
});
</script>

<template>
  <NuxtLayout name="page">
    <template #hero>
      <PageHero
        title="文章归档"
        eyebrow="Archive"
        :subtitle="heroSubtitle"
        :thumbnail="heroThumbnail"
        :stats="heroStats"
      />
    </template>

    <div class="archive-page">
      <div v-if="archiveList?.length > 0" class="archive-timeline">
        <div class="timeline-header">
          <div class="timeline-title">
            <span class="title-icon">◐</span>
            <span>全部文章</span>
          </div>
          <div class="timeline-line"></div>
        </div>

        <div class="timeline-stream">
          <template v-for="(yearGroup, yearIndex) in groupedArchives" :key="yearGroup.year">
            <div
              class="timeline-year"
              :style="{ '--year-index': yearIndex }"
            >
              <div class="timeline-marker timeline-marker--year">
                <div class="marker-dot marker-dot--year"></div>
              </div>
              <div class="year-card">
                <span class="year-number kksj-font">{{ yearGroup.year }}</span>
                <span class="year-count">{{ getArticleCount(yearGroup.year) }} 篇文章</span>
              </div>
            </div>

            <div
              v-for="(monthGroup, monthIndex) in yearGroup.months"
              :key="`${yearGroup.year}-${monthGroup.month}`"
              class="timeline-month-group"
              :style="{ '--month-index': monthIndex }"
            >
              <div
                v-for="(article, articleIndex) in monthGroup.articles"
                :key="article.id || `${yearGroup.year}-${monthGroup.month}-${articleIndex}`"
                class="timeline-item"
                :style="{ '--item-index': articleIndex }"
              >
                <div class="timeline-marker">
                  <div class="marker-dot"></div>
                  <div class="marker-line"></div>
                </div>
                <ArchiveItem :article="article"/>
              </div>
            </div>
          </template>
        </div>

        <div class="pagination-wrapper">
          <OuOPagination v-if="totalPage > 1" :total="totalPage" @onclick="switchPage"/>
        </div>
      </div>

      <EmptyState
        v-else
        title="暂无归档文章"
      />
    </div>
  </NuxtLayout>
</template>

<style scoped lang="scss">
.archive-timeline {
  position: relative;
  padding: 0 0 40px;
}

.timeline-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
}

.timeline-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: rgba(var(--z-fontcolor), 0.6);
  text-transform: uppercase;
  white-space: nowrap;
}

.title-icon {
  color: rgba(var(--z-primary-color), 0.8);
  animation: iconRotate 4s linear infinite;
}

@keyframes iconRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.timeline-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(var(--z-border-color), 0.5), transparent);
}

.timeline-stream {
  position: relative;
  padding-left: 48px;

  &::before {
    content: '';
    position: absolute;
    left: 10px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(
        to bottom,
        rgba(var(--z-primary-color), 0.3) 0%,
        rgba(var(--z-primary-color), 0.1) 100%
    );
  }
}

.timeline-year {
  position: relative;
  margin-bottom: 32px;
  animation: yearFadeIn 0.6s ease forwards;
  animation-delay: calc(var(--year-index) * 0.1s);
  opacity: 0;
  transform: translateY(20px);
}

@keyframes yearFadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.timeline-month-group {
  margin-bottom: 28px;
  animation: monthSlideIn 0.5s ease forwards;
  animation-delay: calc(var(--month-index) * 0.08s);
  opacity: 0;
  transform: translateX(-10px);
}

@keyframes monthSlideIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.timeline-item {
  position: relative;
  margin-bottom: 14px;
  animation: itemFadeIn 0.4s ease forwards;
  animation-delay: calc(var(--item-index) * 0.05s);
  opacity: 0;
  transform: translateY(10px);

  &:last-child {
    margin-bottom: 0;
  }
}

@keyframes itemFadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.timeline-marker {
  position: absolute;
  left: -48px;
  top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 24px;
}

.timeline-marker--year {
  top: 50%;
  transform: translateY(-50%);
}

.timeline-marker--month {
  position: static;
  top: auto;
  transform: none;
  width: auto;
}

.marker-dot {
  width: 16px;
  height: 16px;
  background: rgba(var(--z-common-bg), 1);
  border: 3px solid rgba(var(--z-primary-color), 0.6);
  border-radius: 50%;
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;

  .timeline-item:hover & {
    background: rgba(var(--z-primary-color), 0.2);
    border-color: rgba(var(--z-primary-color), 1);
    transform: scale(1.2);
  }
}

.marker-dot--year {
  width: 24px;
  height: 24px;
  border-width: 4px;
  background: rgba(var(--z-primary-color), 0.15);
  border-color: rgba(var(--z-primary-color), 0.8);
}

.marker-dot--month {
  width: 14px;
  height: 14px;
  border-width: 3px;
  background: rgba(var(--z-primary-color), 0.1);
  border-color: rgba(var(--z-primary-color), 0.5);
}

.marker-line {
  width: 2px;
  flex: 1;
  background: rgba(var(--z-border-color), 0.3);
  margin-top: 4px;
  min-height: 24px;
}

.timeline-item:last-child .marker-line {
  display: none;
}

.year-card {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  padding: 14px;
  border-radius: 16px;
}

.year-number {
  font-size: 2rem;
  font-weight: 700;
  color: rgb(var(--z-fontcolor));
  line-height: 1;
  letter-spacing: -0.02em;
}

.year-count {
  font-size: 0.8125rem;
  color: rgb(var(--z-fontcolor-gray));
  padding: 0.25rem 0.625rem;
  background: rgba(var(--z-primary-color), 0.08);
  border-radius: 20px;
}

.month-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 14px;
  background: linear-gradient(
      135deg,
      rgba(var(--z-common-bg), 0.9) 0%,
      rgba(var(--z-common-bg), 0.7) 100%
  );
  border: 1px solid rgba(var(--z-border-color), 0.1);
  border-radius: 99px;
  backdrop-filter: blur(8px);
}

.month-name {
  font-size: 0.8125rem;
  font-weight: 700;
  color: rgb(var(--z-fontcolor));
  letter-spacing: 0.05em;
}

.month-count {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  font-size: 0.6875rem;
  font-weight: 700;
  color: rgb(var(--z-btn-fontcolor));
  background: rgb(var(--z-primary-color));
  border-radius: 10px;
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid rgba(var(--z-gray-color), 0.2);
}

[view="mobile"] {
  .archive-timeline {
    padding: 0 0 24px;
  }

  .timeline-header {
    margin-bottom: 28px;
  }

  .timeline-stream {
    padding-left: 32px;

    &::before {
      left: 7px;
    }
  }

  .timeline-marker {
    left: -32px;
    width: 18px;
  }

  .timeline-marker--month {
    position: static;
    width: auto;
  }

  .marker-dot {
    width: 14px;
    height: 14px;
    border-width: 2px;
  }

  .marker-dot--year {
    width: 20px;
    height: 20px;
    border-width: 3px;
  }

  .marker-dot--month {
    width: 12px;
    height: 12px;
    border-width: 2px;
  }

  .year-card {
    padding: 10px 16px;
    gap: 12px;
  }

  .year-number {
    font-size: 1.5rem;
  }

  .year-count {
    font-size: 0.75rem;
  }

  .month-badge {
    padding: 5px 12px;
  }

  .month-name {
    font-size: 0.75rem;
  }

  .timeline-item {
    margin-bottom: 10px;
  }
}

[data-theme="dark"] {
  .timeline-stream::before {
    background: linear-gradient(
        to bottom,
        rgba(var(--z-primary-color), 0.2) 0%,
        rgba(var(--z-primary-color), 0.05) 100%
    );
  }

  .marker-dot {
    background: rgba(var(--z-common-bg), 0.8);
  }

  .year-card,
  .month-badge {
    background: rgba(var(--z-common-bg), 0.5);
    border-color: rgba(255, 255, 255, 0.05);
  }
}
</style>
