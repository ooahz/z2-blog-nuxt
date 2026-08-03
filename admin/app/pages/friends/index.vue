<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { PlusIcon, PencilIcon, Trash2Icon, Link2Icon } from "@lucide/vue";
import { toast } from "vue-sonner";
import { listFriend, saveFriend, updateFriend, deleteFriend } from "@/api/friend";
import type { Friend } from "@/types/friend";
import type { ResultList } from "@/types/result";

const emptyFriend: Friend = { id: "", website: "", oldWebsite: "", name: "", description: "", avatar: "", weight: 50, status: 1, type: 1 };

// 状态：0不可见 / 1正常 / 2审核中 / 3待更新
const statusOptions = [
  { label: "不可见", value: "0" },
  { label: "正常", value: "1" },
  { label: "审核中", value: "2" },
  { label: "待更新", value: "3" },
];
// 类型：1默认 / 2技术 / 3生活
const typeOptions = [
  { label: "默认", value: "1" },
  { label: "技术", value: "2" },
  { label: "生活", value: "3" },
];
// 状态值 → 展示文案 / 样式
const statusLabel = (s: number) =>
  statusOptions.find((o) => o.value === String(s))?.label ?? "未知";
const statusVariant = (s: number) =>
  s === 1 ? "default" : s === 2 ? "outline" : "secondary";

// reka-ui Select 仅支持 string value，用 computed 与 number 形式的 form 字段互转
const formType = computed({
  get: () => String(form.value.type),
  set: (v: string) => {
    form.value.type = Number(v);
  },
});
const formStatus = computed({
  get: () => String(form.value.status),
  set: (v: string) => {
    form.value.status = Number(v);
  },
});

// 筛选：状态下拉 + 类型下拉，切换即触发筛选
const filterStatus = ref<string>("all");
const filterType = ref<string>("all");

const friends = ref<Friend[]>([]);
const loading = ref(true);

const dialogOpen = ref(false);
const isEdit = ref(false);
const saving = ref(false);
const form = ref<Friend>({ ...emptyFriend });

const deleteTarget = ref<Friend | null>(null);
const deleting = ref(false);

const fetchFriends = async () => {
  loading.value = true;
  try {
    const res = await listFriend({
      status: filterStatus.value === "all" ? "" : filterStatus.value,
      type: filterType.value === "all" ? "" : filterType.value,
    });
    const data = res as ResultList<Friend>;
    friends.value = data.data ?? [];
  } catch {
    // 错误提示由 http 客户端统一处理
  } finally {
    loading.value = false;
  }
};

const handleFilter = () => {
  fetchFriends();
};

const openCreate = () => {
  form.value = { ...emptyFriend };
  isEdit.value = false;
  dialogOpen.value = true;
};

const openEdit = (friend: Friend) => {
  form.value = { ...friend };
  isEdit.value = true;
  dialogOpen.value = true;
};

const handleSubmit = async () => {
  if (!form.value.name.trim()) {
    toast.warning("请输入友链名称");
    return;
  }
  if (!form.value.website.trim()) {
    toast.warning("请输入网站地址");
    return;
  }
  saving.value = true;
  try {
    if (isEdit.value) {
      await updateFriend(form.value);
    } else {
      await saveFriend(form.value);
    }
    toast.success(isEdit.value ? "友链已更新" : "友链已创建");
    dialogOpen.value = false;
    await fetchFriends();
  } catch {
    // 错误提示由 http 客户端统一处理
  } finally {
    saving.value = false;
  }
};

const confirmDelete = (friend: Friend) => {
  deleteTarget.value = friend;
};

const handleDelete = async () => {
  if (!deleteTarget.value) return;
  deleting.value = true;
  try {
    await deleteFriend(deleteTarget.value.id);
    toast.success("友链已删除");
    deleteTarget.value = null;
    await fetchFriends();
  } catch {
    // 错误提示由 http 客户端统一处理
  } finally {
    deleting.value = false;
  }
};

