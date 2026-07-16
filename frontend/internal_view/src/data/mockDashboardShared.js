// src/data/mockDashboardShared.js
// Shared dashboard data used by Staff, AICS Focal, OIC, SocPen Focal, SLP Focal, and Admin
// (Admin currently has its own separate Budget Utilization panel, but shares these core stats)

export const dashboardKpis = {
  applicationsThisMonth: { value: 7, note: '+12% vs last month' },
  pendingReview: { value: 22, note: 'With OIC' },
  approvalRate: { value: '43%', note: 'Rolling 30 days' },
  beneficiariesAssisted: { value: 348, note: 'Year-to-date' },
}

export const budgetUtilization = [
  { program: 'AICS', released: 2180000, allocated: 3500000, percent: 62 },
  {
    program: 'Social Pension for Indigent Senior Citizens',
    released: 3120000,
    allocated: 4200000,
    percent: 74,
  },
  { program: 'Sustainable Livelihood Program', released: 940000, allocated: 1800000, percent: 52 },
  { program: 'Emergency Relief Operations', released: 780000, allocated: 1200000, percent: 65 },
]

export const applicationsTrend = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  data: [22, 28, 34, 26, 38, 48, 44, 50, 55],
}

export const applicationsByType = {
  labels: ['AICS', 'SLP', 'Relief'],
  data: [40, 25, 12],
}

export const recentActivity = [
  {
    id: 'APP-2025000',
    name: 'Xarzha Bagares',
    type: 'AICS - Medical',
    date: '2026-05-18',
    amount: 10000,
    status: 'Rejected',
  },
  {
    id: 'APP-2025001',
    name: 'Vanisa Lungay',
    type: 'AICS - Food',
    date: '2026-07-09',
    amount: 1500,
    status: 'Approved',
  },
  {
    id: 'APP-2025002',
    name: 'Cyrel Dave Ansing',
    type: 'AICS - Burial',
    date: '2026-04-19',
    amount: 2500,
    status: 'Rejected',
  },
  {
    id: 'APP-2025003',
    name: 'Gil Iñigo',
    type: 'Social Pension',
    date: '2026-05-06',
    amount: 10000,
    status: 'Pending',
  },
  {
    id: 'APP-2025004',
    name: 'Eyrol Junio',
    type: 'SLP - Employment',
    date: '2026-05-27',
    amount: 1500,
    status: 'Released',
  },
  {
    id: 'APP-2025005',
    name: 'Angelo Wabe',
    type: 'AICS - Food',
    date: '2026-04-13',
    amount: 15000,
    status: 'Rejected',
  },
]
