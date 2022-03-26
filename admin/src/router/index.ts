import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/",
    name: "Layout",
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "/coreHome",
        name: "Home",
        component: () => import("@/views/home/index.vue"),
      },
      {
        path: "/system/dist",
        name: "systemDist",
        component: () => import("@/views/system/dict/index.vue"),
      },
      {
        path: "/system/article",
        name: "systemArticle",
        component: () => import("@/views/system/article/index.vue"),
      },
      {
        path: "/system/audio",
        name: "systemAudio",
        component: () => import("@/views/system/audio/index.vue"),
      },
      {
        path: "/question/bank",
        name: "questionBank",
        component: () => import("@/views/question/bank.vue"),
      },
      {
        path: "/question/bankOptions/:id/:title",
        name: "questionBankOptions",
        component: () => import("@/views/question/bankOptions.vue"),
      },
      {
        path: "/question/analysis",
        name: "questionAnalysis",
        component: () => import("@/views/question/analysis/index.vue"),
      },
      {
        path: "/question/analysis/:typeId/:title",
        name: "questionAnalysisOptions",
        component: () => import("@/views/question/analysis/analysis.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
