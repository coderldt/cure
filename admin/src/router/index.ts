import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
