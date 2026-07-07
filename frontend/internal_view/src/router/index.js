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

        // ========================= ADMIN SIDE =========================
    {
      path: '/',
      component: () => import('@/layouts/AdminLayout.vue'),
      meta: { requiresAuth: true, allowedRoles: ['Administrator'] },
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

    // ========================= STAFF SIDE =========================
    {
      path: '/staff',
      component: () => import('@/layouts/StaffLayout.vue'),
      meta: { requiresAuth: true, allowedRoles: ['Social Worker', 'Encoder'] },
      children: [
        {
          path: '',
          redirect: '/staff/dashboard',
        },
        {
          path: 'dashboard',
          name: 'staff-dashboard',
          component: () => import('@/views/staff/StaffDashboardView.vue'),
          meta: { title: 'Dashboard' },
        },
{
  path: 'clients-beneficiaries',
  name: 'staff-clients-beneficiaries',
  component: () => import('@/views/staff/ClientsBeneficiariesView.vue'),
  meta: { title: 'Clients & Beneficiaries' },
}
        // Assistance Management, Relief Operations, and Donations Management pages
        // are built one at a time — routes get added here as each page is finished.
        // The sidebar links to them already exist but are visually disabled until then.
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

  // Not logged in and trying to reach a protected page -> bounce to login.
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return '/login'
  }

  // Logged in but heading for a section that isn't for their role (e.g. a Staff
  // account typing /users into the address bar) -> send them back to their own home.
  // This is enforced here, not just hidden in the UI, so it can't be bypassed by URL.
  if (to.meta.requiresAuth && auth.isLoggedIn && to.meta.allowedRoles) {
    if (!to.meta.allowedRoles.includes(auth.user.role)) {
      return auth.homePath
    }
  }

  // Already logged in and trying to view the login page -> send to their home instead.
  if (to.name === 'login' && auth.isLoggedIn) {
    return auth.homePath
  }
})

export default router 