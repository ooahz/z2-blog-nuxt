<script setup lang="ts">
import {TiptapEditor} from "@ahzoo/editor";
import "@ahzoo/editor/style.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2Icon, ArrowLeftIcon } from "@lucide/vue";
import { listAllColumn } from "@/api/column";
import type { Article } from "@/types/article";
import type { Column } from "@/types/column";
import {toast} from "vue-sonner";

const props = defineProps<{
  modelValue: Article;
  loading?: boolean;
  isEdit?: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: Article];
  submit: [];
}>();

const form = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

// 关联专栏列表
const columns = ref<Column[]>([]);
const columnsLoading = ref(true);

const fetchColumns = async () => {
  try {
    columns.value = (await listAllColumn()) ?? [];
  } catch {
    columns.value = [];
  } finally {
    columnsLoading.value = false;
  }
};

// 专栏勾选：维护 form.columnIds
const toggleColumn = (column: Column, checked: boolean | string) => {
  const ids = form.value.columnIds ?? [];
  if (checked) {
    if (!ids.includes(column.id)) {
      form.value.columnIds = [...ids, column.id];
    }
  } else {
    form.value.columnIds = ids.filter((id) => id !== column.id);
  }
};

async function handleUpload(file: File) {
  toast.error("暂不支持图片上传");
  return undefined;
  // const res = await uploadImgFetch(file);
  // return res.data.fileUrl;
}

onMounted(fetchColumns);
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center gap-4">
      <Button variant="ghost" size="icon" as-child>
        <NuxtLink to="/articles">
          <ArrowLeftIcon />
        </NuxtLink>
      </Button>
      <div>
        <h1 class="text-2xl font-semibold tracking-tight">
          {{ isEdit ? "编辑文章" : "新建文章" }}
        </h1>
        <p class="text-sm text-muted-foreground">
          {{ isEdit ? "修改文章内容与设置" : "创建一篇新文章" }}
        </p>
      </div>
    </div>

    <form @submit.prevent="emit('submit')">
      <div class="flex flex-col gap-6 lg:flex-row">
        <!-- 主内容区 -->
        <div class="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>文章内容</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <FieldLabel for="title">标题</FieldLabel>
                  <Input
                    id="title"
                    v-model="form.title"
                    placeholder="请输入文章标题"
                  />
                </Field>
                <Field>
                  <FieldLabel for="description">摘要</FieldLabel>
                  <Textarea
                    id="description"
                    v-model="form.description"
                    placeholder="请输入文章摘要"
                    :rows="3"
                  />
                </Field>
                <Field>
                  <FieldLabel for="content">文章内容</FieldLabel>
                  <TiptapEditor
                      id="content"
                      v-model="form.htmlContent"
                      placeholder="输入内容"
                      class="editor-tiptap"
                      :upload-image="handleUpload"
                  />
                </Field>
                <Field>
                  <FieldLabel for="thumbnail">封面图 URL</FieldLabel>
                  <Input
                    id="thumbnail"
                    v-model="form.thumbnail"
                    placeholder="https://..."
                  />
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>
        </div>

        <!-- 侧边设置 -->
        <div class="lg:w-80 lg:shrink-0">
          <Card>
            <CardHeader>
              <CardTitle>发布设置</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <FieldLabel>权重（越大越靠前）</FieldLabel>
                  <Input
                    v-model.number="form.weight"
                    type="number"
                    placeholder="0"
                  />
                </Field>
                <Separator />
                <Field>
                  <FieldLabel>文章状态</FieldLabel>
                  <Tabs
                    :model-value="String(form.status)"
                    class="w-full"
                    @update:model-value="form.status = Number($event)"
                  >
                    <TabsList class="grid w-full grid-cols-3">
                      <TabsTrigger value="1">正常</TabsTrigger>
                      <TabsTrigger value="2">隐藏</TabsTrigger>
                      <TabsTrigger value="3">草稿</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </Field>
                <Separator />
                <Field>
                  <FieldLabel>关联专栏</FieldLabel>
                  <div v-if="columnsLoading" class="flex flex-col gap-2">
                    <Skeleton v-for="i in 3" :key="i" class="h-6 w-full" />
                  </div>
                  <FieldGroup v-else class="grid grid-cols-1 gap-2">
                    <Field v-for="column in columns" :key="column.id">
                      <FieldLabel class="font-normal">
                        <Checkbox
                          :model-value="(form.columnIds ?? []).includes(column.id)"
                          @update:model-value="(v) => toggleColumn(column, v)"
                        />
                        {{ column.name }}
                      </FieldLabel>
                    </Field>
                    <p
                      v-if="!columns.length"
                      class="text-sm text-muted-foreground"
                    >
                      暂无可选专栏
                    </p>
                  </FieldGroup>
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>

          <div class="mt-4 flex gap-2">
            <Button type="submit" class="flex-1" :disabled="loading">
              <Loader2Icon v-if="loading" class="animate-spin" />
              {{ loading ? "保存中..." : "保存" }}
            </Button>
            <Button variant="outline" as-child>
              <NuxtLink to="/articles">取消</NuxtLink>
            </Button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
