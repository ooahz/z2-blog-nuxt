<script setup lang="ts">
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarProvider, SidebarRail, SidebarSeparator, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import AppLogo from "@/components/layout/AppLogo.vue";
import NavMain from "@/components/layout/NavMain.vue";
import UserNav from "@/components/layout/UserNav.vue";
import ThemeToggle from "@/components/layout/ThemeToggle.vue";

const route = useRoute();

const breadcrumbMap: Record<string, string> = {
  "": "仪表盘",
  articles: "文章管理",
  columns: "专栏管理",
  categories: "分类管理",
  friends: "友链管理",
  create: "新建",
  edit: "编辑",
};

const breadcrumbs = computed(() => {
  const segments = route.path.split("/").filter(Boolean);
  const items: { label: string; to?: string }[] = [{ label: "首页", to: "/" }];
  let path = "";
  for (const seg of segments) {
    path += "/" + seg;
    const label = breadcrumbMap[seg] || (segments.length > 1 && !breadcrumbMap[seg] ? "详情" : seg);
    items.push({ label, to: path });
  }
  return items;
});
</script>

<template>
  <SidebarProvider>
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <NuxtLink to="/" class="block">
          <AppLogo />
        </NuxtLink>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <UserNav />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
    <SidebarInset>
      <header class="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur-md">
        <SidebarTrigger />
        <Separator orientation="vertical" class="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <template v-for="(item, i) in breadcrumbs" :key="item.to || item.label">
              <BreadcrumbSeparator v-if="i > 0" />
              <BreadcrumbItem>
                <BreadcrumbPage v-if="i === breadcrumbs.length - 1">
                  {{ item.label }}
                </BreadcrumbPage>
                <NuxtLink v-else :to="item.to!" class="text-muted-foreground transition-colors hover:text-foreground">
                  {{ item.label }}
                </NuxtLink>
              </BreadcrumbItem>
            </template>
          </BreadcrumbList>
        </Breadcrumb>
        <div class="ml-auto flex items-center gap-1">
          <ThemeToggle />
        </div>
      </header>
      <main class="flex-1 p-4 md:p-6">
        <slot />
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>
