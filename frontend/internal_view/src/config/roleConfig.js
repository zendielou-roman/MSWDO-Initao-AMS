// src/config/roleConfig.js
export const ROLES = {
  ADMIN: 'admin',
  STAFF: 'staff',
  AICS_FOCAL: 'aics_focal',
  OIC: 'oic',
  SOCPEN_FOCAL: 'socpen_focal',
  SLP_FOCAL: 'slp_focal',
}

export const roleConfig = {
  [ROLES.ADMIN]: {
    label: 'System Administrator',
    sidebar: ['dashboard', 'user-management', 'program-status', 'notifications'],
    canApprove: false,
  },
  [ROLES.STAFF]: {
    label: 'Staff',
    sidebar: ['dashboard', 'clients', 'assistance', 'relief', 'donations'],
    canApprove: false,
  },
  [ROLES.AICS_FOCAL]: {
    label: 'AICS Focal Person',
    sidebar: ['dashboard', 'clients', 'assistance', 'aics-application', 'aics-analytics'],
    canApprove: false,
  },
  [ROLES.OIC]: {
    label: 'Officer-in-Charge',
    sidebar: [
      'dashboard',
      'clients',
      'assistance',
      'relief',
      'donations',
      'reports',
      'aics-analytics',
    ],
    canApprove: true,
  },
  [ROLES.SOCPEN_FOCAL]: {
    label: 'Senior Citizen Focal Person',
    sidebar: ['dashboard', 'clients', 'assistance', 'masterlist'],
    canApprove: false,
  },
  [ROLES.SLP_FOCAL]: {
    label: 'SLP Focal Person',
    sidebar: ['dashboard', 'clients', 'assistance', 'slp-beneficiaries'],
    canApprove: false,
  },
}

// icon = name of a lucide-vue-next component (imported by name in AppSidebar.vue)
export const menuMeta = {
  dashboard: { label: 'Dashboard', path: '/dashboard', icon: 'LayoutGrid' },
  clients: { label: 'Clients & Beneficiaries', path: '/clients', icon: 'Users' },
  assistance: { label: 'Assistance Management', path: '/assistance', icon: 'FileText' },
  relief: { label: 'Relief Operations', path: '/relief', icon: 'Package' },
  donations: { label: 'Donations Management', path: '/donations', icon: 'Gift' },
  'aics-application': { label: 'AICS Application', path: '/aics-application', icon: 'FileHeart' },
  masterlist: { label: 'Masterlist (Social Pension)', path: '/masterlist', icon: 'BookUser' },
  'slp-beneficiaries': {
    label: 'SLP Beneficiaries',
    path: '/slp-beneficiaries',
    icon: 'Handshake',
  },
  reports: { label: 'Reports', path: '/reports', icon: 'BarChart3' },
  'user-management': {
    label: 'User Account Management',
    path: '/user-management',
    icon: 'UserCog',
  },
  'program-status': { label: 'Program Status Management', path: '/program-status', icon: 'Layers' },
  notifications: { label: 'Notifications', path: '/notifications', icon: 'Bell' },
  'aics-analytics': { label: 'AICS Analytics', path: '/aics-analytics', icon: 'TrendingUp' },
}
