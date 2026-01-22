import { createRouter, createWebHistory } from "vue-router";
import lib from "../plugins/utility";
import layout from "../views/layout/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: layout,
      name: "home",
      meta: {
        web: true,
        // title: i18n.t('general.home'),
        requireAuth: false,
      },
      children: [
        {
          path: "",
          name: "home-page",
          meta: {
            // web: true,
            // title: i18n.t('dashboard.title'),
            requireAuth: false,
          },
          component: () => import("../views/home/Index.vue"),
        },
      ],
    },
    {
      path: "/section",
      component: layout,
      name: "section-index",
      meta: {
        web: true,
        // title: i18n.t('general.home'),
        requireAuth: false,
      },
      children: [
        {
          path: "page-section",
          name: "page-section",
          meta: {
            // web: true,
            // title: i18n.t('dashboard.title'),
            requireAuth: false,
          },
          component: () => import("../views/section/page-section/index.vue"),
        },
        {
          path: "form",
          name: "section-form",
          meta: {
            // web: true,
            // title: i18n.t('dashboard.title'),
            requireAuth: false,
          },
          component: () => import("../views/section/form/index.vue"),
        },
      ],
    },
  ],
});
router.beforeEach((to, from, next) => {
  setTitle(to.meta);
  next();
});
/**
 * Set page title
 * @param meta params
 */
// @ts-ignore
const setTitle = (meta) => {
  const titles: any[] = [];
  // console.log(meta)
  if (lib.isNotEmpty(meta.title)) {
    titles.push(meta.title);
  }
  if (
    meta.parent &&
    meta.parent.title &&
    titles.indexOf(meta.parent.title) === -1
  ) {
    titles.push(meta.parent.title);
  }
  // if (store.state.configModel && store.state.configModel.id !== '0') {
  //   titles.push(store.state.configModel.abbr)
  // }
  document.title = titles.join("-" );
};
export default router;
