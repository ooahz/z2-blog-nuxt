<script setup lang="ts">
import type {ArchiveArticleInterface} from "@/types/articleInterface";
import type {PaginationInfo} from "@/types/resultInterface";
import {listArchiveApi} from "~~/service/archive";
import {OuOPagination} from "@ahzoo/ouo";
import ArchiveItem from "@/components/list/ArchiveItem.vue";

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
  <div v-if="archiveList?.length > 0" class="archive-timeline">
    <div v-for="(yearGroup, yearIndex) in groupedArchives" :key="yearGroup.year" class="archive-year-group">
      <div class="year-header">
        <div class="year-marker"></div>
        <h2 class="year-title">{{ yearGroup.year }}</h2>
      </div>
      <div class="year-content">
        <div v-for="(monthGroup, monthIndex) in yearGroup.months" :key="`${yearGroup.year}-${monthGroup.month}`"
             class="month-group">
          <div class="month-header">
            <div class="month-marker"></div>
            <h3 class="month-title">{{ getMonthName(monthGroup.month) }}</h3>
          </div>
          <div class="month-articles">
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
    <div class="pagination flex justify-center w-full mt-8">
      <OuOPagination v-if="totalPage > 1" :total="totalPage" @onclick="switchPage"/>
    </div>
  </div>
  <div v-else class="flex justify-center items-center py-10">
    <EmptyState title="暂无归档文章"/>
  </div>
</template>

<style scoped lang="scss">
.archive-timeline {
  position: relative;
  padding-left: 2rem;

  &::before {
    content: '';
    position: absolute;
    left: 0.5rem;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(
      to bottom,
      rgba(var(--z-primary-color), 0.3),
      rgba(var(--z-primary-color), 0.1)
    );
  }
}

.archive-year-group {
  position: relative;
  margin-bottom: 3rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.year-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  position: relative;

  .year-marker {
    position: absolute;
    left: -1.75rem;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgb(var(--z-primary-color));
    border: 3px solid rgba(var(--z-common-bg), 0.9);
    box-shadow: 0 0 0 2px rgba(var(--z-primary-color), 0.2);
    z-index: 2;
  }

  .year-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: rgb(var(--z-fontcolor));
    margin: 0;
    padding-left: 0.5rem;
  }
}

.year-content {
  padding-left: 1.5rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 1px;
    background: rgba(var(--z-gray-color), 0.2);
  }
}

.month-group {
  margin-bottom: 2rem;
  position: relative;

  &:last-child {
    margin-bottom: 0;
  }
}

.month-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  position: relative;

  .month-marker {
    position: absolute;
    left: -1.5rem;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(var(--z-primary-color), 0.6);
    border: 2px solid rgba(var(--z-common-bg), 0.9);
    z-index: 2;
  }

  .month-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: rgb(var(--z-fontcolor-gray));
    margin: 0;
    padding-left: 0.5rem;
  }
}

.month-articles {
  padding-left: 1rem;

  > * {
    margin-bottom: 0.5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.pagination {
  color: rgb(var(--z-fontcolor-gray));
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .archive-timeline {
    padding-left: 1.5rem;
  }

  .year-header .year-marker {
    left: -1.25rem;
    width: 10px;
    height: 10px;
  }

  .month-header .month-marker {
    left: -1.25rem;
    width: 6px;
    height: 6px;
  }

  .year-title {
    font-size: 1.5rem;
  }

  .month-title {
    font-size: 1rem;
  }
}
</style>

