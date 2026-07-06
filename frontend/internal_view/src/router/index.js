import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/',
      component: () => import('@/layouts/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          redirect: '/dashboard',
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue'),
          meta: { title: 'Dashboard' },
        },
        
          {
            path: 'users',
            name: 'users',
            component: () => import('@/views/UserAccountsView.vue'),
            meta: { title: 'User Accounts' },
          },
         {
            path: 'programs',
            name: 'programs',
            component: () => import('@/views/ProgramManagementView.vue'),
            meta: { title: 'Program Management' },
          },
          {
            path: 'notifications',
            name: 'notifications',
            component: () => import('@/views/NotificationsView.vue'),
            meta: { title: 'Notifications' },
          },
        ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/login',
    },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return '/login'
  }
  if (to.name === 'login' && auth.isLoggedIn) {
    return '/dashboard'
  }
})

export default router
