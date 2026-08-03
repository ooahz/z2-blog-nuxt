import {
  LayoutDashboardIcon,
  FileTextIcon,
  Columns3Icon,
  TagsIcon,
  Link2Icon,
  type LucideIcon,
} from "@lucide/vue";

export interface NavItem {
  title: string;
  to: string;
  icon: LucideIcon;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const useNavigation = () => {
  const navGroups: NavGroup[] = [
    {
      title: "概览",
      items: [
        { title: "仪表盘", to: "/", icon: LayoutDashboardIcon },
      ],
    },
    {
      title: "内容管理",
      items: [
        { title: "文章管理", to: "/articles", icon: FileTextIcon },
        { title: "专栏管理", to: "/columns", icon: Columns3Icon },
        { title: "分类管理", to: "/categories", icon: TagsIcon },
      ],
    },
    {
      title: "链接管理",
      items: [
        { title: "友链管理", to: "/friends", icon: Link2Icon },
      ],
    },
  ];

  return { navGroups };
};
