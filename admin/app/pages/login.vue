<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Loader2Icon } from "@lucide/vue";
import { toast } from "vue-sonner";
import { getLogin } from "@/api/user";
import type { LoginUser } from "@/types/user";
import AppLogo from "@/components/layout/AppLogo.vue";

definePageMeta({ layout: "auth" });

const { login } = useAuth();
const router = useRouter();

const form = reactive<LoginUser>({
  email: "admin@ahzoo.cn",
  password: "123456",
});

const loading = ref(false);

const handleLogin = async () => {
  if (!form.email || !form.password) {
    toast.warning("请输入邮箱和密码");
    return;
  }
  loading.value = true;
  try {
    const res = await getLogin(form);
    // token 通常由 http 客户端从响应头自动捕获；兼容后端将 token 放在响应体的情况
    const tokenValue = (res.data as any)?.token as string | undefined;
    login(res.data, tokenValue);
    toast.success("登录成功，欢迎回来！");
    router.push("/");
  } catch {
    // 错误提示由 http 客户端统一处理
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="w-full max-w-sm">
    <div class="mb-6 flex flex-col items-center gap-4">
      <AppLogo />
    </div>
    <Card>
      <CardHeader class="text-center">
        <CardTitle class="text-xl">欢迎回来</CardTitle>
        <CardDescription>登录 Z次源管理后台</CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleLogin">
          <FieldGroup>
            <Field>
              <FieldLabel for="email">邮箱</FieldLabel>
              <Input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="you@example.com"
                autocomplete="email"
              />
            </Field>
            <Field>
              <FieldLabel for="password">密码</FieldLabel>
              <Input
                id="password"
                v-model="form.password"
                type="password"
                placeholder="请输入密码"
                autocomplete="current-password"
              />
            </Field>
            <Button class="mt-2 w-full" :disabled="loading">
              <Loader2Icon v-if="loading" class="animate-spin" />
              <span>{{ loading ? "登录中..." : "登 录" }}</span>
            </Button>
          </FieldGroup>
        </form>
        <p class="mt-4 text-center text-xs text-muted-foreground">
          演示账号已预填，直接点击登录即可体验
        </p>
      </CardContent>
    </Card>
  </div>
</template>
