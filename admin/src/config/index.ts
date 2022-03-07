interface Config {
  title: string;
}

interface Menu {
  title: string;
  icon?: string;
  path?: string;
  id: string;
  children?: Array<Menu>;
}

const config: Config = {
  title: "我的后台",
};
// 4
const menu: Array<Menu> = [
  {
    title: "首页",
    icon: "House",
    path: "/coreHome",
    id: "1",
  },
  {
    title: "题库管理",
    icon: "Files",
    path: "/question",
    id: "4",
    children: [
      {
        title: "题库",
        icon: "",
        path: "/question/bank",
        id: "4-1",
      },
      {
        title: "题库解析",
        icon: "",
        path: "/question/analysis",
        id: "4-2",
      },
    ],
  },
  {
    title: "系统管理",
    icon: "Setting",
    path: "/system",
    id: "3",
    children: [
      {
        title: "字典管理",
        icon: "",
        path: "/system/dist",
        id: "3-2",
      },
      {
        title: "文章管理",
        icon: "",
        path: "/system/article",
        id: "3-3",
      },
    ],
  },
];

export { config, menu, Menu };
