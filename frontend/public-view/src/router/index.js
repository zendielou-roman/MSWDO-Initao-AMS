import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/components/Contactpage.vue'),
    },
    {
      path: '/services/:slug',
      name: 'service-detail',
      component: () => import('@/components/ServiceDetail.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition

    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 100 }
    }

    if (to.name === 'service-detail') {
      return { top: 148 } // adjust this number until SiteHeader is just out of view
    }

    return { top: 0 }
  },
})

export default router
