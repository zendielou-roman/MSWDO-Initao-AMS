// src/data/mockNotifications.js
export const categoryTagStyles = {
  approvals: { label: 'APPROVAL', style: 'bg-blue-50 text-blue-600' },
  system: { label: 'SYSTEM', style: 'bg-slate-100 text-slate-500' },
}

export const notificationTagOverrides = {
  1: { label: 'AICS', style: 'bg-rose-50 text-rose-600' },
  4: { label: 'APPROVAL', style: 'bg-blue-50 text-blue-600' },
  6: { label: 'RELIEF', style: 'bg-purple-50 text-purple-600' },
}

export const mockNotifications = [
  {
    id: 1,
    message: 'New AICS application from Maria Santos (APP-2024-012) needs review',
    category: 'approvals',
    type: 'approval',
    timestamp: '5 mins ago',
    read: false,
  },
  {
    id: 2,
    message: 'Social Pension program budget is at 75% utilization (₱1.35M / ₱1.8M)',
    category: 'system',
    type: 'alert',
    timestamp: '1 hr ago',
    read: false,
  },
  {
    id: 3,
    message: 'Staff Ana Santos approved Application #APP-2024-011',
    category: 'approvals',
    type: 'info',
    timestamp: '2 hrs ago',
    read: true,
  },
  {
    id: 4,
    message: '4 applications are pending OIC final approval',
    category: 'approvals',
    type: 'alert',
    timestamp: '3 hrs ago',
    read: false,
  },
  {
    id: 5,
    message: 'New user account created: Carmela Aguilar (SLP Focal Person)',
    category: 'system',
    type: 'info',
    timestamp: 'Yesterday',
    read: true,
  },
  {
    id: 6,
    message: 'Relief operation REL-004 requires OIC authorization before July 15',
    category: 'approvals',
    type: 'approval',
    timestamp: 'Yesterday',
    read: false,
  },
  {
    id: 7,
    message: '4Ps program budget is at 90% — approaching fiscal limit',
    category: 'system',
    type: 'alert',
    timestamp: '2 days ago',
    read: true,
  },
]
