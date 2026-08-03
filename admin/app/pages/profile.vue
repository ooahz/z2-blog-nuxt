<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Loader2Icon, ShieldCheckIcon } from "@lucide/vue";
import { toast } from "vue-sonner";
import { resetPassword } from "@/api/user";

const { userInfo } = useAuth();

const form = reactive({
  password: "",
  rePassword: "",
});
const loading = ref(false);

const initials = computed(() =>
  (userInfo.value?.name || "U").slice(0, 2).toUpperCase(),
);

const handleSubmit = async () => {
  if (!form.password) {
    toast.warning("请输入新密码");
    return;
  }
  if (form.password.length < 6) {
    toast.warning("密码至少 6 位");
    return;
  }
  if (form.password !== form.rePassword) {
    toast.warning("两次输入的密码不一致");
    return;
  }
  if (!userInfo.value?.email) {
    toast.error("未获取到用户信息，请重新登录");
    return;
  }
  loading.value = true;
  try {
    await resetPassword({
      email: userInfo.value.email,
      password: form.password,
      rePassword: form.rePassword,
    });
    toast.success("密码修改成功");
    form.password = "";
    form.rePassword = "";
  } catch {
    // 错误提示由 http 客户端统一处理
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="flex flex-col gap-6">
    <div>
      <h1 class="text-2xl font-semibold tracking-tight">个人资料</h1>
      <p class="text-sm text-muted-foreground">管理账户信息与登录密码</p>
    </div>

    <div class="flex flex-col gap-6 lg:flex-row">
      <!-- 账户信息 -->
      <Card class="lg:w-80 lg:shrink-0">
        <CardHeader>
          <CardTitle>账户信息</CardTitle>
          <CardDescription>当前登录账户的基本资料</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="flex flex-col items-center gap-3 py-2 text-center">
            <Avatar class="size-16">
              <AvatarFallback class="text-xl">{{ initials }}</AvatarFallback>
            </Avatar>
            <div>
              <p class="text-base font-medium">{{ userInfo?.name || "未登录" }}</p>
              <p class="text-sm text-muted-foreground">{{ userInfo?.email || "" }}</p>
            </div>
          </div>
          <Separator class="my-4" />
          <FieldGroup>
            <Field orientation="horizontal" class="justify-between">
              <FieldLabel class="text-muted-foreground">用户名</FieldLabel>
              <span class="text-sm font-medium">{{ userInfo?.name || "—" }}</span>
            </Field>
            <Field orientation="horizontal" class="justify-between">
              <FieldLabel class="text-muted-foreground">邮箱</FieldLabel>
              <span class="text-sm font-medium">{{ userInfo?.email || "—" }}</span>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <!-- 修改密码 -->
      <Card class="flex-1">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <ShieldCheckIcon class="size-5" />
            修改密码
          </CardTitle>
          <CardDescription>设置新的登录密码，修改后下次登录请使用新密码</CardDescription>
        </CardHeader>
        <CardContent>
          <form class="max-w-md" @submit.prevent="handleSubmit">
            <FieldGroup>
              <Field>
                <FieldLabel for="password">新密码</FieldLabel>
                <Input
                  id="password"
                  v-model="form.password"
                  type="password"
                  placeholder="请输入新密码（至少 6 位）"
                  autocomplete="new-password"
                />
              </Field>
              <Field>
                <FieldLabel for="rePassword">确认新密码</FieldLabel>
                <Input
                  id="rePassword"
                  v-model="form.rePassword"
                  type="password"
                  placeholder="请再次输入新密码"
                  autocomplete="new-password"
                />
              </Field>
              <Button type="submit" class="w-full" :disabled="loading">
                <Loader2Icon v-if="loading" class="animate-spin" />
                {{ loading ? "提交中..." : "确认修改" }}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
