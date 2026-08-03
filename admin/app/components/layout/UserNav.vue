<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { ChevronsUpDownIcon, LogOutIcon, UserIcon, SettingsIcon } from "@lucide/vue";
import { toast } from "vue-sonner";
import { logoutUser } from "@/api/user";

const { userInfo, logout } = useAuth();
const router = useRouter();

const handleLogout = async () => {
  if (userInfo.value) {
    await logoutUser(userInfo.value);
  }
  logout();
  toast.success("已退出登录");
  router.push("/login");
};

const initials = computed(() => {
  const name = userInfo.value?.name || "U";
  return name.slice(0, 2).toUpperCase();
});
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Avatar class="size-8 rounded-lg">
              <AvatarImage v-if="false" />
              <AvatarFallback class="rounded-lg">{{ initials }}</AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
              <span class="truncate font-medium">{{ userInfo?.name || "未登录" }}</span>
              <span class="truncate text-xs text-muted-foreground">{{ userInfo?.email || "" }}</span>
            </div>
            <ChevronsUpDownIcon class="ml-auto size-4 text-muted-foreground group-data-[collapsible=icon]:hidden" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56" align="end">
          <DropdownMenuLabel class="font-normal">
            <div class="flex flex-col gap-0.5">
              <p class="text-sm font-medium">{{ userInfo?.name }}</p>
              <p class="text-xs text-muted-foreground">{{ userInfo?.email }}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem @click="router.push('/profile')">
              <UserIcon />
              <span>个人资料</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SettingsIcon />
              <span>设置</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" @click="handleLogout">
            <LogOutIcon />
            <span>退出登录</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
