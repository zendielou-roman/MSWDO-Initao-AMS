// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: () => import('@/views/LoginView.vue') },

  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: { requiresAuth: true, permission: 'dashboard', title: 'Dashboard' },
    // no description — Dashboard uses its own custom greeting instead
  },
  {
    path: '/clients',
    name: 'Clients',
    component: () => import('@/views/ClientsView.vue'),
    meta: {
      requiresAuth: true,
      permission: 'clients',
      title: 'Clients & Beneficiaries',
      description: 'View, register, manage client and beneficiary records across all programs.',
    },
  },
  {
    path: '/assistance',
    name: 'Assistance',
    component: () => import('@/views/AssistanceManagementView.vue'),
    meta: {
      requiresAuth: true,
      permission: 'assistance',
      title: 'Assistance Management',
      description: 'Track, review, and process assistance applications from intake to release.',
    },
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: () => import('@/views/NotificationsView.vue'),
    meta: {
      requiresAuth: true,
      permission: 'notifications',
      title: 'Notifications',
      description: 'View and manage system notifications.',
    },
  },
  {
    path: '/relief',
    name: 'Relief',
    component: () => import('@/views/ReliefOperationsView.vue'),
    meta: {
      requiresAuth: true,
      permission: 'relief',
      title: 'Relief Operations',
      description: 'Log and monitor relief distribution events across the 16 barangays of Initao.',
    },
  },
  {
    path: '/donations',
    name: 'Donations',
    component: () => import('@/views/DonationsView.vue'),
    meta: {
      requiresAuth: true,
      permission: 'donations',
      title: 'Donations Management',
      description: 'Record and track donations received and their allocation to MSWDO programs.',
    },
  },
  {
    path: '/aics-application',
    name: 'AICSApplication',
    component: () => import('@/views/AICSApplicationView.vue'),
    meta: {
      requiresAuth: true,
      permission: 'aics-application',
      title: 'AICS Application',
      description:
        'Manage crisis intervention applications through screening, assessment, and approval.',
    },
  },
  {
    path: '/masterlist',
    name: 'Masterlist',
    component: () => import('@/views/MasterlistView.vue'),
    meta: {
      requiresAuth: true,
      permission: 'masterlist',
      title: 'Masterlist of Social Pension Beneficiaries',
      description:
        'View and maintain the regional and local masterlist of senior citizen pensioners.',
    },
  },
  {
    path: '/slp-beneficiaries',
    name: 'SLPBeneficiaries',
    component: () => import('@/views/SLPBeneficiariesView.vue'),
    meta: {
      requiresAuth: true,
      permission: 'slp-beneficiaries',
      title: 'SLP Beneficiaries',
      description: 'Manage beneficiaries enrolled under the Sustainable Livelihood Program.',
    },
  },
  {
    path: '/reports',
    name: 'Reports',
    component: () => import('@/views/ReportsView.vue'),
    meta: {
      requiresAuth: true,
      permission: 'reports',
      title: 'Reports',
      description:
        'Generate and export summary reports across programs, barangays, and date ranges.',
    },
  },
  {
    path: '/user-management',
    name: 'UserManagement',
    component: () => import('@/views/UserManagementView.vue'),
    meta: {
      requiresAuth: true,
      permission: 'user-management',
      title: 'User Account Management',
      description: 'Manage accounts, roles, and access for all MSWDO staff.',
    },
  },
  {
    path: '/program-status',
    name: 'ProgramStatus',
    component: () => import('@/views/ProgramStatusView.vue'),
    meta: {
      requiresAuth: true,
      permission: 'program-status',
      title: 'Program Status Management',
      description: 'Enable, archive, and monitor budget utilization across MSWDO programs.',
    },
  },
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: () => import('@/views/UnauthorizedView.vue'),
  },
  {
    path: '/aics-analytics',
    name: 'AICSAnalytics',
    component: () => import('@/views/AICSAnalyticsView.vue'),
    meta: { requiresAuth: true, permission: 'aics-analytics', title: 'AICS Analytics' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next('/login')
  }

  if (to.meta.permission && !auth.sidebarItems.includes(to.meta.permission)) {
    return next('/unauthorized')
  }

  next()
})

export default router