onMounted(fetchFriends);
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight">友链管理</h1>
        <p class="text-sm text-muted-foreground">管理友情链接</p>
      </div>
      <Button @click="openCreate">
        <PlusIcon data-icon="inline-start" />
        新建友链
      </Button>
    </div>

    <Card>
      <CardHeader>
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex flex-wrap items-center gap-2">
            <Select v-model="filterStatus" @update:model-value="handleFilter">
              <SelectTrigger class="w-32">
                <SelectValue placeholder="状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem v-for="opt in statusOptions" :key="opt.value" :value="opt.value">
                    {{ opt.label }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select v-model="filterType" @update:model-value="handleFilter">
              <SelectTrigger class="w-32">
                <SelectValue placeholder="类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">全部类型</SelectItem>
                  <SelectItem v-for="opt in typeOptions" :key="opt.value" :value="opt.value">
                    {{ opt.label }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <p class="text-sm text-muted-foreground">共 {{ friends.length }} 个友链</p>
        </div>
      </CardHeader>
      <CardContent>
        <Table v-if="!loading && friends.length">
          <TableHeader>
            <TableRow>
              <TableHead class="w-16">头像</TableHead>
              <TableHead>名称</TableHead>
              <TableHead>网站</TableHead>
              <TableHead>描述</TableHead>
              <TableHead class="w-20">状态</TableHead>
              <TableHead class="w-20">权重</TableHead>
              <TableHead class="w-24 text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="friend in friends" :key="friend.id">
              <TableCell>
                <Avatar>
                  <AvatarImage :src="friend.avatar" :alt="friend.name" />
                  <AvatarFallback>{{ friend.name.charAt(0).toUpperCase() }}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell class="font-medium">{{ friend.name }}</TableCell>
              <TableCell>
                <a
                  :href="friend.website"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block max-w-[16rem] truncate text-primary hover:underline"
                  :title="friend.website"
                >
                  {{ friend.website }}
                </a>
              </TableCell>
              <TableCell>
                <span
                  class="block max-w-xs truncate text-muted-foreground"
                  :title="friend.description"
                >
                  {{ friend.description || "—" }}
                </span>
              </TableCell>
              <TableCell>
                <Badge :variant="statusVariant(friend.status)">
                  {{ statusLabel(friend.status) }}
                </Badge>
              </TableCell>
              <TableCell class="text-muted-foreground">{{ friend.weight }}</TableCell>
              <TableCell class="text-right">
                <div class="flex justify-end gap-1">
                  <Button variant="ghost" size="icon" @click="openEdit(friend)">
                    <PencilIcon />
                  </Button>
                  <Button variant="ghost" size="icon" @click="confirmDelete(friend)">
                    <Trash2Icon class="text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div v-else-if="loading" class="flex flex-col gap-3">
          <Skeleton v-for="i in 5" :key="i" class="h-14 w-full" />
        </div>

        <div v-else class="flex flex-col items-center gap-3 py-12 text-center">
          <Link2Icon class="size-10 text-muted-foreground/50" />
          <div>
            <p class="font-medium">暂无友链</p>
            <p class="text-sm text-muted-foreground">点击右上角新建友链</p>
          </div>
        </div>
      </CardContent>
    </Card>

    <Dialog :open="dialogOpen" @update:open="(v) => (dialogOpen = v)">
      <DialogContent class="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{{ isEdit ? "编辑友链" : "新建友链" }}</DialogTitle>
          <DialogDescription>
            {{ isEdit ? "修改友链信息" : "添加一个新的友情链接" }}
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <FieldLabel for="name">名称</FieldLabel>
            <Input id="name" v-model="form.name" placeholder="请输入友链名称" />
          </Field>
          <Field>
            <FieldLabel for="website">网站地址</FieldLabel>
            <Input id="website" v-model="form.website" placeholder="https://example.com" />
          </Field>
          <Field>
            <FieldLabel for="oldWebsite">旧网站地址</FieldLabel>
            <Input id="oldWebsite" v-model="form.oldWebsite" placeholder="https://old.example.com" />
          </Field>
          <Field>
            <FieldLabel for="avatar">头像 URL</FieldLabel>
            <Input id="avatar" v-model="form.avatar" placeholder="https://example.com/avatar.png" />
          </Field>
          <div class="grid grid-cols-3 gap-4">
            <Field>
              <FieldLabel>类型</FieldLabel>
              <Select v-model="formType">
                <SelectTrigger>
                  <SelectValue placeholder="选择类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem v-for="opt in typeOptions" :key="opt.value" :value="opt.value">
                      {{ opt.label }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel>状态</FieldLabel>
              <Select v-model="formStatus">
                <SelectTrigger>
                  <SelectValue placeholder="选择状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem v-for="opt in statusOptions" :key="opt.value" :value="opt.value">
                      {{ opt.label }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel for="weight">权重</FieldLabel>
              <Input id="weight" v-model.number="form.weight" type="number" placeholder="0" />
            </Field>
          </div>
          <Field>
            <FieldLabel for="description">描述</FieldLabel>
            <Textarea id="description" v-model="form.description" placeholder="请输入友链描述" :rows="3" />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <Button variant="outline" :disabled="saving" @click="dialogOpen = false">取消</Button>
          <Button :disabled="saving" @click="handleSubmit">
            {{ saving ? "保存中..." : "保存" }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <AlertDialog :open="!!deleteTarget">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>确认删除友链？</AlertDialogTitle>
          <AlertDialogDescription>
            确定要删除「{{ deleteTarget?.name }}」吗？此操作不可撤销。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel :disabled="deleting" @click="deleteTarget = null">取消</AlertDialogCancel>
          <AlertDialogAction :disabled="deleting" @click="handleDelete">
            {{ deleting ? "删除中..." : "删除" }}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>
