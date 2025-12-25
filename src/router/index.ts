import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/home/index.vue"),
    },
    {
      path: "/about",
      name: "about",
      meta: {
        web: true,
        // title: i18n.t('general.home'),
        title: "About",
        requireAuth: false,
      },
      component: () => import("../views/progress/index.vue"),
    },
  ],
});

export default router;
