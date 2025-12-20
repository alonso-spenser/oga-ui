import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// @ts-ignore
import lib from '../plugins/utility'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        web: true,
        // title: i18n.t('general.home'),
        title: 'About',
        requireAuth: false
      },
      component: () => import('../views/AboutView.vue'),
    },
  ],
})
router.beforeEach((to, from, next) => {
  setTitle(to.meta)
  next()
})
/**
 * Set page title
 * @param meta params
 */
// @ts-ignore
const setTitle = (meta) => {
  const titles: any[] = []
  console.log(meta)
  if (lib.isNotEmpty(meta.title)) {
    titles.push(meta.title)
  }
  if (meta.parent && meta.parent.title && titles.indexOf(meta.parent.title) === -1) {
    titles.push(meta.parent.title)
  }
  // if (store.state.configModel && store.state.configModel.id !== '0') {
  //   titles.push(store.state.configModel.abbr)
  // }
  document.title = titles.join('-')
}
export default router
